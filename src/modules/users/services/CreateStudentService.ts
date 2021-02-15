import { injectable, inject } from 'tsyringe';

import api from '@shared/infra/http/api';
import AppError from '@shared/errors/AppError';

import Student from '../infra/typeorm/entities/Student';
import IStudentRepository from '../repositories/IStudentRepository';
import UpdateStudentService from './UpdateStudentService';

interface Request {
  token: string;
  paramMatricula: string;
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
class CreateStudentService {
  constructor(
    @inject('StudentRepository')
    private studentsRepository: IStudentRepository,
  ) {}

  public async execute({ token, paramMatricula }: Request): Promise<Student> {
    const verifyStudentExists = await this.studentsRepository.findByMatricula(
      paramMatricula,
    );

    if (verifyStudentExists) {
      const updateStudent = new UpdateStudentService(this.studentsRepository);

      const updated = await updateStudent.execute({
        paramMatricula,
        token,
      });

      return updated;
    }

    try {
      const response = await api.get('/minhas-informacoes/meus-dados/', {
        headers: { Authorization: `JWT ${token}` },
      });

      const {
        id,
        nome_usual: nomeUsual,
        matricula,
        tipo_vinculo: tipoVinculo,
        cpf,
        data_nascimento: dataDeNascimento,
        email: emailSuap,
        url_foto_150x200: avatarSuap,
      }: Student & Response = response.data;

      const {
        nome: nomeCompleto,
        curso,
        campus,
        situacao,
      }: Response & Student = response.data.vinculo;

      if (matricula !== paramMatricula) {
        throw new AppError('Verifique a sua matrícula.');
      }

      const student = await this.studentsRepository.create({
        admin: false,
        id,
        matricula,
        nomeUsual,
        tipoVinculo,
        cpf,
        situacao,
        dataDeNascimento,
        emailSuap,
        avatarSuap,
        nomeCompleto,
        curso,
        campus,
      });

      return student;
    } catch {
      throw new AppError('Não foi possível criar uma conta.', 401);
    }
  }
}

export default CreateStudentService;
