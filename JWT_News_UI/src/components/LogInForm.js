import React from "react";
import axios from 'axios';
import qs from 'qs';
import config from "../../config.json";
import {
    Row, Col, Container,
    Button, InputGroup, FormControl
} from 'react-bootstrap';
import VisibleErrorInfo from "../containers/VisibleErrorInfo";

class LogInForm extends React.Component {
    state = {
        login: '',
        password: '',
        acceptance: false
    }
    handleChange = e => {
        e.preventDefault();
        const { id } = e.currentTarget;
        this.setState({ [id]: e.currentTarget.value });
    }
    handleCheckBoxAgree = e => {
        this.setState({ acceptance: e.currentTarget.checked });
    };
    validation = () => {
        if (this.state.login.trim().length < 3) return false;
        else if (this.state.password.trim().length < 3) return false;
        else if (this.state.acceptance === false && this.props.isRegForm === true) return false;
        else return true;
    };
    logIn = () => {
        let { isRegForm } = this.props;
        const data = {
            'login': this.state.login.toString(),
            'password': this.state.password.toString()
        };
        const ApiUri = config.api_uri;
        let uri = ApiUri;
        if (isRegForm) uri = ApiUri + '/SignUp';
        else uri = ApiUri + '/SignIn';
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: uri
        };
        axios(options).then(res => {
            let onLogOn = () => {
                this.props.onLogOn(res);
            };
            if(res.data.error) onLogOn();
            else {
                this.props.history.push('/');
                onLogOn();
            }
        })
    }
    render() {
        let { isRegForm } = this.props;
        return (
            <Container>
                <Row>
                    <Col></Col>
                    <Col xs={6}>
                        <VisibleErrorInfo />
                        <InputGroup className="mb-1">
                            <FormControl id="login" onChange={this.handleChange}
                                placeholder="Enter login"
                            />
                        </InputGroup>
                        <InputGroup className="mb-1">
                            <FormControl id="password" type = "password" onChange={this.handleChange}
                                placeholder="Enter password"
                            />
                        </InputGroup>
                        {isRegForm &&
                            <p>
                                <input type="checkbox" onChange={this.handleCheckBoxAgree} />
                                I agree with terms
                                </p>
                        }

                        <Button variant="success"
                            id="LogOnButton"
                            onClick={this.logIn}
                            disabled={!this.validation()}
                        >

                            {isRegForm ? <React.Fragment>SignUp</React.Fragment>
                                : <React.Fragment>SignIn</React.Fragment>}
                        </Button>

                    </Col>
                    <Col></Col>
                </Row>

            </Container>
        );
    }
}

export default LogInForm;