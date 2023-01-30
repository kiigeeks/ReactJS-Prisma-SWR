export const sendResponse = (statusCode, message, res) => {
    res.status(statusCode).json({
        message: message
    });
}

export const sendData = (statusCode, data, message, res) => {
    res.status(statusCode).json({
        message: message,
        payload: data
    });
}