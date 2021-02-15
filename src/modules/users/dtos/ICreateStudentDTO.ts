export default interface ICreateStudentDTO {
  id: string;
  matricula: string;
  nomeUsual: string;
  tipoVinculo: string;
  cpf: string;
  dataDeNascimento: string;
  emailSuap: string;
  email?: string | null;
  avatarSuap: string;
  avatarSave?: string | null;
  avatarSaveURL?: string | null;
  nomeCompleto: string;
  curso: string;
  turma?: string | null;
  campus: string;
  situacao: string;
  admin: boolean;
  pushtoken?: string | null;
}
