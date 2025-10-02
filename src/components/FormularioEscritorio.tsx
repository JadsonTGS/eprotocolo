import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { DadosEscritorio } from "@/types/protocolo";

interface FormularioEscritorioProps {
  dados: DadosEscritorio;
  onChange: (dados: DadosEscritorio) => void;
}

export const FormularioEscritorio = ({ dados, onChange }: FormularioEscritorioProps) => {
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...dados, logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Dados do Escritório</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="escritorio-nome">Nome do Escritório *</Label>
          <Input
            id="escritorio-nome"
            value={dados.nome}
            onChange={(e) => onChange({ ...dados, nome: e.target.value })}
            placeholder="Ex: Contabilidade Silva & Santos"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="escritorio-cnpj">CNPJ *</Label>
          <Input
            id="escritorio-cnpj"
            value={dados.cnpj}
            onChange={(e) => onChange({ ...dados, cnpj: e.target.value })}
            placeholder="00.000.000/0000-00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="escritorio-endereco">Endereço Completo *</Label>
          <Input
            id="escritorio-endereco"
            value={dados.endereco}
            onChange={(e) => onChange({ ...dados, endereco: e.target.value })}
            placeholder="Rua, número, bairro, cidade - UF"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="escritorio-contato">Contato (Telefone/Email) *</Label>
          <Input
            id="escritorio-contato"
            value={dados.contato}
            onChange={(e) => onChange({ ...dados, contato: e.target.value })}
            placeholder="(00) 0000-0000 / email@escritorio.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="escritorio-logo">Logo (Opcional)</Label>
          <div className="flex items-center gap-4">
            {dados.logo && (
              <img src={dados.logo} alt="Logo" className="h-16 w-16 object-contain border rounded" />
            )}
            <Label
              htmlFor="escritorio-logo"
              className="flex items-center gap-2 cursor-pointer px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              <Upload className="h-4 w-4" />
              <span className="text-sm">Upload Logo</span>
            </Label>
            <input
              id="escritorio-logo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
