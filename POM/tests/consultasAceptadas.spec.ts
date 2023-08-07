import { test } from "@playwright/test";
import { BasePage } from "../pages/base.page";
import { VentasPage } from "../pages/ventas.page";

test('consultaVentasAceptadas', async({page}) =>{
   const basePage = new BasePage(page);
   const ventasPage = new VentasPage(page);
   await basePage.iniciarSesion();
   await basePage.menuConsultaVentas();
   await ventasPage.consultarVentasAceptadas();
   await basePage.cerrarSesion();

}



)