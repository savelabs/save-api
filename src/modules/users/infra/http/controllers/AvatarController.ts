import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateAvatarStudentService from '@modules/users/services/UpdateAvatarStudentService';
import DeleteAvatarStudentService from '@modules/users/services/DeleteAvatarStudentService';

export default class NotificationsController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateAvatarProfile = container.resolve(UpdateAvatarStudentService);

    const update = await updateAvatarProfile.execute({
      student_id: request.student.id,
      blobName: request.file.blobName,
    });

    return response.json(update);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const deleteAvatarProfile = container.resolve(DeleteAvatarStudentService);

    const deleteAvatar = await deleteAvatarProfile.execute({
      student_id: request.student.id,
    });

    return response.json(deleteAvatar);
  }
}
