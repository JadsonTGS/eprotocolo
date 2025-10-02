import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Protocolo } from "@/types/protocolo";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PreviewProtocoloProps {
  protocolo: Protocolo;
}

export const PreviewProtocolo = ({ protocolo }: PreviewProtocoloProps) => {
  const documentosSelecionados = protocolo.documentos.filter((doc) => doc.selecionado && doc.nome.trim());

  return (
    <div id="protocolo-preview" className="bg-card p-8 rounded-lg border shadow-sm space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-start justify-between">
        {protocolo.escritorio.logo && (
          <img
            src={protocolo.escritorio.logo}
            alt="Logo"
            className="h-16 w-auto object-contain"
          />
        )}
        <div className="text-right">
          <h1 className="text-2xl font-bold text-primary">PROTOCOLO DE ENTREGA</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {format(protocolo.dataEmissao, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
          </p>
        </div>
      </div>

      <Separator />

      {/* Dados do Escritório */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wide">Escritório Emitente</h2>
        <div className="text-sm space-y-1">
          <p className="font-semibold">{protocolo.escritorio.nome || "-"}</p>
          <p>CNPJ: {protocolo.escritorio.cnpj || "-"}</p>
          <p>{protocolo.escritorio.endereco || "-"}</p>
          <p>{protocolo.escritorio.contato || "-"}</p>
        </div>
      </div>

      <Separator />

      {/* Dados da Empresa */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wide">Empresa Recebedora</h2>
        <div className="text-sm space-y-1">
          <p>Código: {protocolo.empresa.codigo || "-"}</p>
          <p className="font-semibold">{protocolo.empresa.razaoSocial || "-"}</p>
          <p>CNPJ: {protocolo.empresa.cnpj || "-"}</p>
          <p>{protocolo.empresa.endereco || "-"}</p>
        </div>
      </div>

      <Separator />

      {/* Documentos */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wide">Documentos Entregues</h2>
        {documentosSelecionados.length > 0 ? (
          <div className="space-y-2">
            {documentosSelecionados.map((doc) => (
              <div key={doc.id} className="flex justify-between items-start text-sm py-2 border-b border-dashed">
                <div className="flex-1">
                  <p className="font-medium">{doc.nome}</p>
                  {doc.vencimento && (
                    <p className="text-xs text-muted-foreground">
                      Vencimento: {format(new Date(doc.vencimento), "dd/MM/yyyy")}
                    </p>
                  )}
                </div>
                {doc.valor && (
                  <p className="font-semibold text-primary ml-4">{doc.valor}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground italic">Nenhum documento selecionado</p>
        )}
      </div>

      <Separator />

      {/* Assinaturas */}
      <div className="grid grid-cols-2 gap-8 pt-8">
        <div className="space-y-4">
          <div className="border-t border-foreground/20 pt-2 text-center">
            <p className="text-xs text-muted-foreground">Assinatura de quem entregou</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="border-t border-foreground/20 pt-2 text-center">
            <p className="text-xs text-muted-foreground">Assinatura de quem recebeu</p>
          </div>
        </div>
      </div>
    </div>
  );
};
