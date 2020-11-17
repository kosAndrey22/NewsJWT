import axios from 'axios';
import qs from 'qs';
import { connect } from 'react-redux';
import SingleNoteForm from '../components/SingleNoteForm';
import { CloseForm, axiosPosts} from '../actions';
import config  from "../../config.json";
const ApiUri = config.api_uri;

const mapStateToProps = (state) => {
    return {
        note: state.noteFormState.note, 
        visible: state.noteFormState.isVisible,
        isRead: state.noteFormState.isRead,
        isEdit: state.noteFormState.isEdit,
        token: state.authData.token
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onHide: () => {
            dispatch(CloseForm());
        },
        onSendNote: (_id, title, text, token) => {  
            let uri = ApiUri + `/posts/${_id}`;
            const data = {
                'title': title,
                'text': text
            };
            const options = {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token': token 
                },
                data: qs.stringify(data),
                url: uri
            }
            axios(options).then(res =>{ 
                dispatch(axiosPosts(1, 10));
                dispatch(CloseForm());
            });
        }
    }
}
const VisibleSingleNoteForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(SingleNoteForm);
  
export default VisibleSingleNoteForm;