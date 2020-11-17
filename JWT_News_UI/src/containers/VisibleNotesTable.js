import axios from 'axios';
import { connect } from 'react-redux';
import {axiosPosts, OpenReadForm, OpenEditForm, receivePermissionError} from '../actions';
import NotesTable from '../components/NotesTable';
import config  from "../../config.json";
const ApiUri = config.api_uri;

const mapStateToProps = (state) => {
    return {
        notes: state.notes.items,
        page: state.notes.page,
        count: state.notes.postsOnPage,
        token: state.authData.token,
        user: state.authData.userName
    }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteNote: (id, page, count, token) => {
        const uri = ApiUri + `/posts/${id}`
        const options = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': token 
            },
            url: uri
        };
        axios(options)
            .then(res => {
                if (res.data.error) {
                    dispatch(receivePermissionError(res.data.error));
                }
                else {
                    dispatch(axiosPosts(page, count));            
                }
        }); 
    },
    onEditNote: (id, token) => {
        const uri = ApiUri + `/posts/${id}`
        const options = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'token': token 
            },
            url: uri
        };
        axios(options)
            .then(res => {
                if (res.data.error) {
                    dispatch(receivePermissionError(res.data.error));
                }
                else {
                    dispatch(OpenEditForm(res.data.note))
                };
            });
    },
    onReadNote: (id) => {
        axios.get(ApiUri + `/posts/${id}`)
            .then(res => {
                if (res.data.error) {
                    dispatch(receivePermissionError(res.data.error));
                }
                else {
                    dispatch(OpenReadForm(res.data.note));
                }
            });
    }
  }
} 
const VisibleNotesTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(NotesTable);
  
export default VisibleNotesTable;