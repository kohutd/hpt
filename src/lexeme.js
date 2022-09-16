import { COLON, COMMA, DIIA, IDENTIFIER, L_PARENT, OptionalTokenRule, R_PAREN, TokensSequenceRule } from "./constants.js";

export class Lexeme {
    constructor(body) {
        this.body = body;
    }
}

export class KeywordLexeme extends Lexeme {
    getKeyword() {
        return this.body;
    }
}

export class TokenLexeme extends Lexeme {
    getToken() {
        return this.body;
    }
}

export class NumberLexeme extends Lexeme {
    getValue() {
        return this.body;
    }
}

export class StringLexeme extends Lexeme {
    getValue() {
        return this.body[1];
    }
}

export class IdentifierLexeme extends Lexeme {
    getIdentifier() {
        return this.body;
    }
}

export class DiiaLexeme extends Lexeme {
}

export class DiiaNameLexeme extends Lexeme {
    getName() {
        return this.body;
    }
}

export class DiiaParametersLexeme extends Lexeme {
    getParameters() {
        return this.body.slice(1, -1);
    }
}

export class DiiaBodyLexeme extends Lexeme {
    //
}

/**
 * дія hello_world():
 *   друк("ПРИВІТ!")
 */
const helloWorldLexeme = new DiiaLexeme([
    new TokenLexeme(DIIA),
    new DiiaNameLexeme('hello_world'),
    new DiiaParametersLexeme([
        new TokenLexeme(L_PARENT),
        // empty
        new TokenLexeme(R_PAREN),
    ]),
    new TokenLexeme(COLON),
    new DiiaBodyLexeme([
        // ...
    ]),
]);

const DIIA_HEAD_RULE = new TokensSequenceRule([
    DIIA,
    IDENTIFIER,
    L_PARENT,
    new OptionalTokenRule(
        new TokensSequenceRule([
            IDENTIFIER,
            COLON,
            IDENTIFIER,
            new OptionalTokenRule(COMMA),
        ])
    ),
    R_PAREN,
    COLON,
    new OptionalTokenRule(IDENTIFIER),
]);

DIIA_HEAD_RULE.check([
    DIIA,
    new IdentifierLexeme("hello_world"),
    R_PAREN,
    L_PARENT,
    COLON,
]);
