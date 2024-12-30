const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const { modifyPDF } = require('./src/pdfHandler');
const fs = require('fs');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'src/renderer.js'),
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile('src/index.html');
});

ipcMain.handle('load-pdf', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
  });

  if (!result.canceled) {
    const inputPath = result.filePaths[0];
    const outputPath = inputPath.replace('.pdf', '.pdf');
    await modifyPDF(inputPath, outputPath); // Edita el PDF
    return outputPath; // Devuelve la ruta editada
  }
});

ipcMain.handle('download-pdf', async (event, outputPath) => {
  const result = await dialog.showSaveDialog({
    defaultPath: outputPath,
  });

  if (!result.canceled) {
    fs.copyFileSync(outputPath, result.filePath);
  }
});

ipcMain.handle('open-pdf', async (event, filePath) => {
  const result = await shell.openPath(filePath);
  if (result) {
    console.error('Error al abrir el PDF:', result);
    throw new Error(result);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.handle('modify-multi-page-pdf', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'PDF Files', extensions: ['pdf'] }],
  });

  if (!result.canceled) {
    const inputPath = result.filePaths[0];
    const outputPath = inputPath.replace('.pdf', '_modified.pdf');
    try {
      await modifyMultiPagePDF(inputPath, outputPath); // Función para manejar PDF multipágina
      return outputPath; // Devuelve la ruta del archivo editado
    } catch (error) {
      console.error('Error al modificar el PDF:', error);
      return null;
    }
  }
  return null;
});
