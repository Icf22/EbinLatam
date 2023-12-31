import { Locator, Page } from "@playwright/test";
import {URL, CREDENTIALS} from "../data/constantes"

export class BasePage {
    readonly page: Page;
    readonly btnIniciarSesion: Locator;
    readonly txtUserName: Locator;
    readonly txtPassword: Locator;
    readonly btnLogIn: Locator;
    readonly holakace: Locator;
    readonly btnSubMenu: Locator;
    readonly btnVentas: Locator;
    readonly lbAdquiriente: Locator;


    constructor(page: Page){
        this.page = page;
        this.btnIniciarSesion = page.getByRole('button', { name: 'Ir a inicio de sesión' });
        this.txtUserName = page.getByPlaceholder('User Name');
        this.txtPassword = page.getByPlaceholder('Password');
        this.btnLogIn = page.getByRole('button', { name: 'Log in' });
        this.btnSubMenu = page.getByText('more_horiz');
        this.btnVentas =  page.locator('.q-icon.ebind-icons.icon-icon_ventas').first();                   
        this.lbAdquiriente = page.getByText('BBVA Perú');
        

    }

    async iniciarSesion(){
        await this.page.goto(URL.EBINDLATAM);
        await this.btnIniciarSesion.click();
        await this.txtUserName.fill(CREDENTIALS.USERNAME);
        await this.txtPassword.fill(CREDENTIALS.PASSWORD);
        await this.btnLogIn.click();
    }

    async menuConsultaVentas(){
        await this.btnSubMenu.click();
        await this.btnVentas.click();
    }
  
    async cerrarSesion(){
         await this.page.getByRole('banner').getByRole('button', { name: 'Expandir' }).click();
         await this.page.getByText('Cerrar sesión').click();
         await this.page.close();
    }

    async cerrarNavegador(){
         await this.page.close();
      }


}