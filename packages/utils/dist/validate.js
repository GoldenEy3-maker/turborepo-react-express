"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDatePattern = exports.validateTelPattern = exports.validateEmail = void 0;
const validateEmail = (value) => {
    return new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "g").test(value);
};
exports.validateEmail = validateEmail;
const validateTelPattern = (value) => {
    return new RegExp(/^\+7\s\([\d]{3}\)\s[\d]{3}-[\d]{2}-[\d]{2}$/, "g").test(value);
};
exports.validateTelPattern = validateTelPattern;
const validateDatePattern = (value) => {
    return new RegExp(/^(0[1-9]|1\d|2\d|3[01])-(0[1-9]|1[0-2])-(19[3-9]\d|20\d{2})$/, "g").test(value);
};
exports.validateDatePattern = validateDatePattern;
//# sourceMappingURL=validate.js.map