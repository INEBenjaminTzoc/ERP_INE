import { Component } from '@angular/core';
import { AppFloatingConfigurator } from "../../../layout/component/app.floatingconfigurator";
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RippleModule } from 'primeng/ripple';

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
    this.router.navigate(['/admin']);
  }
}
