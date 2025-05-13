import { Component, OnInit } from '@angular/core';
import { ProyectsService } from '../../services/usuario.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuarios: any[] = [];
  formUsuario = { Nombre: '', Correo: '', Apellidos: '', Telefono: 0 };
  usuarioSeleccionado: any = null;

  constructor(private proyectsService: ProyectsService) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.proyectsService.getUsuarios().subscribe(
      resp => this.usuarios = resp,
      err => console.error('Error al obtener usuarios:', err)
    );
  }

  eliminarUsuario(id_Persona: string) {
    console.log(id_Persona);
    if (id_Persona) {
      this.proyectsService.DeleteUsuario(id_Persona).subscribe(
        resp => {
          this.cargarUsuarios();
        },
        err => console.error('Error al obtener usuarios:', err)
      )
    }
  }
  guardarUsuario() {
    if (this.usuarioSeleccionado) {
      const id = this.usuarioSeleccionado.id_Persona;
      this.proyectsService.UpdateUsuario(this.formUsuario, id).subscribe(() => {
        this.cargarUsuarios();
        this.cancelarEdicion();
      });
    } else {
      this.proyectsService.createUsuario(this.formUsuario).subscribe(() => {
        this.cargarUsuarios();
        this.formUsuario = { Nombre: '', Correo: '', Apellidos: '', Telefono: 0 };
      });
    }
  }

  editarUsuario(usuario: any) {
    this.usuarioSeleccionado = usuario;
    this.formUsuario = { ...usuario };
  }

  cancelarEdicion() {
    this.usuarioSeleccionado = null;
    this.formUsuario = { Nombre: '', Correo: '', Apellidos: '', Telefono: 0 };
  }

  descargarPDF() {
    this.proyectsService.getUsuariosPDF().subscribe(blob => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'usuarios.pdf';
      a.click();
      URL.revokeObjectURL(objectUrl);
    }, err => {
      console.error('Error al descargar el PDF', err);
    });
  }

}
