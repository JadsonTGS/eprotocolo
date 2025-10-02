export interface DadosEscritorio {
  nome: string;
  cnpj: string;
  endereco: string;
  contato: string;
  logo?: string;
}

export interface DadosEmpresa {
  codigo: string;
  razaoSocial: string;
  cnpj: string;
  endereco: string;
}

export interface Documento {
  id: string;
  nome: string;
  selecionado: boolean;
  valor?: string;
  vencimento?: string;
  observacao?: string;
}

export interface Protocolo {
  escritorio: DadosEscritorio;
  empresa: DadosEmpresa;
  documentos: Documento[];
  dataEmissao: Date;
  assinaturaEntrega?: string;
  assinaturaRecebimento?: string;
}
