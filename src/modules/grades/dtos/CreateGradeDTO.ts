import GradesSchemaDTO from './GradesSchemaDTO';

export default interface ICreateGradeDTO {
  matricula: string;
  periodo: string;
  boletins: Array<GradesSchemaDTO>;
}
