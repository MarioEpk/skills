function UnauthorizedError() {}

UnauthorizedError.prototype = Object.create(Error.prototype);
UnauthorizedError.prototype.name = 'UnauthorizedError';
UnauthorizedError.prototype.constructor = UnauthorizedError;

export default UnauthorizedError;
