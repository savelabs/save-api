export default interface Boletins {
  disciplina: string;
  situacao: string;
  nota_etapa_1: {
    nota: string | null;
    faltas: number;
  };
  nota_etapa_2: {
    nota: string | null;
    faltas: number;
  };
  nota_etapa_3: {
    nota: string | null;
    faltas: number;
  };
  nota_etapa_4: {
    nota: string | null;
    faltas: number;
  };
}
