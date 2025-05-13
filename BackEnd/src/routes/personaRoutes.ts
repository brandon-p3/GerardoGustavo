import { Router } from "express";
import { personaController } from "../controller/personaController";



class PersonaRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get("/", personaController.list);
        this.router.post("/", personaController.create);
        this.router.put("/:id_Persona", personaController.update);
        this.router.delete("/:id_Persona", personaController.delete);
        this.router.get("/:id_Persona", personaController.getOne);
        this.router.get("/descargar/pdf", personaController.listPDF); 
    }
}

const personaRoutes = new PersonaRoutes();
export default personaRoutes.router;