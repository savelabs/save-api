"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddAvatarUrlStudent1596738404950 {
  async up(queryRunner) {
    await queryRunner.addColumn('students', new _typeorm.TableColumn({
      name: 'avatarSaveURL',
      type: 'varchar',
      isUnique: true,
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('students');
  }

}

exports.default = AddAvatarUrlStudent1596738404950;