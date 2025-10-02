import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Documento } from "@/types/protocolo";

interface SelecionadorDocumentosProps {
  documentos: Documento[];
  onChange: (documentos: Documento[]) => void;
}

export const SelecionadorDocumentos = ({ documentos, onChange }: SelecionadorDocumentosProps) => {
  const handleToggle = (id: string) => {
    onChange(
      documentos.map((doc) =>
        doc.id === id ? { ...doc, selecionado: !doc.selecionado } : doc
      )
    );
  };

  const handleValorChange = (id: string, valor: string) => {
    onChange(
      documentos.map((doc) =>
        doc.id === id ? { ...doc, valor } : doc
      )
    );
  };

  const handleVencimentoChange = (id: string, vencimento: string) => {
    onChange(
      documentos.map((doc) =>
        doc.id === id ? { ...doc, vencimento } : doc
      )
    );
  };

  const adicionarDocumento = () => {
    const novoDoc: Documento = {
      id: Date.now().toString(),
      nome: "",
      selecionado: false,
    };
    onChange([...documentos, novoDoc]);
  };

  const removerDocumento = (id: string) => {
    onChange(documentos.filter((doc) => doc.id !== id));
  };

  const handleNomeChange = (id: string, nome: string) => {
    onChange(
      documentos.map((doc) =>
        doc.id === id ? { ...doc, nome } : doc
      )
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Documentos</CardTitle>
          <Button onClick={adicionarDocumento} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {documentos.map((doc) => (
          <div key={doc.id} className="space-y-3 p-4 border rounded-lg bg-secondary/30">
            <div className="flex items-start gap-3">
              <Checkbox
                id={`doc-${doc.id}`}
                checked={doc.selecionado}
                onCheckedChange={() => handleToggle(doc.id)}
                className="mt-1"
              />
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <Input
                    value={doc.nome}
                    onChange={(e) => handleNomeChange(doc.id, e.target.value)}
                    placeholder="Nome do documento"
                    className="flex-1"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removerDocumento(doc.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                {doc.selecionado && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor={`valor-${doc.id}`} className="text-sm text-muted-foreground">
                        Valor (opcional)
                      </Label>
                      <Input
                        id={`valor-${doc.id}`}
                        value={doc.valor || ""}
                        onChange={(e) => handleValorChange(doc.id, e.target.value)}
                        placeholder="R$ 0,00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`vencimento-${doc.id}`} className="text-sm text-muted-foreground">
                        Vencimento (opcional)
                      </Label>
                      <Input
                        id={`vencimento-${doc.id}`}
                        type="date"
                        value={doc.vencimento || ""}
                        onChange={(e) => handleVencimentoChange(doc.id, e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
