"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const personaController_1 = require("../controller/personaController");
class PersonaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", personaController_1.personaController.list);
        this.router.post("/", personaController_1.personaController.create);
        this.router.put("/:id_Persona", personaController_1.personaController.update);
        this.router.delete("/:id_Persona", personaController_1.personaController.delete);
        this.router.get("/:id_Persona", personaController_1.personaController.getOne);
        this.router.get("/descargar/pdf", personaController_1.personaController.listPDF);
    }
}
const personaRoutes = new PersonaRoutes();
exports.default = personaRoutes.router;
