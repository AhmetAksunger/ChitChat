const authReducer = (state = {},action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...action.data
            };
        
        case "LOGOUT_SUCCESS":
            
            break;
    
        default:
            break;
    }
}

export default authReducer;