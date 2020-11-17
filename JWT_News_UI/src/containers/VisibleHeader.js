import { connect } from 'react-redux';
import Header from '../components/Header';
import { logOut, openRegForm, openEnterForm, clearErrorInfo } from '../actions';
const mapStateToProps = (state) => {
    return {
        isAuth: state.authData.isAuthorized,
        userName: state.authData.userName,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogOutClick: () => {
            dispatch(logOut());
        },
        onSignUpClick: () => {
            dispatch(clearErrorInfo());
            dispatch(openRegForm());
        },
        onSignInClick: () => {
            dispatch(clearErrorInfo());
            dispatch(openEnterForm());
        }
    }
}

const VisibleHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);  
export default VisibleHeader;