import { Component } from '@angular/core';
import { AppFloatingConfigurator } from "../../../layout/component/app.floatingconfigurator";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { ILoginPayload } from '../../../interfaces/login.interface';
import { AuthService } from '../../../services/auth.service';
import { toast } from 'ngx-sonner';

const modules = [
  AppFloatingConfigurator, 
  FormsModule, 
  ReactiveFormsModule,
  PasswordModule, 
  ButtonModule, 
  InputTextModule, 
  CheckboxModule,
  RouterModule,
  RippleModule,
]

@Component({
  selector: 'app-login',
  standalone: true,
  imports: modules,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formLogin: FormGroup;
  protected readonly toast = toast;

  constructor (
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.formLogin = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }


  onLogin(): void {
    if (this.formLogin.invalid) {
      console.log('Formulario inválido:', this.formLogin.errors);
      return;
    }

    //SE INICIALIZA UN OBJETO CON LOS DATOS DEL USUARIO
    const loginPayload: ILoginPayload = {
      username: this.formLogin.get('username')?.value,
      password: this.formLogin.get('password')?.value,
    };

    this.authService.login(loginPayload).subscribe({
      next: (response) => {
        console.log(response);
        if (response.statusCode !== 200) {
          toast.warning('Error al iniciar sesión', {
            description: response.message
          });
          return;
        }
        toast.success('Inicio de sesión exitoso');
        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/']);
      },
      error: (error) => {
        toast.error('Error al iniciar sesión', {
          description: error
        });
      }
    });

  }
}
