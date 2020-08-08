"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _api = _interopRequireDefault(require("./api"));

var _Student = _interopRequireDefault(require("../models/Student"));

var _UpdateStudentService = _interopRequireDefault(require("./UpdateStudentService"));

var _AppError = _interopRequireDefault(require("../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CreateStudentService {
  async execute({
    token,
    paramMatricula
  }) {
    const studentsRepository = (0, _typeorm.getRepository)(_Student.default);
    const verifyStudentExists = await studentsRepository.findOne({
      where: {
        matricula: paramMatricula
      }
    });

    if (verifyStudentExists) {
      const updateStudent = new _UpdateStudentService.default();
      const updated = await updateStudent.execute({
        paramMatricula,
        token
      });
      return updated;
    }

    try {
      const response = await _api.default.get('/minhas-informacoes/meus-dados/', {
        headers: {
          Authorization: `JWT ${token}`
        }
      });
      const {
        id,
        nome_usual: nomeUsual,
        matricula,
        tipo_vinculo: tipoVinculo,
        cpf,
        data_nascimento: dataDeNascimento,
        email: emailSuap,
        url_foto_150x200: avatarSuap
      } = response.data;
      const {
        nome: nomeCompleto,
        curso,
        campus,
        situacao
      } = response.data.vinculo;

      if (matricula !== paramMatricula) {
        throw new _AppError.default('Matriculas diferentes');
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
        campus
      });
      await studentsRepository.save(student);
      return student;
    } catch {
      throw new _AppError.default('Token inválido', 401);
    }
  }

}

var _default = CreateStudentService;
exports.default = _default;