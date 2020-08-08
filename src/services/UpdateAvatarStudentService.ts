import { getRepository } from 'typeorm';
import azure from 'azure-storage';
import Student from '../models/Student';

import AppError from '../errors/AppError';

interface Request {
  student_id: string;
  blobName: string | undefined;
}

class UpdateAvatarStudentService {
  public async execute({ student_id, blobName }: Request): Promise<Student> {
    const studentsRepository = getRepository(Student);

    const student = await studentsRepository.findOne({
      where: { matricula: student_id },
    });

    if (!student) {
      throw new Error('Somente estudantes autenticados podem mudar o avatar');
    }

    if (student.avatarSave) {
      // Deletar avatar anterior
      const nomeAvatarAnterior = student.avatarSave;

      const blobService = azure.createBlobService();

      blobService.deleteBlobIfExists('avatar', nomeAvatarAnterior, err => {
        if (err) {
          throw new AppError('Erro ao atualizar avatar');
        }
      });
    }

    if (blobName) {
      const blobService = azure.createBlobService();
      const urlAvatar = blobService.getUrl('avatar', blobName);
      student.avatarSave = blobName;
      student.avatarSaveURL = urlAvatar;
    }

    await studentsRepository.save(student);

    return student;
  }
}

export default UpdateAvatarStudentService;
