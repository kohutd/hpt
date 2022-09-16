export const DIIA = 'дія';
export const L_PARENT = '(';
export const R_PAREN = ')';
export const COLON = ':';
export const QUOTE = '"';
export const COMMENT = '\'\'\'';
export const ASSIGN = '=';
export const COMMA = ',';
export const IDENTIFIER = Symbol('IDENTIFIER');
export const NL = '\n';
export const SPACE = ' ';
export const DBL_SPACE = '  ';
export const DOT = '.';

// for future
export const STRUCTURE = 'структура';
export const IF = 'якщо';
export const ELSE = 'інакше';
export const L_SQ_BRACES = '[';
export const R_SQ_BRACES = ']';
export const DIV = '/';
export const MOD = '%';
export const NOT = '!';
export const B_AND = '&';
export const B_OR = '|';
export const AND = '&&';
export const OR = '||';
export const PLUS = '+';
export const MINUS = '-';

export class Rule {
    check(value) {
        throw new Error('Check functionality for this rule is not implemented.');
    }
}

export class TokenRule extends Rule {
    constructor(token) {
        super();

        this.token = token;
    }
}

export class TokensSequenceRule extends Rule {
    constructor(sequence) {
        super();

        this.sequence = sequence;
    }
}

export class OptionalTokenRule extends Rule {
    constructor(token) {
        super();

        this.token = token;
    }
}

export function isDot(value) {
    return value === DOT;
}

export function isNumberSymbol(value) {
    return ['ш', 'в', 'д'].includes(value);
}

export function isSeparator(value) {
    return [L_PARENT, R_PAREN, COLON, COMMA, DOT, NL, SPACE].includes(value);
}

export function isKeyword(value) {
    return [DIIA, STRUCTURE, IF, ELSE].includes(value);
}

export function isBlockBeginning(tokens) {
    return tokens.length === 2 &&
        tokens[0]?.value === COLON &&
        tokens[1]?.value === NL;
}


export function isIndent(tokens) {
    return tokens.length === 2 &&
        tokens[0]?.value === SPACE &&
        tokens[1]?.value === SPACE;
}
