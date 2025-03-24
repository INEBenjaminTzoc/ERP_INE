import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, NgxSonnerToaster],
    template: `<router-outlet></router-outlet><ngx-sonner-toaster richColors position="bottom-left" />`
})
export class AppComponent {}
