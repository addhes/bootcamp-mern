const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api-error');

class UnauthenticatedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCodes = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnauthenticatedError;