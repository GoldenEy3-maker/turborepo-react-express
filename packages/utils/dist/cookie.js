"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCookieObject = void 0;
const js_cookie_1 = __importDefault(require("js-cookie"));
const getCookieObject = (key) => {
    let cookie = js_cookie_1.default.get(key);
    if (!cookie)
        return undefined;
    if (cookie.startsWith("j:")) {
        cookie = cookie.slice(cookie.indexOf(":") + 1);
    }
    return JSON.parse(cookie);
};
exports.getCookieObject = getCookieObject;
//# sourceMappingURL=cookie.js.map