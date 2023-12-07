
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
    readonly btnGestionCotroversias: Locator;


    constructor(page: Page){
        this.page = page;
        this.btnIniciarSesion = page.getByRole('button', { name: 'Ir a inicio de sesión' });
        this.txtUserName = page.getByPlaceholder('User Name');
        this.txtPassword = page.getByPlaceholder('Password');
        this.btnLogIn = page.getByRole('button', { name: 'Log in' });
        this.btnSubMenu = page.getByText('more_horiz');
        this.btnVentas =  page.locator('.q-icon.ebind-icons.icon-icon_ventas').first();                    //ebind-icons icon-consulta-log q-icon notranslate
        this.btnGestionCotroversias = page.locator('.q-icon.icon-Gestion-de-controversias').first();//page.locator('a').filter({ hasText: 'Gestión de controversias'});//ebind-icons icon-Gestion-de-controversias q-icon notranslate        
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
    
    async menuConsultaVentas(){
        if(await this.btnSubMenu.isEnabled()){
            await this.btnSubMenu.click();
            await this.btnVentas.click();
        }
    }

    async menuGestionControversias(){
        if (await this.btnSubMenu.isEnabled())
        await this.btnSubMenu.click();
        await this.btnGestionCotroversias.click();
    }
  
    async cerrarSesion(){
         
        // await this.page.getByLabel('Expandir').click();  //revisar esto por que el código de arriba no cierra sesión
        await this.page.locator("(//button[@aria-label='Expandir'])[1]").click();
        await this.page.getByText('Cerrar sesión').click();
        // await this.page.locator('button').filter({ hasText: 'arrow_drop_down' }).click();
        //  await this.page.getByText('Cerrar sesión').click();
        //  await this.page.close();

        // await page.getByLabel('Expandir').click();
        // await page.getByText('Cerrar sesión').click();

    }

    async handleError(message: string, error: any) {
        console.error(message, error);
        //await this.cerrarSesion();
        //await this.cerrarNavegador();
      }

    async cerrarNavegador(){
         await this.page.close();
      }


}
