"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SuapApi = _axios.default.create({
  baseURL: 'https://suap.ifrn.edu.br/api/v2'
});

var _default = SuapApi;
exports.default = _default;