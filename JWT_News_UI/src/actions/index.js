import axios from 'axios';
import config from "../../config.json";
const ApiUri = config.api_uri;

export const logOut = () => {
    return {
        type: 'LOG_OUT',
    }
}
export const logOn = (login, token) => {
    return {
        type: 'LOG_ON',
        login,
        token
    }
}
export const openRegForm = () => {
    return {
        type: 'OPEN_REG_FORM'
    }
}
export const openEnterForm = () => {
    return {
        type: 'OPEN_ENTER_FORM'
    }
}
export const receiveAuthorizeError = (authorizeError) => {
    return {
        type: 'RECEIVE_AUTHORIZE_ERROR',
        authorizeError
    }
}
export const clearErrorInfo = () => {
    return{
        type: 'CLEAR_ERROR_INFO'
    }
}
export const updatePost = (note) => {
    return {
        type: 'UPDATE_POST',
        note
    }
}
export const requestPosts = () => {
    return {
        type: 'REQUEST_POSTS',
    }
}
export const receivePosts = (notes, length, page) => {
    return {
        type: 'RECEIVE_POSTS',
        notes,
        length,
        page
    }
}
export const axiosPosts = (page, count) => {
    return function (dispatch) {
        dispatch(requestPosts());
        return axios.get(ApiUri + `/posts/?page=${page}&count=${count}`).then(res => {
            const notes = res.data.notes;
            const length = res.data.length;
            const page = res.data.page;
            dispatch(receivePosts(notes, length, page));
        });
    }
}
export const ChangeCountPostOnPage = (postsOnPage) => {
    return {
        type: 'CHANGE_COUNT_POSTS_ON_PAGE',
        postsOnPage
    }
}
export const OpenEditForm = (note) => {
    return {
        type: 'OPEN_EDIT_FORM',
        note
    }
}
export const OpenReadForm = (note) => {
    return {
        type: 'OPEN_READ_FORM',
        note
    }
}
export const CloseForm = () => {
    return {
        type: 'CLOSE_FORM',
    }
}
export const receivePermissionError = (permissionError) => {
    return {
        type: 'RECEIVE_PERMISSION_ERROR',
        permissionError
    }
}