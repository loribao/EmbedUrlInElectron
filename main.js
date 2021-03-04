const { app, BrowserWindow, Menu ,BrowserView,Tray } = require('electron')
const path = require('path');

//#variaveis 
const iconPath = path.join(__dirname, 'icon.png');
const backgroundColor = "#212529";
let tray = null

//funções

const startWindow=()=>{  
  const mainWindow = new BrowserWindow({ backgroundColor: backgroundColor,skipTaskbar:false,icon:iconPath,title:"csu teste embed web app",autoHideMenuBar:true});
  const view = new BrowserView();
  mainWindow.setBrowserView(view);      
  const contentBounds = mainWindow.getContentBounds();
  view.setBounds({ x: 0, y: 0, width: contentBounds.width, height: contentBounds.height });
  view.setAutoResize({ width: true, height: true });
  view.setBackgroundColor(backgroundColor);
  view.webContents.loadURL("https://demos.creative-tim.com/material-dashboard-pro-react/#/admin/dashboard")  
}
const closeApp =()=>{
  if(process.platform !== 'darwin'){
    app.quit();
  }
}

const createMenuTray=()=>{
  tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Exit', type: 'normal',click: closeApp },    
  ])
  tray.setToolTip('Titulo menu Tray')
  tray.setContextMenu(contextMenu)
}

//eventos 
app.on('ready', startWindow);
app.on('window-all-closed',closeApp);
app.whenReady().then(createMenuTray);
