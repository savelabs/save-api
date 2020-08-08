"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _api = _interopRequireDefault(require("../services/api"));

var _upload = _interopRequireDefault(require("../config/upload"));

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

var _CreateStudentService = _interopRequireDefault(require("../services/CreateStudentService"));

var _UpdateAvatarStudentService = _interopRequireDefault(require("../services/UpdateAvatarStudentService"));

var _UpdateProfileStudentService = _interopRequireDefault(require("../services/UpdateProfileStudentService"));

var _ListStudentService = _interopRequireDefault(require("../services/ListStudentService"));

var _ListAdminStudentService = _interopRequireDefault(require("../services/ListAdminStudentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const studentsRouter = (0, _express.Router)();
studentsRouter.get('/profile', _ensureAuthenticated.default, async (request, response) => {
  const student_id = request.student.id;
  const listProfile = new _ListStudentService.default();
  const listprofile = await listProfile.execute({
    student_id
  });
  return response.json(listprofile);
});
studentsRouter.get('/profiles', _ensureAuthenticated.default, async (request, response) => {
  const student_id = request.student.id;
  const listAdmin = new _ListAdminStudentService.default();
  const listadmin = await listAdmin.execute({
    student_id
  });
  return response.json(listadmin);
});
studentsRouter.post('/', async (request, response) => {
  const {
    matricula,
    password
  } = request.body;
  await _api.default.post('/autenticacao/token/', {
    username: matricula,
    password
  }).catch(err => {
    throw new _AppError.default(`Credenciais inválidas, ${err.message}`, 401);
  }).then(async tokenresponse => {
    const {
      token
    } = tokenresponse.data;
    const createStudent = new _CreateStudentService.default();
    const student = await createStudent.execute({
      paramMatricula: matricula,
      token
    });
    return response.json({
      student,
      token
    });
  });
});
studentsRouter.put('/avatar', _ensureAuthenticated.default, _upload.default.single('avatar'), async (request, response) => {
  const updateAvatarProfile = new _UpdateAvatarStudentService.default();
  const update = await updateAvatarProfile.execute({
    student_id: request.student.id,
    blobName: request.file.blobName
  });
  return response.json(update);
});
studentsRouter.put('/profile', _ensureAuthenticated.default, async (request, response) => {
  const {
    email,
    turma
  } = request.body;
  const updateProfile = new _UpdateProfileStudentService.default();
  const profile = await updateProfile.execute({
    student_id: request.student.id,
    email,
    turma
  });
  return response.json(profile);
});
var _default = studentsRouter;
exports.default = _default;