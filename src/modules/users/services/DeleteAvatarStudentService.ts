import { injectable, inject } from 'tsyringe';

import azure from 'azure-storage';
import AppError from '@shared/errors/AppError';
import Student from '../infra/typeorm/entities/Student';
import IStudentRepository from '../repositories/IStudentRepository';

interface Request {
  student_id: string;
}

@injectable()
class DeleteAvatarStudentService {
  constructor(
    @inject('StudentRepository')
    private studentsRepository: IStudentRepository,
  ) {}

  public async execute({ student_id }: Request): Promise<Student> {
    const student = await this.studentsRepository.findByMatricula(student_id);

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

    student.avatarSave = undefined;
    student.avatarSaveURL = undefined;

    await this.studentsRepository.save(student);

    return student;
  }
}

export default DeleteAvatarStudentService;
