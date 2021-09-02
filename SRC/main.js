const {app, BrowserWindow} = require('electron');

let mainWindow;

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 750,
        frame: false,
        transparent: false,
        icon: 'images/logo.png',
        backgroundColor: '#1e2025',
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('public/index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});