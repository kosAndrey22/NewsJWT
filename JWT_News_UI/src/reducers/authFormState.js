function authFormState(state = {
    isItRegForm: false
}, action){
    let newState = {};
    switch(action.type){
        case 'OPEN_REG_FORM':
            newState = {
                isItRegForm: true
            }
            return newState;
        case 'OPEN_ENTER_FORM':
            newState = {
                isItRegForm: false
            }
            return newState;
        default: return state;
    }
}
export default authFormState;