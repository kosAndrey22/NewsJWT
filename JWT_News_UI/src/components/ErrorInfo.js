import React from "react";
import { Alert } from 'react-bootstrap';

class ErrorInfo extends React.Component {
    render (){
        let {authorizeError} = this.props;
        return(
            authorizeError ?
            <Alert variant = "danger">{authorizeError}</Alert>:
            <p></p>    
        )
    }
}

export default ErrorInfo;