export const loginSuccess = (authState) => {
    return {
        type: "LOGIN_SUCCESS",
        data: authState
    };
}