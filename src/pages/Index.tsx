import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormularioEscritorio } from "@/components/FormularioEscritorio";
import { FormularioEmpresa } from "@/components/FormularioEmpresa";
import { SelecionadorDocumentos } from "@/components/SelecionadorDocumentos";
import { PreviewProtocolo } from "@/components/PreviewProtocolo";
import { DadosEscritorio, DadosEmpresa, Documento, Protocolo } from "@/types/protocolo";
import { gerarPDF } from "@/utils/pdfGenerator";
import { FileText, Download } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Index = () => {
  const [dadosEscritorio, setDadosEscritorio] = useState<DadosEscritorio>({
    nome: "",
    cnpj: "",
    endereco: "",
    contato: "",
  });

  const [dadosEmpresa, setDadosEmpresa] = useState<DadosEmpresa>({
    codigo: "",
    razaoSocial: "",
    cnpj: "",
    endereco: "",
  });

  const [documentos, setDocumentos] = useState<Documento[]>([
    { id: "1", nome: "INSS", selecionado: false },
    { id: "2", nome: "FGTS", selecionado: false },
    { id: "3", nome: "Folha de Pagamento", selecionado: false },
    { id: "4", nome: "Honorários", selecionado: false },
  ]);

  const [protocolosPorPagina, setProtocolosPorPagina] = useState<"1" | "2">("1");

  const protocolo: Protocolo = {
    escritorio: dadosEscritorio,
    empresa: dadosEmpresa,
    documentos,
    dataEmissao: new Date(),
  };

  const validarFormulario = (): boolean => {
    if (!dadosEscritorio.nome || !dadosEscritorio.cnpj || !dadosEscritorio.endereco || !dadosEscritorio.contato) {
      toast.error("Preencha todos os campos obrigatórios do escritório");
      return false;
    }
    if (!dadosEmpresa.codigo || !dadosEmpresa.razaoSocial || !dadosEmpresa.cnpj || !dadosEmpresa.endereco) {
      toast.error("Preencha todos os campos obrigatórios da empresa recebedora");
      return false;
    }
    const temDocumentoSelecionado = documentos.some((doc) => doc.selecionado && doc.nome.trim());
    if (!temDocumentoSelecionado) {
      toast.error("Selecione pelo menos um documento");
      return false;
    }
    return true;
  };

  const handleGerarPDF = async () => {
    if (!validarFormulario()) return;

    try {
      await gerarPDF(Number(protocolosPorPagina) as 1 | 2);
      toast.success("PDF gerado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar PDF. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm no-print">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Protocolo de Entrega</h1>
              <p className="text-sm text-muted-foreground">Sistema de emissão de protocolos contábeis</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulários */}
          <div className="space-y-6 no-print">
            <FormularioEscritorio dados={dadosEscritorio} onChange={setDadosEscritorio} />
            <FormularioEmpresa dados={dadosEmpresa} onChange={setDadosEmpresa} />
            <SelecionadorDocumentos documentos={documentos} onChange={setDocumentos} />

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Protocolos por página</label>
                <Select value={protocolosPorPagina} onValueChange={(v) => setProtocolosPorPagina(v as "1" | "2")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 protocolo por página</SelectItem>
                    <SelectItem value="2">2 protocolos por página</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleGerarPDF} className="sm:mt-7" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Gerar PDF
              </Button>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="mb-4 no-print">
              <h2 className="text-xl font-semibold">Preview do Protocolo</h2>
              <p className="text-sm text-muted-foreground">Visualização em tempo real</p>
            </div>
            <PreviewProtocolo protocolo={protocolo} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-16 no-print">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>Sistema de Protocolo de Entrega de Documentos Contábeis</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
