import { Protocolo } from "@/types/protocolo";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PreviewProtocoloProps {
  protocolo: Protocolo;
}

export const PreviewProtocolo = ({ protocolo }: PreviewProtocoloProps) => {
  const documentosSelecionados = protocolo.documentos.filter((doc) => doc.selecionado && doc.nome.trim());

  return (
    <div id="protocolo-preview" className="bg-card p-8 rounded-lg border shadow-sm">
      {/* Cabeçalho Centralizado */}
      <div className="text-center space-y-2 mb-6">
        <div className="flex justify-center mb-3">
          {protocolo.escritorio.logo && (
            <img
              src={protocolo.escritorio.logo}
              alt="Logo"
              className="h-16 w-auto object-contain"
            />
          )}
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Sistema de Controle de Entrada e Saída de Documentos
        </p>
        <h2 className="text-sm font-bold uppercase">{protocolo.escritorio.nome || "-"}</h2>
        <p className="text-xs">{protocolo.escritorio.endereco || "-"}</p>
        <p className="text-xs">{protocolo.escritorio.contato || "-"} | CNPJ: {protocolo.escritorio.cnpj || "-"}</p>
      </div>

      {/* Título Principal */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary border-b-2 border-primary inline-block pb-1">
          Recibo de Saída de Documentos
        </h1>
      </div>

      {/* Dados do Cliente */}
      <div className="mb-6">
        <h3 className="text-sm font-bold mb-3">Dados do Cliente:</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-semibold">Código:</span> {protocolo.empresa.codigo || "-"}
          </div>
          <div className="col-span-2">
            <span className="font-semibold">Nome:</span> {protocolo.empresa.razaoSocial || "-"}
          </div>
          <div>
            <span className="font-semibold">Data:</span> {format(protocolo.dataEmissao, "dd/MM/yyyy")}
          </div>
          <div className="col-span-2">
            <span className="font-semibold">CNPJ:</span> {protocolo.empresa.cnpj || "-"}
          </div>
        </div>
      </div>

      {/* Tabela de Documentos */}
      <div className="mb-6">
        <table className="w-full border-collapse border border-foreground/30 text-sm">
          <thead>
            <tr className="bg-secondary">
              <th className="border border-foreground/30 px-3 py-2 text-left font-semibold w-20">Código</th>
              <th className="border border-foreground/30 px-3 py-2 text-left font-semibold">Documento(s)</th>
              <th className="border border-foreground/30 px-3 py-2 text-left font-semibold w-24">Vencimento</th>
              <th className="border border-foreground/30 px-3 py-2 text-left font-semibold w-28">Valor</th>
              <th className="border border-foreground/30 px-3 py-2 text-left font-semibold">Observação</th>
            </tr>
          </thead>
          <tbody>
            {documentosSelecionados.length > 0 ? (
              documentosSelecionados.map((doc, index) => (
                <tr key={doc.id}>
                  <td className="border border-foreground/30 px-3 py-2">
                    {(index + 1).toString().padStart(5, '0')}
                  </td>
                  <td className="border border-foreground/30 px-3 py-2 font-medium uppercase">
                    {doc.nome}
                  </td>
                  <td className="border border-foreground/30 px-3 py-2">
                    {doc.vencimento ? format(new Date(doc.vencimento), "dd/MM/yyyy") : ""}
                  </td>
                  <td className="border border-foreground/30 px-3 py-2">
                    {doc.valor || ""}
                  </td>
                  <td className="border border-foreground/30 px-3 py-2">
                    {doc.observacao || ""}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="border border-foreground/30 px-3 py-4 text-center text-muted-foreground italic">
                  Nenhum documento selecionado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Textos de Declaração */}
      <div className="space-y-2 mb-8 text-sm">
        <p className="text-justify">
          Recebi da empresa especificada acima os documentos constantes neste recibo.
        </p>
        <p className="text-justify">
          Entreguei para a empresa especificada acima os documentos constantes neste recibo.
        </p>
      </div>

      {/* Assinaturas */}
      <div className="grid grid-cols-2 gap-12 pt-4">
        <div className="text-center">
          <div className="mb-12"></div>
          <div className="border-t border-foreground/40 pt-2">
            <p className="text-sm font-semibold">{protocolo.escritorio.nome || "ESCRITÓRIO"}</p>
            <p className="text-xs text-muted-foreground mt-1">Entregou</p>
          </div>
        </div>
        <div className="text-center">
          <div className="mb-12"></div>
          <div className="border-t border-foreground/40 pt-2">
            <p className="text-sm font-semibold">{protocolo.empresa.razaoSocial || "EMPRESA"}</p>
            <p className="text-xs text-muted-foreground mt-1">Recebeu</p>
          </div>
        </div>
      </div>

      {/* Linha pontilhada separadora */}
      <div className="mt-8 border-t border-dashed border-foreground/20"></div>
    </div>
  );
};
