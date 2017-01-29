/**
 * Created by thram on 29/01/17.
 */
const {app, BrowserWindow} = require('electron');

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', ()=> {
  let mainWindow = new BrowserWindow();
  // mainWindow.setFullScreen(true);
  mainWindow.loadURL('file://' + __dirname + '/dist/index.html');
  mainWindow.on('closed', () => mainWindow = null);
});