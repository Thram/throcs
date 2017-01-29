/**
 * Created by thram on 29/01/17.
 */
import React, {Component} from "react";
import Editor from "./Editor";
import Preview from "./Preview";

class App extends Component {
  render = () => (
      <div style={styles.container}>
        <div style={styles.column}>
          <Editor/>
        </div>
        <div style={styles.column}>
          <Preview/>
        </div>
      </div>

  )
}

const styles = {
  container: {
    width : '100%',
    height: '100%'
  },
  column   : {
    float : 'left',
    width : '50%',
    height: '100%'
  }
};

export default App;