import {test} from "@playwright/test";
import {ControversiasPage} from "../pages/gestionControversias.page";
import {BasePage} from "../pages/base.page"

test.use({ignoreHTTPSErrors: true});

test('consultaControversias', async ({page}) => {
   const controversias = new ControversiasPage(page);
   const basePage = new BasePage(page);
   await basePage.iniciarSesion('Eglobal');
   await basePage.menuGestionControversias();
   await controversias.consultarControversias();
   await basePage.cerrarSesion();
})


test.only('altaControversias',async ({page}) => {
   const controversias = new ControversiasPage(page);
   const basePage = new BasePage(page);
   await basePage.iniciarSesion('Eglobal');
   await basePage.menuGestionControversias();
   await controversias.altaControversias();
})