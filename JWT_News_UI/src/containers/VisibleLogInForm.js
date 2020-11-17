import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LogInForm from '../components/LogInForm';

import { logOn, changeLogInVisibility, receiveAuthorizeError } from '../actions';


const mapStateToProps = (state) => {
    return {
        isRegForm: state.authFormState.isItRegForm,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onLogOn: (res) => {
            if (res.data.error) {
                dispatch(receiveAuthorizeError(res.data.error));
            } else {
                dispatch(logOn(res.data.login, res.data.token));
            }
        }
    }
}

const VisibleLogInForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(LogInForm);
export default withRouter(VisibleLogInForm);