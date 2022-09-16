import { COLON, NL } from "../constants.js";
import { IndentToken } from "../tokenizer/tokens.js";
import { last } from "../utils.js";

class Line extends Array {
}

class Block {
    constructor(indent, head, children) {
        this.indent = indent;
        this.head = head;
        this.children = children;
    }
}

function countIndent(line) {
    if (!line) {
        return -1;
    }

    let indent = 0;

    for (let i = 0; i < line.length; i++) {
        const token = line[i];

        if (i === indent && token instanceof IndentToken) {
            indent++;
        }
    }

    return indent;
}

function isSameIndent(a, b) {
    return countIndent(a) === countIndent(b);
}

/**
 * @param {Token[]} tokens
 * @returns {Token[][]}
 */
function makeLines(tokens) {
    let lines = [];

    let line = [];
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token.value === NL) {
            lines.push(line);
            line = [];
        } else {
            line.push(token);
        }
    }

    lines = lines.filter((line) => !line.every((token) => token.value === ''));
    lines = lines.filter((line) => !line.every((token) => token.value === ' '));
    lines = lines.filter((line) => !line.every((token) => token.value === '  '));

    return lines;
}

function lexBlocks(tokens) {
    const lines = makeLines(tokens);
    // console.log(lines);
    return lexBlocksLines(lines);
}

function lexBlocksLines(lines) {
    const newLines = [];

    let currBlock = null;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // def a():
        //   if x == 1:
        //     print("ok")
        //   else:
        //     print("not ok")

        const sendBlock = () => {
            currBlock.children = lexBlocksLines(currBlock.children);
            newLines.push(currBlock);
        }

        const resetBlock = (indent) => {
            currBlock = new Block(indent, line, []);
        }

        const addBlockChild = () => {
            currBlock.children.push(line);
        }

        if (last(line).value === COLON) { // start of block
            const newBlockIndent = countIndent(line);

            if (currBlock) {
                if (newBlockIndent === currBlock.indent) { // end of prev block
                    sendBlock();
                    resetBlock(newBlockIndent);

                    continue;
                } else {
                    addBlockChild();

                    continue;
                }
            } else {
                resetBlock(newBlockIndent);

                continue;
            }
        }

        if (i === (lines.length - 1)) { // last item
            if (currBlock != null) {
                addBlockChild();
                sendBlock();
                continue;
            }
        }

        if (currBlock !== null) {
            addBlockChild();
            continue;
        }

        newLines.push(line);
    }

    return newLines;
}

export function lex(tokens) {
    let lexemes = tokens;

    lexemes = lexBlocks(lexemes);

    // lexemes = lexBlockBeginnings(lexemes);
    // lexemes = lexIndents(lexemes);
    // lexemes = lexBlockEndings(lexemes);
    //
    // console.log(lexemes.filter((l) => l instanceof BlockBeginningLexeme).length);
    // console.log(lexemes.filter((l) => l instanceof BlockEndingLexeme).length);
    // lexemes = lexBlocks(lexemes);

    return lexemes;
}

