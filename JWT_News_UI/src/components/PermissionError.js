import React from "react";
import { Alert } from 'react-bootstrap';

class PermissionErrorInfo extends React.Component {
    render (){
        let {permissionError} = this.props;
        return(

            permissionError ?
            <Alert variant = "danger">{permissionError}</Alert> :
            <p></p>    
        )
    }
}

export default PermissionErrorInfo;