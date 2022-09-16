import { tokenizeStringLiterals } from "./stringLiterals.js";
import { tokenizeNumberLiterals } from "./numberLiterals.js";
import { tokenizeSeparators } from "./separators.js";
import { tokenizeKeywordsAndIdentifiers } from "./keywords.js";
import { tokenizerFilterMultipleNL, tokenizerFilterSingleSpaces } from "./tokenizerFilters.js";
import { tokenizeIndents } from "./indents.js";

export function tokenize(code) {
    let tokens = code.trim().split('');
    tokens = [...tokens, '\n'];

    tokens = tokenizeStringLiterals(tokens);
    tokens = tokenizeNumberLiterals(tokens);
    tokens = tokenizeSeparators(tokens);
    tokens = tokenizeKeywordsAndIdentifiers(tokens);
    tokens = tokenizerFilterMultipleNL(tokens);
    tokens = tokenizerFilterSingleSpaces(tokens);
    tokens = tokenizeIndents(tokens);

    return tokens;
}
