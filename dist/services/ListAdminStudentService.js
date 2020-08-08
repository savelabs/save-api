"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Student = _interopRequireDefault(require("../models/Student"));

var _AppError = _interopRequireDefault(require("../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ListAdminStudentService {
  async execute({
    student_id
  }) {
    const studentsRepository = (0, _typeorm.getRepository)(_Student.default);
    const student = await studentsRepository.findOne({
      where: {
        matricula: student_id
      }
    });

    if (!student) {
      throw new _AppError.default('Não autorizado', 401);
    }

    if (!student.admin) {
      throw new _AppError.default('Somente admins estão autorizados', 401);
    }

    const students = studentsRepository.findAndCount();
    return students;
  }

}

var _default = ListAdminStudentService;
exports.default = _default;