import React from "react";
import ReactModal from 'react-modal';
import VisiblePermissionError from '../containers/VisiblePermissionError'
import {
    Modal, Button, InputGroup, FormControl,
    Row, Col, Container, Form
} from 'react-bootstrap';

ReactModal.setAppElement('#root');

class SingleNoteForm extends React.Component {
    state = {
        title: '',
        text: '',
    }
   
    handleChange = e => {
        e.preventDefault();
        const { id } = e.currentTarget;
        this.setState({ [id]: e.currentTarget.value });
    };
    validation = () => {
        if (this.state.title.trim().length < 3) return false;
        else if (this.state.text.trim().length < 3) return false;
        else return true;
    };
    render() {
        const { note, token } = this.props;
        const { text, title } = this.state;

        const { text: dText, title: dTitle} = note;
        const onHide = () => this.props.onHide();
        const onSendNote = () =>
            this.props.onSendNote(note._id, title, text, token);
        let isModalOpen = this.props.visible;
        let isFormOpen = this.props.isEdit;
        return (
            <Modal 
                show={isModalOpen} 
                onHide = {onHide} 
                scrollable = {true}
                size = 'xl'>
                {!isFormOpen ?
                    <Container>
                        <Row>
                            <Col>
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        <p >{note.title} by {note.author} </p>
                                    </Modal.Title>
                                </Modal.Header>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Modal.Body>
                                    <p id="viewText">{note.text}</p>
                                </Modal.Body>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Modal.Footer>
                                    <button className="closeBtn" onClick={onHide}>Close</button>
                                </Modal.Footer>
                            </Col>
                        </Row>
                    </Container>
                    :
                    <React.Fragment>
                        <Modal.Header closeButton>
                            <VisiblePermissionError/>
                            <InputGroup className="mb-1">
                                <FormControl id="title"
                                    onChange={this.handleChange}
                                    placeholder="Enter title"
                                    defaultValue={dTitle}
                                />
                            </InputGroup>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group >
                                <Form.Label>Note text</Form.Label>
                                <Form.Control as="textarea"
                                    rows="7"
                                    id="text"
                                    onChange={this.handleChange}
                                    defaultValue={dText}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <button
                                onClick={onSendNote}
                                disabled={!this.validation()}
                                className="sendBtn">
                                Send
                            </button>
                            <button onClick={onHide} className="closeBtn">Close</button>
                        </Modal.Footer>
                    </React.Fragment >}
            </Modal>
        )
    }
}

export default SingleNoteForm;