import { NL, SPACE } from "../constants.js";

export function tokenizerFilterMultipleNL(tokens) {
    const newTokens = [];

    for (let i = 0; i < tokens.length; i++) {
        const prevToken = tokens[i - 1];
        const currentToken = tokens[i];

        if (prevToken?.value === NL && currentToken.value === NL) {
            newTokens.pop();
        }

        newTokens.push(currentToken);
    }

    return newTokens;
}

export function tokenizerFilterSingleSpaces(tokens) {
    const newTokens = [];

    for (let i = 0; i < tokens.length; i++) {
        const prevToken = tokens[i - 1];
        const currentToken = tokens[i];
        const nextToken = tokens[i + 1];

        if (prevToken?.value !== SPACE &&
            currentToken.value === SPACE &&
            nextToken?.value !== SPACE) {
            continue;
        }

        newTokens.push(currentToken);
    }

    return newTokens;
}
