const composeValidators = (...validators) => (value) => validators.reduce((e, validator) => e || validator(value), false);
const minLength = (length) => (value) => ((value + ``).length >= length) ? undefined : `Минимальная длина - ${length}`;
const required = (value) => (value ? undefined : `Это поле обязательно`);
export const loginValidator = composeValidators(minLength(3), required);
export const passwordValidator = composeValidators(minLength(3), required);
export const todoTitleValidator = composeValidators(minLength(3), required);
export const todoDescriptionValidator = composeValidators(required);
