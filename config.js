const path = require('path');

module.exports = {
    urlPath: "https://demos.creative-tim.com/material-dashboard-pro-react/#/admin/dashboard",    
  
    trayOptions:{
        trayIconPath: path.join(__dirname, './assert/icon.png'),
        title:'Titulo menu Tray'
    },
    
    browserViewOptions:{
        bounds:(contentBounds)=>{ 
                return { 
                    x: 0, 
                    y: 0, 
                    width: contentBounds.width, 
                    height: contentBounds.height 
                }
            },
        autoResize:{ width: true, height: true },
        backgroundColor: "#212529",
    },

    windowOptions: { backgroundColor:  "#212529",
                    skipTaskbar:false,
                    icon: path.join(__dirname, './assert/icon.png'),
                    title:"csu teste embed web app",
                    autoHideMenuBar:true,
                    show: true,
                    // parent: top,
                    // modal: true,
                    webPreferences:{
                        preload: path.join(__dirname, 'preload.js')
                    }      
                }                    
}