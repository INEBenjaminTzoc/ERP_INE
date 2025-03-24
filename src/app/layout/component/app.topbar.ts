import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { Popover, PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator, PopoverModule, TieredMenuModule],
    template: ` <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <!-- <a class="layout-topbar-logo" routerLink="/">
                <div class="aspect-square h-12">
                    <img src="img/INE.png" class="mb-6 sm:mb-0 sm:me-6" alt="INE_Logo">
                </div>
                <span>ERP</span>
            </a> -->
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()">
                    <i [ngClass]="{ 'pi ': true, 'pi-moon': layoutService.isDarkTheme(), 'pi-sun': !layoutService.isDarkTheme() }"></i>
                </button>
                <div class="relative">
                    <button
                        class="layout-topbar-action layout-topbar-action-highlight"
                        pStyleClass="@next"
                        enterFromClass="hidden"
                        enterActiveClass="animate-scalein"
                        leaveToClass="hidden"
                        leaveActiveClass="animate-fadeout"
                        [hideOnOutsideClick]="true"
                    >
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </div>
            </div>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button>
                    <button type="button" class="layout-topbar-action" (click)="togglePopup(popupUserOption, $event)">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                    <p-popover #popupUserOption id="overlay_panel" [style]="{ width: '250px' }">
                        <p-tieredmenu class="border-0" [model]="userMenuItems"></p-tieredmenu>
                    </p-popover>
                </div>
            </div>
        </div>
    </div>`
})
export class AppTopbar {
    items!: MenuItem[];
    userMenuItems = [
        {
            label: 'Cuenta',
            icon: 'pi pi-fw pi-user'
        },
        {
            label: 'Configuración',
            icon: 'pi pi-fw pi-cog'
        },
        {
            label: 'Notificaciones',
            icon: 'pi pi-fw pi-bell'
        },
        {
            separator: true
        },
        {
            label: 'Cerrar Sesión',
            icon: 'pi pi-fw pi-sign-out'
        }
    ];

    constructor(public layoutService: LayoutService) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    togglePopup(op: Popover, event: any) {
        op.toggle(event);
    }
}
