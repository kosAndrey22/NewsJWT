function notes(state = {
    items: [],
    totalLength: 0,
    postsOnPage: 10,
    page: 1,
    isAxios: false,
    permissionError: ''
}, action) {
    let newState = {};
    switch (action.type) {
        case 'REQUEST_POSTS':
            newState = {
                items: state.items,
                totalLength: state.totalLength,
                postsOnPage: state.postsOnPage,
                page: state.page,
                isAxios: true,
                permissionError: ''
            };
            return newState;
        case 'RECEIVE_POSTS':
            newState = {
                items: action.notes,
                totalLength: action.length,
                postsOnPage: state.postsOnPage,
                page: action.page,
                isAxios: false,
                permissionError: ''
            }
            return newState;
        case 'UPDATE_POST':
            let note = action.note;
            newState = {
                items: [],
                totalLength: state.totalLength,
                postsOnPage: state.postsOnPage,
                page: state.page,
                isFetching: false,
                permissionError: ''
            };
            state.items.forEach(function (item) {
                if (item._id !== note._id) newState.items.push(item);
                else newState.items.push(note);
            });
            return newState;
        case 'CHANGE_COUNT_POSTS_ON_PAGE':
            newState = {
                items: state.items,
                totalLength: state.totalLength,
                postsOnPage: action.postsOnPage,
                page: state.page,
                isAxios: false,
                permissionError: ''
            }
            return newState;
        case 'RECEIVE_PERMISSION_ERROR':
            newState = {
                items: state.items,
                totalLength: state.totalLength,
                postsOnPage: state.postsOnPage,
                page: state.page,
                isAxios: false,
                permissionError: action.permissionError
            }
            return newState;
        default: return state;
    }
}
export default notes;