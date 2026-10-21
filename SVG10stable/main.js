const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

const LOG = '/tmp/electron_debug.log';
function log(msg) {
  const linha = `[${new Date().toISOString()}] ${msg}\n`;
  try { fs.appendFileSync(LOG, linha); } catch(e) {}
}

try { fs.unlinkSync(LOG); } catch(e) {}

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    icon: path.join(__dirname, 'icon.png'),
    backgroundColor: '#1a1625',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
      devTools: true
    }
  });

  Menu.setApplicationMenu(null);
  // ⭐ DEBUG: se DEBUG=1, abre debug_sprite_editor.html
  const DEBUG = process.env.DEBUG === '1';
  const htmlFile = DEBUG ? 'debug_sprite_editor.html' : 'sprite_editor.html';
  console.log('[MAIN] Abrindo: ' + htmlFile + (DEBUG ? ' (MODO DEBUG)' : ''));
  log('[MAIN] Abrindo: ' + htmlFile);
  win.loadFile(htmlFile);

  // Log TUDO
  win.webContents.on('console-message', (e, level, msg, line, sourceId) => {
    log(`[PAGE] ${msg} (${sourceId}:${line})`);
  });

  win.webContents.on('did-finish-load', () => {
    win.webContents.executeJavaScript(`
      (function() {
        const info = {
          temEd: typeof ed !== 'undefined',
          temProject: typeof ed !== 'undefined' && !!ed.project,
          bodyClass: document.body.className,
          headerVisible: !!document.querySelector('header'),
          headerHeight: document.querySelector('header')?.offsetHeight || 0,
          bodyHeight: document.body.offsetHeight,
          tailwindLoaded: !!window.tailwind,
          faLoaded: !!window.FontAwesome || getComputedStyle(document.querySelector('.fa-solid') || document.body).fontFamily
        };
        console.log('DIAGNOSTICO: ' + JSON.stringify(info));
      })();
    `);
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
