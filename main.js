const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 460,
    height: 820,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    autoHideMenuBar: true
  });

  mainWindow.loadFile('index.html');

  // অ্যাপ চালু হওয়ার সাথে সাথে আপডেট চেক করবে
  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
}

app.whenReady().then(() => {
  createWindow();
});

// --- Auto Updater Events ---
autoUpdater.on('update-available', () => {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'নতুন আপডেট পাওয়া গেছে',
    message: 'অ্যাপটির নতুন সংস্করণ ডাউনলোড হচ্ছে। দয়া করে অপেক্ষা করুন।'
  });
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox(mainWindow, {
    type: 'question',
    buttons: ['ristart o install korun', 'pore korun'],
    title: 'Update prostut',
    message: 'Notun update shofolvabe download hoyeche. App-ti ki ekhoni ristart kore install korte chan?'
  }).then(result => {
    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
  });
});