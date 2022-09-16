export class Token {
    constructor(value) {
        this.value = value;
    }
}

export class IdentifierToken extends Token {
}

export class KeywordToken extends Token {
}

export class SeparatorToken extends Token {
}

export class OperatorToken extends Token {
}

export class LiteralToken extends Token {
}

export class NumberLiteralToken extends LiteralToken {
}

export class StringLiteralToken extends LiteralToken {
}

export class CommentToken extends Token {
}

export class IndentToken extends SeparatorToken {
}
