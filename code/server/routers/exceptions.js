
class Exceptions {
    static message401 = "Unauthorized";
    static message404 = "Not found"
    static message409 = "Conflict";
    static message422 = "Unprocessable Entity";
    static message500 = "Internal Server Error";
    static message503 = "Service Unavailable"


    static handle(error) {
        let responseParams = { code: 0, message: error.message }

        switch (error.message) {
            case this.message401:
                responseParams.code = 401;
                break;
            case this.message404:
                responseParams.code = 404;
                break;
            case this.message409:
                responseParams.code = 409;
                break;
            case this.message422:
                responseParams.code = 422;
                break;
            case this.message500:
                responseParams.code = 500;
                break;
            case this.message503:
                responseParams.code = 503;
                break;
        }

        return responseParams;
        
    }

}

module.exports = Exceptions;