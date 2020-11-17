import axios from 'axios';
import qs from "qs";
import { connect } from 'react-redux';
import {axiosPosts,  receivePermissionError} from '../actions';
import ProposePage from '../components/ProposePage';
import config from "../../config.json";
const ApiUri = config.api_uri;

const mapStateToProps = (state) => {
    return {
        token: state.authData.token,
        isAuth: state.authData.isAuthorized
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onProposePost: (title, text, token) => {
            let uri = ApiUri + '/posts';
            const data = {
                'title': title,
                'text': text
            };
            const options = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token': token 
                },
                data: qs.stringify(data),
                url: uri
            }
            axios(options).then(res => {
                if (res.data.error) {
                    dispatch(receivePermissionError(res.data.error));
                }
                else {
                    dispatch(axiosPosts(1, 10));            
                }
            });
        }
    }
}
const VisibleProposePage = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProposePage);

export default VisibleProposePage;