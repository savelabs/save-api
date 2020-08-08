import { getRepository } from 'typeorm';

import api from './api';
import Student from '../models/Student';

import AppError from '../errors/AppError';

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

class UpdateStudentService {
  public async execute({ token, paramMatricula }: Request): Promise<Student> {
    const studentsRepository = getRepository(Student);

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
        throw new AppError('Matriculas diferentes', 401);
      }

      const student = await studentsRepository.findOne({
        where: { matricula },
      });

      if (!student) {
        throw new AppError('Estudante não existe');
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

      const studentUpdated = await studentsRepository.save(student);

      return studentUpdated;
    } catch {
      throw new AppError('Token inválido', 401);
    }
  }
}

export default UpdateStudentService;
