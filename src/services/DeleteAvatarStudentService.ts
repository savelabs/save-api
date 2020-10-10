import { getRepository } from 'typeorm';
import azure from 'azure-storage';
import Student from '../models/Student';

import AppError from '../errors/AppError';

interface Request {
  student_id: string;
}

class DeleteAvatarStudentService {
  public async execute({ student_id }: Request): Promise<Student> {
    const studentsRepository = getRepository(Student);

    const student = await studentsRepository.findOne({
      where: { matricula: student_id },
    });

    if (!student) {
      throw new Error('Esteja autenticado para deletar sua foto.');
    }

    if (!student.avatarSave) {
      throw new AppError('Foto de perfil inexistente.');
    }

    const nomeAvatarAnterior = student.avatarSave;

    const blobService = azure.createBlobService();

    blobService.deleteBlobIfExists('avatar', nomeAvatarAnterior, err => {
      if (err) {
        throw new AppError('Erro ao deletar foto de perfil.');
      }
    });

    student.avatarSave = null;
    student.avatarSaveURL = null;

    await studentsRepository.save(student);

    return student;
  }
}

export default DeleteAvatarStudentService;
