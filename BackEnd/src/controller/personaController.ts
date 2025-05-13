import { Request, Response } from "express";
import pool from '../database';

class PersonaController {

    public async list(req: Request, resp: Response) {
        const listaPersona = await (await pool).query('SELECT * FROM persona');
        resp.json(listaPersona);

    }

    public async create(req: Request, resp: Response) {
        try {
            console.log(req.body);
            const user: any[] = await (await pool).query('SELECT Correo FROM persona WHERE Correo = ?', [req.body.Correo]);


            if (user.length > 0) {
                resp.status(400).json({ message: 'Ese correo ya existe' });
            } else {
                const result = await (await pool).query('INSERT INTO persona SET ?', [req.body]);
                const idT = result.insertId;
                resp.json({ message: 'Tarea Saved', idT: idT });
            }
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error saving task' });
        }
    }



    public async update(req: Request, resp: Response) {
        const { id_Persona } = req.params;
        try {
            const user: any[] = await (await pool).query('SELECT Correo FROM persona WHERE Correo = ?', [req.body.Correo]);
            if (user.length > 0) {
                resp.status(400).json({ message: 'Ese correo ya existe' });
            } else {
                await (await pool).query('UPDATE persona SET ? WHERE id_Persona = ?', [req.body, id_Persona]);
                resp.json({ message: 'Actualizando a la persona ' + req.params.id });
            }

        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error updating task' });
        }
    }

    public async delete(req: Request, resp: Response) {
        const { id_Persona } = req.params;
        try {
            await (await pool).query('DELETE FROM persona WHERE id_Persona = ?', [id_Persona]);
            resp.json({ message: 'Persona deleted' });
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error deleting' });
        }
    }

    public async getOne(req: Request, resp: Response) {
        const { id_Persona } = req.params;
        try {
            const persona = await (await pool).query('SELECT * FROM persona WHERE id_Persona = ?', [id_Persona]);

            if (persona.length > 0) {
                resp.json(persona[0]);
            } else {
                resp.status(404).json({ message: 'Persona not found' });
            }
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error retrieving task' });
        }
    }

}

export const personaController = new PersonaController();
