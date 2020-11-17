import { connect } from 'react-redux';
import PermissionError from '../components/PermissionError';

const mapStateToProps = (state) => {
    return {
        permissionError: state.notes.permissionError
    }
}
const VisiblePermissionError = connect(
    mapStateToProps,
    null
)(PermissionError);  
export default VisiblePermissionError;