import { isIndent } from "../constants.js";
import { IndentToken } from "./tokens.js";

export function tokenizeIndents(tokens) {
    const newIndents = [];

    for (let i = 0; i < tokens.length; i++) {
        const indentTokens = [tokens[i], tokens[i + 1]]

        if (isIndent(indentTokens)) {
            newIndents.push(new IndentToken(indentTokens));
            i += 1;
            continue;
        }

        newIndents.push(tokens[i]);
    }

    return newIndents;
}
