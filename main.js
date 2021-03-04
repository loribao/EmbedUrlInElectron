const { app, BrowserWindow, Menu, BrowserView, Tray } = require('electron')
const { windowOptions, trayOptions, urlPath, browserViewOptions } = require('./config'); //Importando as configurações para janelas
const preload = require('./preload.js');
//#variaveis 
let tray = null
//funções
/**
 * Função para criar a Janela principal
 * Importa as configurações do arquivo config.js
 * Faz uso de BrowserView 
 * https://www.electronjs.org/docs/api/browser-window
 * Faz uso da regra de negicio antes da renderização da Janela com a função importada do arquivo preload.js
 */

const createStartWindow = () => {
  preload();
  const mainWindow = new BrowserWindow(windowOptions);
  const view = new BrowserView(); //instanciando a view que vai renderizar o site.
  mainWindow.setBrowserView(view);
  const contentBounds = mainWindow.getContentBounds();

  view.setBounds(browserViewOptions.bounds(mainWindow.getContentBounds()));
  view.setAutoResize(browserViewOptions.autoResize);
  view.setBackgroundColor(browserViewOptions.backgroundColor);
  view.webContents.loadURL(urlPath);
}
/**
 * Disposed da aplicação.
 */
const closeApp = () => {
  

  if (process.platform !== 'darwin') {
    app.quit();
  }
}
/**
 * Cria o menu na bandeja do sistema operacional
 * importa as configurações do arquivo Config.js, para Titulo e icone 
 * 
 */
const createMenuTray = () => {
  tray = new Tray(trayOptions.trayIconPath);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Exit', type: 'normal', click: closeApp },
    {
      label: 'Open', type: 'normal', click: () => {
        createStartWindow();
      }
    },
  ])
  tray.setToolTip(trayOptions.title)
  tray.setContextMenu(contextMenu)
  tray.on('double-click',createStartWindow)
}

//eventos 
//app.on('ready', createStartWindow);
app.on('window-all-closed', closeApp);
app.whenReady().then(createMenuTray);
