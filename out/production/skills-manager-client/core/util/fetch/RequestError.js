function RequestError(error, wasDataModifying) {
    this.status = error.status;
    this.wasDataModifying = wasDataModifying;
    if (error.response) {
        this.response = error.response.body;
    }
}

RequestError.prototype = Object.create(Error.prototype);
RequestError.prototype.name = 'RequestError';
RequestError.prototype.constructor = RequestError;

export default RequestError;
