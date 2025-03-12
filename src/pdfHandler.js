const fs = require('fs');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function modifyPDF(inputPath, outputPath) {
  try {
    const existingPdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Áreas a cubrir con rectángulos blancos
    const areasToCover = [
      { x: 14, y: 416, width: 100, height: 11 },
      { x: 383, y: 198, width: 55, height: 8 },
      { x: 500, y: 198, width: 55, height: 8 },
      { x: 500, y: 679, width: 55, height: 10 },
      { x: 310, y: 612, width: 200, height: 10 },
    ];

    areasToCover.forEach(({ x, y, width, height }) => {
      firstPage.drawRectangle({
        x,
        y,
        width,
        height,
        color: rgb(1, 1, 1), // Blanco
      });
    });

    // Agregar texto al PDF
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    firstPage.drawText('Valor trimestral ($12.000 valido por 3 meses)', {
      x: 310,
      y: 612,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText('Av. Lasalle 4269', {
      x: 500,
      y: 680,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });

    // Guardar el PDF modificado
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
    console.log('PDF modificado y guardado en:', outputPath);
  } catch (error) {
    console.error('Error al modificar el PDF:', error);
    throw error;
  }
}

async function modifyPDFOficina1(inputPath, outputPath) {
  try {
    const existingPdfBytes = fs.readFileSync(inputPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    // Áreas a cubrir con rectángulos blancos (igual que en modifyPDF)
    const areasToCover = [
      { x: 14, y: 416, width: 100, height: 11 },
      { x: 383, y: 198, width: 55, height: 8 },
      { x: 500, y: 198, width: 55, height: 8 },
      { x: 500, y: 679, width: 55, height: 10 },
      { x: 310, y: 612, width: 200, height: 10 },
    ];

    areasToCover.forEach(({ x, y, width, height }) => {
      firstPage.drawRectangle({
        x,
        y,
        width,
        height,
        color: rgb(1, 1, 1), // Blanco
      });
    });

    // Agregar texto específico para la segunda oficina
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    firstPage.drawText('Valor trimestral ($14.000 valido por 3 meses)', {
      x: 310,
      y: 612,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText('Av. Simon Perez 5098', { // Dirección de la segunda oficina
      x: 491,
      y: 680,
      size: 8,
      font,
      color: rgb(0, 0, 0),
    });

    // Guardar el PDF modificado
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
    console.log('PDF modificado y guardado en:', outputPath);
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

    firstPage.drawText('Valor trimestral ($12.000 valido por 3 meses)', {
      x: 120,
      y: 630,
      size: 7,
      font,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
    console.log('Texto agregado y PDF guardado en:', outputPath);
  } catch (error) {
    console.error('Error al agregar texto al PDF:', error);
    throw error;
  }
}

module.exports = { modifyPDF, modifyPDFOficina1, addTextToPDF };