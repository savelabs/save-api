import { injectable, inject } from 'tsyringe';

import azure from 'azure-storage';
import AppError from '@shared/errors/AppError';
import Student from '../infra/typeorm/entities/Student';
import IStudentRepository from '../repositories/IStudentRepository';

interface Request {
  student_id: string;
  blobName: string | undefined;
}

@injectable()
class UpdateAvatarStudentService {
  constructor(
    @inject('StudentRepository')
    private studentsRepository: IStudentRepository,
  ) {}

  public async execute({ student_id, blobName }: Request): Promise<Student> {
    const student = await this.studentsRepository.findByMatricula(student_id);

    if (!student) {
      throw new Error('Esteja autenticado para mudar sua foto.');
    }

    if (student.avatarSave) {
      // Deletar avatar anterior
      const nomeAvatarAnterior = student.avatarSave;

      const blobService = azure.createBlobService();

      blobService.deleteBlobIfExists('avatar', nomeAvatarAnterior, err => {
        if (err) {
          throw new AppError('Erro ao atualizar foto de perfil.');
        }
      });
    }

    if (blobName) {
      const blobService = azure.createBlobService();
      const urlAvatar = blobService.getUrl('avatar', blobName);
      student.avatarSave = blobName;
      student.avatarSaveURL = urlAvatar;
    }

    const studentUpdated = await this.studentsRepository.save(student);
    return studentUpdated;
  }
}

export default UpdateAvatarStudentService;
