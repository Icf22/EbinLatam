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


    async iniciarSesion(tipoDeContraseña) {
        await this.page.goto(URL.EBINDLATAM);
        await this.btnIniciarSesion.click();
        
        let usuario;
        let contraseña;
        
        switch (tipoDeContraseña) {
            case 'Eglobal':
                usuario = CREDENTIALS.USERNAME_EGLOBAL;
                contraseña = CREDENTIALS.PASSWORD_EGLOBAL;
                break;
            case 'Adquiriente':
                usuario = CREDENTIALS.USERNAME_ADQUIRIENTE;
                contraseña = CREDENTIALS.PASSWORD_ADQUIRIENTE;
                break;
            case 'Emisor':
                usuario = CREDENTIALS.USERNAME_EMISOR;
                contraseña = CREDENTIALS.PASSWORD_EMISOR;
                break;
            default:
                throw new Error('Tipo de contraseña no válido');
        }
        await this.txtUserName.fill(usuario);
        await this.txtPassword.fill(contraseña);
        await this.btnLogIn.click();
    }
    
    // async iniciarSesion(){
    //     await this.page.goto(URL.EBINDLATAM);
    //     await this.btnIniciarSesion.click();
    //     await this.txtUserName.fill(CREDENTIALS.USERNAME);
    //     await this.txtPassword.fill(CREDENTIALS.PASSWORD);
    //     await this.btnLogIn.click();
    // }

    async menuConsultaVentas(){
        await this.btnSubMenu.click();
        await this.btnVentas.click();
    }
  
    async cerrarSesion(){
         await this.page.locator('button').filter({ hasText: 'arrow_drop_down' }).click();
         await this.page.getByText('Cerrar sesión').click();
         await this.page.close();
    }

    async cerrarNavegador(){
         await this.page.close();
      }


}