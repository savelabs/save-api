import { getRepository } from 'typeorm';

import api from './api';
import Student from '../models/Student';
import UpdateStudentService from './UpdateStudentService';

import AppError from '../errors/AppError';

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

class CreateStudentService {
  public async execute({ token, paramMatricula }: Request): Promise<Student> {
    const studentsRepository = getRepository(Student);

    const verifyStudentExists = await studentsRepository.findOne({
      where: { matricula: paramMatricula },
    });

    if (verifyStudentExists) {
      const updateStudent = new UpdateStudentService();

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
        throw new AppError('Matriculas diferentes');
      }

      const student = studentsRepository.create({
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

      await studentsRepository.save(student);

      return student;
    } catch {
      throw new AppError('Token inválido', 401);
    }
  }
}

export default CreateStudentService;
