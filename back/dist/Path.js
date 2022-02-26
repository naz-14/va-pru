"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathRequest = (request) => {
    const path = request.req.headers.requestpath;
    return path;
};
exports.default = pathRequest;
