import { Component } from '@angular/core';
import { AppFloatingConfigurator } from "../../../layout/component/app.floatingconfigurator";
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';
import { ILoginPayload } from '../../../interfaces/login.interface';
import { AuthService } from '../../../services/auth.service';

const modules = [
  AppFloatingConfigurator, 
  FormsModule, 
  PasswordModule, 
  ButtonModule, 
  InputTextModule, 
  CheckboxModule,
  RouterModule,
  RippleModule
]

@Component({
  selector: 'app-login',
  standalone: true,
  imports: modules,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  checked: boolean = false;

  constructor (
    private authService: AuthService,
    private router: Router,
    private formBuild: FormBuilder
  ) {
    this.formLogin = formBuild.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  formLogin: FormGroup;

  onLogin(): void {
    if (this.formLogin.invalid) {
      console.log('Formulario inválido:', this.formLogin.errors);
      return;
    }

    //SE INICIALIZA UN OBJETO CON LOS DATOS DEL USUARIO
    const loginPayload: ILoginPayload = {
      username: this.username,
      password: this.password,
    };

    console.log(loginPayload);
    return;

    this.authService.login(loginPayload).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/admin']);
      }
    });

  }
}
