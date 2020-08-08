"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Student = /** @class */ (function () {
    function Student() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Student.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "matricula", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "nomeUsual", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "tipoVinculo", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "cpf", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "dataDeNascimento", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "emailSuap", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "avatarSuap", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "avatarSave", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "avatarSaveURL", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "nomeCompleto", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "curso", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "turma", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "campus", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Student.prototype, "situacao", void 0);
    __decorate([
        typeorm_1.Column('boolean'),
        __metadata("design:type", Boolean)
    ], Student.prototype, "admin", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Student.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Student.prototype, "updated_at", void 0);
    Student = __decorate([
        typeorm_1.Entity('students')
    ], Student);
    return Student;
}());
exports.default = Student;
