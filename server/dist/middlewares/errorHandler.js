"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const logger_1 = require("../config/logger");
const env_1 = require("../config/env");
const errorHandler = (err, req, res, next) => {
    logger_1.logger.error(`${err.name}: ${err.message}`, { stack: err.stack });
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json(Object.assign({ status: 'error', statusCode,
        message }, (env_1.env.NODE_ENV === 'development' && { stack: err.stack })));
};
exports.errorHandler = errorHandler;
