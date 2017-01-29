/**
 * Created by thram on 29/01/17.
 */
import React, {Component} from "react";
import {connect} from "react-thrux";
import {Converter}  from 'showdown';

const converter = new Converter();
converter.setFlavor('github');

class Preview extends Component {
  state = {
    editor: ''
  };

  render = () => (
      <div className="markdown-body" style={styles.container}
           dangerouslySetInnerHTML={{__html: converter.makeHtml(this.state.editor)}}></div>
  )
}

const styles = {
  container: {
    width : '100%',
    height: '100%'
  }
};

export default connect('editor', Preview);