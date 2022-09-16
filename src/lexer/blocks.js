import { BlockBeginningLexeme, BlockEndingLexeme, BlockLexeme } from "./lexemas.js";

export function lexBlocks(lexemes) {
    const newLexemes = [];

    let blockBeginningsDepth = 0;
    let blockEndingsDepth = 0;
    let blockChildren = null;
    for (let i = 0; i < lexemes.length; i++) {
        const currentLexeme = lexemes[i];

        if (currentLexeme instanceof BlockBeginningLexeme) {
            blockBeginningsDepth++;

            if (blockChildren === null) {
                blockChildren = [];
                continue;
            }
        } else if (currentLexeme instanceof BlockEndingLexeme) {
            blockEndingsDepth++;

            console.log(blockBeginningsDepth, blockEndingsDepth)

            if (blockBeginningsDepth === blockEndingsDepth) {
                newLexemes.push(new BlockLexeme(blockChildren));
                blockChildren = null;
                continue;
            }
        }

        if (blockChildren !== null) {
            blockChildren.push(currentLexeme);
            continue;
        }

        newLexemes.push(currentLexeme);
    }

    return newLexemes;
}
