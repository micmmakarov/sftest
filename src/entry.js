import React, { Component } from 'react';
import Helper from './helper.js';
import Edit from './edit.js';
import EntryView from './entryView.js';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false;
    };
  }
  render() {
    const entry = this.props.entry;
    return (<EntryView entry={entry} />);
  }
}

export default Entry;
