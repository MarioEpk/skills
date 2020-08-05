export const TO_TRANSLATE_PREFIX = "TRANSLATE:"; // Will be used to distinguish that this error should be translated

export const required = (value) => (value ? undefined : `${TO_TRANSLATE_PREFIX}error.required`);
