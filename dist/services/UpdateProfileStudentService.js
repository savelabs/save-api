"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Student = _interopRequireDefault(require("../models/Student"));

var _AppError = _interopRequireDefault(require("../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateAvatarStudentService {
  async execute({
    student_id,
    email,
    turma
  }) {
    const studentsRepository = (0, _typeorm.getRepository)(_Student.default);
    const student = await studentsRepository.findOne({
      where: {
        matricula: student_id
      }
    });

    if (!student) {
      throw new _AppError.default('Somente estudantes autenticados podem alterar dados', 401);
    }

    if (email) {
      student.email = email;
    }

    if (turma) {
      student.turma = turma;
    }

    await studentsRepository.save(student);
    return student;
  }

}

var _default = UpdateAvatarStudentService;
exports.default = _default;