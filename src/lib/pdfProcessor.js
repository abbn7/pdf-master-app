/**
 * PDF Processing Library
 * Developer: Abdelhamed Nada
 */

import { jsPDF } from 'jspdf';
import { PDFDocument } from 'pdf-lib';

/**
 * Convert text to PDF
 */
export async function textToPdf(text, options = {}) {
  const {
    fontSize = 12,
    fontFamily = 'helvetica',
    pageSize = 'a4',
    margin = 20,
  } = options;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: pageSize,
  });

  // Set font
  doc.setFont(fontFamily);
  doc.setFontSize(fontSize);

  // Split text into lines
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = pageWidth - 2 * margin;
  
  const lines = doc.splitTextToSize(text, maxWidth);
  
  let y = margin;
  const lineHeight = fontSize * 0.35; // Convert pt to mm

  lines.forEach((line, index) => {
    if (y + lineHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += lineHeight;
  });

  return doc.output('blob');
}

/**
 * Merge multiple PDF files
 */
export async function mergePdfs(pdfFiles) {
  const mergedPdf = await PDFDocument.create();

  for (const file of pdfFiles) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedPdfBytes = await mergedPdf.save();
  return new Blob([mergedPdfBytes], { type: 'application/pdf' });
}

/**
 * Split PDF into individual pages
 */
export async function splitPdf(pdfFile) {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pageCount = pdf.getPageCount();

  const splitPdfs = [];

  for (let i = 0; i < pageCount; i++) {
    const newPdf = await PDFDocument.create();
    const [copiedPage] = await newPdf.copyPages(pdf, [i]);
    newPdf.addPage(copiedPage);
    
    const pdfBytes = await newPdf.save();
    splitPdfs.push({
      blob: new Blob([pdfBytes], { type: 'application/pdf' }),
      pageNumber: i + 1,
    });
  }

  return splitPdfs;
}

/**
 * Compress PDF (basic compression)
 */
export async function compressPdf(pdfFile) {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);

  // Save with compression
  const compressedPdfBytes = await pdf.save({
    useObjectStreams: true,
  });

  return new Blob([compressedPdfBytes], { type: 'application/pdf' });
}

/**
 * Add page numbers to PDF
 */
export async function addPageNumbers(pdfFile, options = {}) {
  const {
    position = 'bottom-center',
    fontSize = 12,
    startPage = 1,
  } = options;

  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();

  pages.forEach((page, index) => {
    const pageNumber = index + startPage;
    const { width, height } = page.getSize();
    
    let x, y;
    
    switch (position) {
      case 'top-center':
        x = width / 2;
        y = height - 20;
        break;
      case 'bottom-center':
        x = width / 2;
        y = 20;
        break;
      case 'bottom-right':
        x = width - 40;
        y = 20;
        break;
      case 'bottom-left':
        x = 40;
        y = 20;
        break;
      default:
        x = width / 2;
        y = 20;
    }

    page.drawText(`${pageNumber}`, {
      x,
      y,
      size: fontSize,
    });
  });

  const numberedPdfBytes = await pdf.save();
  return new Blob([numberedPdfBytes], { type: 'application/pdf' });
}

/**
 * Extract text from PDF
 */
export async function extractTextFromPdf(pdfFile) {
  // Note: pdf-lib doesn't support text extraction directly
  // This is a placeholder for future implementation
  return 'Text extraction requires additional libraries';
}

/**
 * Rotate PDF pages
 */
export async function rotatePdf(pdfFile, degrees = 90) {
  const arrayBuffer = await pdfFile.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();

  pages.forEach((page) => {
    page.setRotation({ angle: degrees });
  });

  const rotatedPdfBytes = await pdf.save();
  return new Blob([rotatedPdfBytes], { type: 'application/pdf' });
}

/**
 * Download blob as file
 */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
