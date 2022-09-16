import { isKeyword } from "../constants.js";
import { IdentifierToken, KeywordToken, Token } from "./tokens.js";

export function tokenizeKeywordsAndIdentifiers(tokens) {
    const newTokens = [];

    let currentWord = null;
    for (let i = 0; i < tokens.length; i++) {
        const currentToken = tokens[i];

        if (currentToken instanceof Token) {
            if (currentWord !== null) {
                if (isKeyword(currentWord)) {
                    newTokens.push(new KeywordToken(currentWord));
                } else {
                    newTokens.push(new IdentifierToken(currentWord));
                }

                currentWord = null;
            }

            newTokens.push(currentToken);
        } else {
            if (currentWord === null) {
                currentWord = '';
            }

            currentWord += currentToken;
        }
    }

    return newTokens;
}
