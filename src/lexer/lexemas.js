class Lexeme {
    constructor(value) {
        this.value = value;
    }
}

export class BlockBeginningLexeme extends Lexeme {
}

export class BlockEndingLexeme extends Lexeme {
}

export class BlockLexeme extends Lexeme {
}
