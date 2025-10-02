import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DadosEmpresa } from "@/types/protocolo";

interface FormularioEmpresaProps {
  dados: DadosEmpresa;
  onChange: (dados: DadosEmpresa) => void;
}

export const FormularioEmpresa = ({ dados, onChange }: FormularioEmpresaProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Dados da Empresa Recebedora</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="empresa-codigo">Código da Empresa *</Label>
          <Input
            id="empresa-codigo"
            value={dados.codigo}
            onChange={(e) => onChange({ ...dados, codigo: e.target.value })}
            placeholder="Ex: EMP001"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="empresa-razao">Razão Social *</Label>
          <Input
            id="empresa-razao"
            value={dados.razaoSocial}
            onChange={(e) => onChange({ ...dados, razaoSocial: e.target.value })}
            placeholder="Nome da empresa"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="empresa-cnpj">CNPJ *</Label>
          <Input
            id="empresa-cnpj"
            value={dados.cnpj}
            onChange={(e) => onChange({ ...dados, cnpj: e.target.value })}
            placeholder="00.000.000/0000-00"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="empresa-endereco">Endereço Completo *</Label>
          <Input
            id="empresa-endereco"
            value={dados.endereco}
            onChange={(e) => onChange({ ...dados, endereco: e.target.value })}
            placeholder="Rua, número, bairro, cidade - UF"
            required
          />
        </div>
      </CardContent>
    </Card>
  );
};
