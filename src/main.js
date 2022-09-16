// import { COLON, COMMA, DIIA, L_BRACES, NL, OptionalTokenRule, R_BRACES, TokensSequenceRule, IDENTIFIER } from "./constants.js";
// import { IdentifierLexeme } from "./lexeme.js";
//
// const DIIA_HEAD_RULE = new TokensSequenceRule([
//     DIIA,
//     IDENTIFIER,
//     L_BRACES,
//     new OptionalTokenRule(
//         new TokensSequenceRule([
//             IDENTIFIER,
//             COLON,
//             IDENTIFIER,
//             new OptionalTokenRule(COMMA),
//         ])
//     ),
//     R_BRACES,
//     COLON,
//     new OptionalTokenRule(IDENTIFIER),
//     NL,
// ]);
//
// DIIA_HEAD_RULE.check([
//     DIIA,
//     new IdentifierLexeme("hello_world"),
//     R_BRACES,
//     L_BRACES,
//     COLON,
// ]);
//

import { tokenize } from "./tokenizer/tokenize.js";
import { lex } from "./lexer/lex.js";

const code = `
дія привіт():
  якщо а == 1:
    друк(3.14)

    друк(змінна)
  інакше:
    друк("інакше")
    
дія ще_одна():
  друк(ще_одна)
  
дія головна():
  привіт()
  ще_одна()
`

const tokens = tokenize(code);
const lexemes = lex(tokens);

// console.log(tokens);
console.log(lexemes);
