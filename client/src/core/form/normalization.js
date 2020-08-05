/** composes normalizing function */
export const compose = (...normalizations) => (value, prevValue, allValues, prevAllValues) => normalizations.reduce(
    (result, normalize) => normalize(result, prevValue, allValues, prevAllValues),
    value,
);

const wrapUndefined = (normalize) => (value) => (value ? normalize(value) : value);
const wrapRegexReplace = (regex) => wrapUndefined((value) => value.replace(new RegExp(regex, "g"), ''));

export const lettersNumbersCharacters = wrapRegexReplace(/[^ a-zA-Z0-9]/);
