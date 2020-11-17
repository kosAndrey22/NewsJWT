import { connect } from 'react-redux';
import ErrorInfo from '../components/ErrorInfo';

const mapStateToProps = (state) => {
    return {
        authorizeError: state.authData.error
    }
}
const VisibleErrorInfo = connect(
    mapStateToProps,
    null
)(ErrorInfo);  
export default VisibleErrorInfo;