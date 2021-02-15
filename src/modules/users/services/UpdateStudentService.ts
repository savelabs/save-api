import { injectable, inject } from 'tsyringe';

import api from '@shared/infra/http/api';
import AppError from '@shared/errors/AppError';
import Student from '../infra/typeorm/entities/Student';
import IStudentRepository from '../repositories/IStudentRepository';

interface Request {
  token: string;
  paramMatricula: string | undefined;
}

interface Response {
  nome_usual: string;
  tipo_vinculo: string;
  data_nascimento: string;
  email: string;
  url_foto_150x200: string;
  nome: string;
}

@injectable()
class UpdateStudentService {
  constructor(
    @inject('StudentRepository')
    private studentsRepository: IStudentRepository,
  ) {}

  public async execute({ token, paramMatricula }: Request): Promise<Student> {
    try {
      const response = await api.get('/minhas-informacoes/meus-dados/', {
        headers: { Authorization: `JWT ${token}` },
      });

      const {
        nome_usual: nomeUsual,
        matricula,
        tipo_vinculo: tipoVinculo,
        cpf,
        data_nascimento: dataDeNascimento,
        email: emailSuap,
      }: Student & Response = response.data;

      const {
        nome: nomeCompleto,
        curso,
        campus,
        situacao,
      }: Response & Student = response.data.vinculo;

      if (matricula !== paramMatricula) {
        throw new AppError('Matriculas diferentes.', 401);
      }

      const student = await this.studentsRepository.findByMatricula(
        paramMatricula,
      );

      if (!student) {
        throw new AppError('Este estudante não existe.');
      }

      student.nomeUsual = nomeUsual;
      student.tipoVinculo = tipoVinculo;
      student.cpf = cpf;
      student.situacao = situacao;
      student.dataDeNascimento = dataDeNascimento;
      student.emailSuap = emailSuap;
      student.nomeCompleto = nomeCompleto;
      student.curso = curso;
      student.campus = campus;

      const studentUpdated = await this.studentsRepository.save(student);

      return studentUpdated;
    } catch {
      throw new AppError('Por favor, verifique seus dados.', 401);
    }
  }
}

export default UpdateStudentService;
