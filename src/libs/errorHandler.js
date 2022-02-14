export const customException = (message, code) => {
    let error = new Error(message);
    error.code = code;
    return error;
}
