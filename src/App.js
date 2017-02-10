import React, { Component } from 'react';
import logo from './logo.svg';
import Api from './api.js';
import EntryView from './entryView.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: []
    };
  }
  componentDidMount () {
    this.api = new Api()
    this.getIndex();
    // Very bad binding to window, but I'm in hurry to make it work
    // I wish I used redux
    window.refetch = this.getIndex.bind(this);
  }
  getIndex () {
    let _this = this;
    this.api.index().then(data => {
      _this.setState({entries: data});
    });
  }
  deleteRecords () {
    let _this = this;
    this.api.deleteAll().then(data => {
      _this.setState({entries: []});
    });
  }
  createNewPost () {
    // pushing a new record and open edit by default
    let entries = this.state.entries;
    entries.unshift({title: '', text: '', isEditing: true});
    this.setState({entries: entries});
  }
  _entries () {
    return this.state.entries.map(e => {
      return (
        <EntryView key={e.id} entry={e} />
      )
    });
  }
  _contentTable () {
    return this.state.entries.map(e => {
      let title = (e.title.length > 30) ? e.title.slice(0, 20) + '...' : e.title;
      return (
        <div><a key={e.id} href={`#id${e.id}`}>{title}</a></div>
      )
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>My Blog (true news)</h2>
        </div>
        <div className="row">
          <div className="col-md-3">
            <button type="button" className="btn" onClick={this.createNewPost.bind(this)}>Create New</button>
            <h2>Content</h2>
            <p>{this._contentTable()}</p>
            <p>
              <button type="button" className="btn btn-danger" onClick={this.deleteRecords.bind(this)}>Delete All</button>
            </p>
          </div>
          <div className="col-md-9">{this._entries()}</div>
        </div>
        <p className="App-intro">

          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
