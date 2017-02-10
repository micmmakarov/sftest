import React, { Component } from 'react';
import Api from './api.js';

class Edit extends Component {
  constructor (props) {
    super(props);
    this.state = {...props.entry};
  }
  titleChanged (e) {
    this.setState({ title: e.target.value });
  }
  textChanged (e) {
    this.setState({ text: e.target.value });
  }
  save () {
    const api = new Api();
    api.updateRecord(this.state);
  }
  render() {
    const entry = this.props.entry;
    return (
      <div className="Edit">
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Title</label>
          <input value={this.state.title} onChange={this.titleChanged.bind(this)} type="text" className="form-control" id="exampleInputEmail1" placeholder="Email" />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Text</label>
          <textarea onChange={this.textChanged.bind(this)} className='form-control' id="textarea1">{this.state.text}</textarea>
        </div>
        <button type="button" onClick={this.save.bind(this)} className="btn btn-default">Save</button>
        </form>
      </div>
    );
  }
}

export default Edit;
