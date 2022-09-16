import { isSeparator } from "../constants.js";
import { SeparatorToken } from "./tokens.js";

export function tokenizeSeparators(tokens) {
    const newTokens = [];

    for (let i = 0; i < tokens.length; i++) {
        const currentToken = tokens[i];

        if (isSeparator(currentToken)) {
            newTokens.push(new SeparatorToken(currentToken));
            continue;
        }

        newTokens.push(currentToken);
    }

    return newTokens;
}
