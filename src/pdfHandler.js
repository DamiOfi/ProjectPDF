const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

async function modifyPDF(inputPath, outputPath) {
  try {
    // Lee el archivo PDF original
    const existingPdfBytes = fs.readFileSync(inputPath);

    // Carga el PDF
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Obtén la primera página (o puedes iterar sobre más páginas si es necesario)
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Coordenadas para las áreas que deseas borrar (ajusta según necesidad)
    const areasToCover = [
      { x: 14, y: 416, width: 100, height: 11 }, // Área 1
      { x: 383, y: 198, width: 55, height: 8 }, // Área 2
      { x: 500, y: 198, width: 55, height: 8 }, // Área 3
    ];

    // Cubre las áreas especificadas con rectángulos blancos
    areasToCover.forEach(({ x, y, width, height }) => {
      firstPage.drawRectangle({
        x,
        y,
        width,
        height,
        color: rgb(1, 1, 1), // Blanco
      });
    });

    // Guarda el PDF modificado
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);

    console.log('PDF modificado y guardado en:', outputPath);
  } catch (error) {
    console.error('Error al modificar el PDF:', error);
    throw error;
  }
}

async function modifyMultiPagePDF(inputPath, outputPath) {
  try {
    const existingPdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Elimina páginas específicas (ejemplo: elimina la página 2 y 4)
    const pagesToKeep = [0, 2]; // Índices de las páginas que deseas conservar
    pdfDoc.reorderPages(pagesToKeep);

    // Editar páginas específicas
    const pages = pdfDoc.getPages();
    const pageToEdit = pages[0]; // Edita la primera página como ejemplo
    pageToEdit.drawText('Texto añadido a esta página', {
      x: 50,
      y: 50,
      size: 12,
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);

    console.log('PDF multipágina modificado y guardado en:', outputPath);
  } catch (error) {
    console.error('Error al modificar el PDF de varias páginas:', error);
    throw error;
  }
}

const {  StandardFonts } = require('pdf-lib');

async function modifyPDF(inputPath, outputPath) {
  try {
    const existingPdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const areasToCover = [
      { x: 14, y: 416, width: 100, height: 11 },
      { x: 383, y: 198, width: 55, height: 8 },
      { x: 500, y: 198, width: 55, height: 8 },
    ];

    areasToCover.forEach(({ x, y, width, height }) => {
      firstPage.drawRectangle({
        x,
        y,
        width,
        height,
        color: rgb(1, 1, 1),
      });
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
  } catch (error) {
    console.error('Error al modificar el PDF:', error);
    throw error;
  }
}

async function addTextToPDF(inputPath, outputPath) {
  try {
    const existingPdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const x = 120;
    const y = 630;

    firstPage.drawText('Valor trimestral', {
      x,
      y,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
  } catch (error) {
    console.error('Error al agregar texto al PDF:', error);
    throw error;
  }
}

module.exports = { modifyPDF, addTextToPDF };
