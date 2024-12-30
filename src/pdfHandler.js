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

module.exports = { modifyPDF };
