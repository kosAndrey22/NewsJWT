import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import VisibleHeader from "../containers/VisibleHeader";
import VisibleLogInForm from "../containers/VisibleLogInForm";
import VisibleProposePage from "../containers/VisibleProposePage";
import VisibleNotesTable from "../containers/VisibleNotesTable";
import VisibleSingleNoteForm from "../containers/VisibleSingleNoteForm";
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Row xs={1}></Row>
        <VisibleHeader />
        <Container>
          <Row></Row>
          <Row></Row>
          <Row>
            <Col></Col>
            <Col xs={8}>
              <Route exact path="/" component={VisibleNotesTable} />
              <Route path="/send" component={VisibleProposePage} />
              <Route path="/enter" component={VisibleLogInForm} />
            </Col>
            <Col></Col>
          </Row>
          <Row>
          </Row>

          <VisibleSingleNoteForm />
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
