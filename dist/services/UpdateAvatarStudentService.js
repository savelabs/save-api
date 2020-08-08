"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _azureStorage = _interopRequireDefault(require("azure-storage"));

var _Student = _interopRequireDefault(require("../models/Student"));

var _AppError = _interopRequireDefault(require("../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateAvatarStudentService {
  async execute({
    student_id,
    blobName
  }) {
    const studentsRepository = (0, _typeorm.getRepository)(_Student.default);
    const student = await studentsRepository.findOne({
      where: {
        matricula: student_id
      }
    });

    if (!student) {
      throw new Error('Somente estudantes autenticados podem mudar o avatar');
    }

    if (student.avatarSave) {
      // Deletar avatar anterior
      const nomeAvatarAnterior = student.avatarSave;

      const blobService = _azureStorage.default.createBlobService();

      blobService.deleteBlobIfExists('avatar', nomeAvatarAnterior, err => {
        if (err) {
          throw new _AppError.default('Erro ao atualizar avatar');
        }
      });
    }

    if (blobName) {
      const blobService = _azureStorage.default.createBlobService();

      const urlAvatar = blobService.getUrl('avatar', blobName);
      student.avatarSave = blobName;
      student.avatarSaveURL = urlAvatar;
    }

    await studentsRepository.save(student);
    return student;
  }

}

var _default = UpdateAvatarStudentService;
exports.default = _default;