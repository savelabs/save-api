"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureAuthenticate;

var _api = _interopRequireDefault(require("../services/api"));

var _AppError = _interopRequireDefault(require("../errors/AppError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function ensureAuthenticate(request, response, next) {
  // Validação do Token
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new _AppError.default('Token não inserido', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const tokenresponse = await _api.default.get('/minhas-informacoes/meus-dados/', {
      headers: {
        Authorization: `JWT ${token}`
      }
    });
    const {
      matricula
    } = tokenresponse.data;
    request.student = {
      id: matricula
    };
    return next();
  } catch (err) {
    throw new _AppError.default('Token inválido', 401);
  }
}