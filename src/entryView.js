import React, { Component } from 'react';
import Helper from './helper.js';
import Edit from './edit.js';
import Api from './api.js';

class EntryView extends Component {
  constructor (props) {
    super(props);
    this.state = {isEditing: !!this.props.entry.isEditing};
  }
  toggleEditing () {
    this.setState({isEditing: !this.state.isEditing})
  }
  deleteRecord () {
    // Not a good way, but just tried to make it work :(
    const api = new Api();
    api.deleteRecord(this.props.entry);
  }
  render() {
    const entry = this.props.entry;
    if (this.state.isEditing) {
      return (<div>
        <Edit entry={entry} />
        <button onClick={this.toggleEditing.bind(this)} type="button" className="btn btn-warning">Cancel</button>
        </div>
      );
    } else {
      return (
        <div className="Entry" id={`id${entry.id}`}>
          <h1>{entry.title}</h1>
          <h2>{Helper.formatTime(entry.timestamp)}</h2>
          <p>{entry.text}</p>
          <button type="button" className="btn btn-warning" onClick={this.toggleEditing.bind(this)}>Edit</button>
          <button type="button" className="btn btn-danger" onClick={this.deleteRecord.bind(this)}>Delete</button>
        </div>
      );
    }
  }
}

export default EntryView;
