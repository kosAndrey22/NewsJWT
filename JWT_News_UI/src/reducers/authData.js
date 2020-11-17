function authData(state = {
    isAuthorized: false,
    userName: '',
    token: '',
    authorizeError: ''
}, action) {
    let newState = {};
    switch (action.type) {
        case 'LOG_OUT':
            newState = {
                isAuthorized: false,
                userName: '',
                token: '',
                error: ''
            };
            return newState;
        case 'LOG_ON':
            newState = {
                isAuthorized: true,
                userName: action.login,
                token: action.token,
                error: ''
            }
            return newState;
        case 'RECEIVE_AUTHORIZE_ERROR':
            newState = {
                isAuthorized: false,
                userName: '',
                token: '',
                error: action.authorizeError
            }
            return newState;
        case 'CLEAR_ERROR_INFO':
            newState = {
                isAuthorized: state.isAuthorized,
                userName: state.userName,
                token: state.token,
                error: ''
            }   
            return newState
        default: return state;
    }
}
export default authData;