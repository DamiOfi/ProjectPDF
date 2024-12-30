const { ipcRenderer } = require('electron');

let outputPath = ''; // Variable global para almacenar la ruta del archivo editado

document.getElementById('load-pdf').addEventListener('click', async () => {
  document.getElementById('loading-message').style.display = 'block';

  // Solicita la edición del PDF
  outputPath = await ipcRenderer.invoke('load-pdf');

  document.getElementById('loading-message').style.display = 'none';
  document.getElementById('download-pdf').disabled = false; // Habilita el botón
  document.getElementById('view-pdf').disabled = false; // Habilita el botón de vista
});

document.getElementById('download-pdf').addEventListener('click', async () => {
  if (!outputPath) {
    alert('No hay un archivo PDF cargado o editado.');
    return;
  }

  await ipcRenderer.invoke('download-pdf', outputPath); // Pasa la ruta al proceso principal
});

document.getElementById('view-pdf').addEventListener('click', async () => {
  if (!outputPath) {
    alert('No hay un archivo PDF cargado o editado.');
    return;
  }

  try {
    await ipcRenderer.invoke('open-pdf', outputPath);
  } catch (error) {
    alert('Error al intentar abrir el PDF.');
  }
});
