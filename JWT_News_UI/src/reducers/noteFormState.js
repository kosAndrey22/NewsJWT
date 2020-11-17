function noteFormState (state = {
    isEdit: false,
    isRead:false,
    isVisible:false,
    note: {}
}, action){
    let newState = {}
    switch(action.type){
        case 'OPEN_EDIT_FORM':
            newState = {
                isEdit: true,
                isRead:false,
                isVisible:true,
                note: action.note
            }
        return newState;
        case 'OPEN_READ_FORM':
            newState = {
                isEdit: false,
                isRead:true,
                isVisible:true,
                note: action.note
            }
        return newState;
        case 'CLOSE_FORM':
            newState = {
                isEdit: false,
                isRead:false,
                isVisible:false,
                note: {}
            }
        return newState;
        default: return state;
    }
}
export default noteFormState;