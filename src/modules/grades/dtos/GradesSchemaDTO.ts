export default interface Boletins {
  disciplina: string;
  situacao: string;
  nota_etapa_1: {
    nota: number | null;
    faltas: number;
  };
  nota_etapa_2: {
    nota: number | null;
    faltas: number;
  };
  nota_etapa_3: {
    nota: number | null;
    faltas: number;
  };
  nota_etapa_4: {
    nota: number | null;
    faltas: number;
  };
}
