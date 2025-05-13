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
const pdfkit_1 = __importDefault(require("pdfkit"));
const database_1 = __importDefault(require("../database"));
class PersonaController {
    listPDF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const personas = yield (yield database_1.default).query('SELECT * FROM persona');
                const doc = new pdfkit_1.default();
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'inline; filename=personas.pdf');
                doc.pipe(res);
                doc.fontSize(18).text('Lista de Personas', { align: 'center' });
                doc.moveDown();
                personas.forEach((p, index) => {
                    doc
                        .fontSize(12)
                        .text(`${index + 1}. Nombre: ${p.Nombre} ${p.Apellidos} | Teléfono: ${p.Telefono} | Correo: ${p.Correo}`);
                    doc.moveDown(0.5);
                });
                doc.end();
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Error generando el PDF' });
            }
        });
    }
}
const personaController = new PersonaController();
exports.default = personaController;
