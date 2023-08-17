import { test } from "@playwright/test";
import { BasePage } from "../pages/base.page";
import { VentasPage } from "../pages/ventas.page";

test.use({ignoreHTTPSErrors: true});
test('consultaVentasAceptadas', async({page}) =>{
   const basePage = new BasePage(page);
   const ventasPage = new VentasPage(page);
   await basePage.iniciarSesion();
   await basePage.menuConsultaVentas();
   await ventasPage.consultarVentasAceptadas();
  //metodo para comprobar que todo en el front está bien
   await basePage.cerrarSesion();

}

)