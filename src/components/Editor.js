/**
 * Created by thram on 29/01/17.
 */
import React, {Component} from "react";
import {dispatch} from "thrux";

class Editor extends Component {
  onChange = (ev) => dispatch('editor:CHANGE', ev.target.value);
  render   = () => (
      <div style={styles.container}><textarea onChange={this.onChange}></textarea></div>
  )
}

const styles = {
  container: {
    width : '100%',
    height: '100%'
  }
};

export default Editor;