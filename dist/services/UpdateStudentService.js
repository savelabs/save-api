"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _api = _interopRequireDefault(require("./api"));

var _Student = _interopRequireDefault(require("../models/Student"));

var _AppError = _interopRequireDefault(require("../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UpdateStudentService {
  async execute({
    token,
    paramMatricula
  }) {
    const studentsRepository = (0, _typeorm.getRepository)(_Student.default);

    try {
      const response = await _api.default.get('/minhas-informacoes/meus-dados/', {
        headers: {
          Authorization: `JWT ${token}`
        }
      });
      const {
        nome_usual: nomeUsual,
        matricula,
        tipo_vinculo: tipoVinculo,
        cpf,
        data_nascimento: dataDeNascimento,
        email: emailSuap
      } = response.data;
      const {
        nome: nomeCompleto,
        curso,
        campus,
        situacao
      } = response.data.vinculo;

      if (matricula !== paramMatricula) {
        throw new _AppError.default('Matriculas diferentes', 401);
      }

      const student = await studentsRepository.findOne({
        where: {
          matricula
        }
      });

      if (!student) {
        throw new _AppError.default('Estudante não existe');
      }

      student.nomeUsual = nomeUsual;
      student.tipoVinculo = tipoVinculo;
      student.cpf = cpf;
      student.situacao = situacao;
      student.dataDeNascimento = dataDeNascimento;
      student.emailSuap = emailSuap;
      student.nomeCompleto = nomeCompleto;
      student.curso = curso;
      student.campus = campus;
      const studentUpdated = await studentsRepository.save(student);
      return studentUpdated;
    } catch {
      throw new _AppError.default('Token inválido', 401);
    }
  }

}

var _default = UpdateStudentService;
exports.default = _default;