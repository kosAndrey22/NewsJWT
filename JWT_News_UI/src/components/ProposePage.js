import React from 'react';
import { Link } from 'react-router-dom'
import { Button, InputGroup, FormControl, Form, Container, Row, Col } from 'react-bootstrap'
import VisiblePermissionError from '../containers/VisiblePermissionError'

class ProposePage extends React.Component {
  state = {
    title: "",
    text: "",
    acceptance: false
  };
  handleChange = e => {
    e.preventDefault();
    const { id } = e.currentTarget;
    this.setState({ [id]: e.currentTarget.value });
  };
  handleCheckBoxAgree = e => {
    this.setState({ acceptance: e.currentTarget.checked });
  };
  validation = () => {
    if (this.state.title.trim().length < 3) return false;
    else if (this.state.text.trim().length < 3) return false;
    else if (this.state.acceptance === false) return false;
    else return true;
  };
  render() {
    const onProposePost = () =>
      this.props.onProposePost(this.state.title, this.state.text, this.props.token)
    let { isAuth } = this.props;
    return (
      isAuth ?
        < div >
          <VisiblePermissionError />
          <InputGroup className="mb-1">
            <FormControl id="title" onChange={this.handleChange}
              placeholder="Enter title"
            />
          </InputGroup>
          <br />
          <Form.Group >
            <Form.Label>Note text:</Form.Label>
            <Form.Control as="textarea" rows="7" id="text" onChange={this.handleChange} />
          </Form.Group>
          <br />
          <input type="checkbox" onChange={this.handleCheckBoxAgree} /> I agree with terms
      < br />
          <Container>
            <Row></Row>
            <Row>
              <Col>
                <Link to="/">
                  <Button variant="success"
                    id="addBtn"
                    onClick={onProposePost}
                    disabled={!this.validation()}>
                      publish
                  </Button>
                </Link>
              </Col>
              <Col>
              </Col>
              <Col xs={6}>
                <Link to="/">
                  <Button variant="warning" id="Return">
                    Return To News
                </Button>
                </Link>
              </Col>
            </Row>
            <Row></Row>
          </Container>
        </div >
        : null
    );
  }
}
export default ProposePage;