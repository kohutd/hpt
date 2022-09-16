import { QUOTE } from "../constants.js";
import { StringLiteralToken } from "./tokens.js";

export function tokenizeStringLiterals(tokens) {
    const newTokens = [];

    let currentString = null;
    for (let i = 0; i < tokens.length; i++) {
        const currentToken = tokens[i];

        if (currentString !== null) {
            if (currentToken === QUOTE) {
                newTokens.push(new StringLiteralToken(currentString));
                currentString = null;
                continue;
            }

            currentString += currentToken;
            continue;
        } else if (currentToken === QUOTE) {
            currentString = '';
            continue;
        }

        newTokens.push(currentToken);
    }

    return newTokens;
}
