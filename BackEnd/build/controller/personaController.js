"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.personaController = void 0;
const database_1 = __importDefault(require("../database"));
class PersonaController {
    list(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const listaPersona = yield (yield database_1.default).query('SELECT * FROM persona');
            resp.json(listaPersona);
        });
    }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const user = yield (yield database_1.default).query('SELECT Correo FROM persona WHERE Correo = ?', [req.body.Correo]);
                if (user.length > 0) {
                    resp.status(400).json({ message: 'Ese correo ya existe' });
                }
                else {
                    const result = yield (yield database_1.default).query('INSERT INTO persona SET ?', [req.body]);
                    const idT = result.insertId;
                    resp.json({ message: 'Tarea Saved', idT: idT });
                }
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error saving task' });
            }
        });
    }
    update(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_Persona } = req.params;
            try {
                const user = yield (yield database_1.default).query('SELECT Correo FROM persona WHERE Correo = ?', [req.body.Correo]);
                if (user.length > 0) {
                    resp.status(400).json({ message: 'Ese correo ya existe' });
                }
                else {
                    yield (yield database_1.default).query('UPDATE persona SET ? WHERE id_Persona = ?', [req.body, id_Persona]);
                    resp.json({ message: 'Actualizando a la persona ' + req.params.id });
                }
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error updating task' });
            }
        });
    }
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_Persona } = req.params;
            try {
                yield (yield database_1.default).query('DELETE FROM persona WHERE id_Persona = ?', [id_Persona]);
                resp.json({ message: 'Persona deleted' });
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error deleting' });
            }
        });
    }
    getOne(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_Persona } = req.params;
            try {
                const persona = yield (yield database_1.default).query('SELECT * FROM persona WHERE id_Persona = ?', [id_Persona]);
                if (persona.length > 0) {
                    resp.json(persona[0]);
                }
                else {
                    resp.status(404).json({ message: 'Persona not found' });
                }
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error retrieving task' });
            }
        });
    }
}
exports.personaController = new PersonaController();
