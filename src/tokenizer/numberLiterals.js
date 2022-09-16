import { isDot, isNumberSymbol } from "../constants.js";
import { NumberLiteralToken } from "./tokens.js";
import { isDigit } from "../utils.js";

export function tokenizeNumberLiterals(tokens) {
    const newTokens = [];

    let currentNumber = null;
    for (let i = 0; i < tokens.length; i++) {
        const currentToken = tokens[i];

        if (currentNumber !== null) {
            if (!isDigit(currentToken) && !isDot(currentToken) && !isNumberSymbol(currentToken)) {
                newTokens.push(new NumberLiteralToken(currentNumber));
                newTokens.push(currentToken);
                currentNumber = null;
                continue;
            }

            currentNumber += currentToken;
            continue;
        } else if (isDigit(currentToken)) {
            currentNumber = currentToken;
            continue;
        }

        newTokens.push(currentToken);
    }

    return newTokens;
}
