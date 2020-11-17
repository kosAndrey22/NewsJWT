import React from "react";
import { Link } from 'react-router-dom';
import { Alert, Button, Container, Row, Col, ButtonGroup } from 'react-bootstrap';

class Header extends React.Component {
    render() {
        let { isAuth, userName } = this.props;
        let onLogOutClick = () => { this.props.onLogOutClick() };
        let onSignUpClick = () => {
            this.props.onSignUpClick();
        };
        let onSignInClick = () => {
            this.props.onSignInClick();
        };
        return (
            <Alert variant="dark">
                {isAuth ?
                    <React.Fragment>
                        <Container>
                            <Row>
                                <Col xs={2}>
                                    <Link to="/send">
                                        <Button variant="info" id="Propose" >
                                            Propose
                                        </Button>
                                    </Link>
                                </Col>
                                <Col md={{ offset: 6 }}>
                                    <h5>You enter as {userName}</h5>
                                </Col>
                                <Col xs={2}>
                                    <Link to="/">
                                        <Button
                                            variant="danger"
                                            id="LogOut"
                                            onClick={onLogOutClick}>
                                            LogOut
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Container>
                            <Row>
                                <Col >
                                </Col>
                                <Col md={{ offset: 8 }}>
                                    <Link to="/enter">
                                        <Button
                                            variant="primary"
                                            id="SigIn"
                                            onClick={onSignInClick}>
                                            SignIn
                                        </Button>
                                    </Link>
                                </Col>
                                <Col >
                                    <Link to="/enter">
                                        <Button
                                            variant="info"
                                            onClick={onSignUpClick}>
                                            SignUp
                                            </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </React.Fragment>
                }
            </Alert>
        );
    }
}

export default Header