import { Locator, Page } from "@playwright/test";
import {URL, CREDENTIALS} from "../data/constantes"

export class BasePage {
    readonly page: Page;
    readonly btnIniciarSesion: Locator;
    readonly txtUserName: Locator;
    readonly txtPassword: Locator;
    readonly btnLogIn: Locator;

   

    constructor(page: Page){
        this.page = page;
        this.btnIniciarSesion = this.page.locator('#idToken1')
        this.txtUserName = this.page.getByPlaceholder('#idToken2');
        this.txtPassword =  this.page.locator('#loginButton_0');
        this.btnLogIn = this.page.getByRole('button', {name: 'loginButton_0'}  )
        /*
        this.btnInicioSesion = this.page.getByText('Ir a inicio de sesión');
        this.txtUserName = this.page.getByPlaceholder('User Name');
        this.txtPassword = this.page.getByPlaceholder('Password');
        this.btnLogIn = this.page.getByRole('button', { name: 'Log in' });
        */
    }

    async iniciarSesion(){
        await this.page.goto(URL.EBINDLATAM);
        await this.btnIniciarSesion.click;
        await this.txtUserName.fill(CREDENTIALS.USERNAME);
        await this.txtPassword.fill(CREDENTIALS.PASSWORD);
        await this.btnLogIn.click();
    }


}