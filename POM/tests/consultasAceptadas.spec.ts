import { test } from "@playwright/test";
import { BasePage } from "../pages/base.page";

test('consultaVentasAceptadas', async({page}) =>{
   const basePage = new BasePage(page);
   await basePage.iniciarSesion();

}



)