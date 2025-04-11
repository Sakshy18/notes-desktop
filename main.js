require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
  });
  
  const { app, BrowserWindow, ipcMain } = require('electron');
  const path = require('path');

  let win ;
  function createWindow () {
      win = new BrowserWindow({
      frame:false,
      movable:true,
      width: 400,
      height: 550,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    });
  
    win.loadFile('index.html');


  }
  
  app.whenReady().then(createWindow);

  ipcMain.on('minimize-window', () => {
    win.minimize();
  });

  ipcMain.on('close-window', () => {
    win.close();
  });
  