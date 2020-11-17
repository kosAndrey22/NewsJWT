import React from 'react';
import { Table } from 'react-bootstrap';
import VisiblePageDiv from '../containers/VisiblePageDiv';
import VisibleAmountPostDiv from '../containers/VisibleAmountPostDiv'
import VisiblePermissionError from '../containers/VisiblePermissionError';

class NotesTable extends React.Component {
  renderNews = () => {
    const { notes, page, count, token, user } = this.props;
    const { props } = this;
    let newsTemplate;
    if (notes.length) {
      newsTemplate = notes.map(function (item) {
        let isDisabled = !(user === item.author);
        return <tr key={item._id}>
          <td>{(new Date(item.createdAt)).toString().substring(4, 24)} </td>
          <td>{item.title} </td>
          <td>{item.author} </td>
          <td>
            <button onClick={() => {
              props.onReadNote(item._id);
            }}>View</button>
          </td>
          <td>
            <button onClick={() => {
              props.onEditNote(item._id, token);
            }} disabled={isDisabled}>Edit</button>
          </td>
          <td>
            <button onClick={() => {
              props.onDeleteNote(item._id, page, count, token);
            }} disabled={isDisabled}>Delete</button>
          </td>
        </tr>;
      });
    } else {
      newsTemplate = <tr id="noNewsMessage"><td>There are no news</td></tr>;
    }
    return newsTemplate;
  };
  render() {
    return (
      <React.Fragment>
        <h2> Articles </h2>
        <h4><VisiblePermissionError /></h4>
        <VisibleAmountPostDiv />
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th> Time Created </th>
              <th> Title</th>
              <th> Author</th>
              <th>View</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.renderNews()}
          </tbody>
        </Table>
        <VisiblePageDiv />
      </React.Fragment>
    );
  }
};

export default NotesTable;