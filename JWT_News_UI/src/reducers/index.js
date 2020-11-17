import { combineReducers } from 'redux';
import authData from './authData';
import authFormState from './authFormState';
import notes from './notes';
import noteFormState from './noteFormState';

let JWTNewsApp = combineReducers({
    authData,
    authFormState,
    notes, 
    noteFormState,
});
export default JWTNewsApp;  