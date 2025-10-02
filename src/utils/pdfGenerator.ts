import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const gerarPDF = async (protocolosPorPagina: 1 | 2) => {
  const elemento = document.getElementById("protocolo-preview");
  if (!elemento) {
    console.error("Elemento do protocolo não encontrado");
    return;
  }

  try {
    // Captura o elemento como imagem
    const canvas = await html2canvas(elemento, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Configuração do PDF (A4)
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    if (protocolosPorPagina === 1) {
      // 1 protocolo por página
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;
      
      const x = (pdfWidth - scaledWidth) / 2;
      const y = (pdfHeight - scaledHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, scaledWidth, scaledHeight);
    } else {
      // 2 protocolos por página
      const halfHeight = pdfHeight / 2;
      const ratio = Math.min(pdfWidth / imgWidth, halfHeight / imgHeight);
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;

      const x = (pdfWidth - scaledWidth) / 2;
      
      // Primeiro protocolo (metade superior)
      pdf.addImage(imgData, "PNG", x, 20, scaledWidth, scaledHeight);
      
      // Linha divisória
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(40, halfHeight, pdfWidth - 40, halfHeight);
      
      // Segundo protocolo (metade inferior)
      pdf.addImage(imgData, "PNG", x, halfHeight + 20, scaledWidth, scaledHeight);
    }

    // Salva o PDF
    const dataHora = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5);
    pdf.save(`protocolo-entrega-${dataHora}.pdf`);
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    throw error;
  }
};
