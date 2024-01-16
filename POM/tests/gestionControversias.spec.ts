import {test} from "@playwright/test";
import {ControversiasPage} from "../pages/gestionControversias.page";
import {BasePage} from "../pages/base.page"

test.use({ignoreHTTPSErrors: true});

test('consultaControversiasSimple', async ({page}) => {
   const controversias = new ControversiasPage(page);
   const basePage = new BasePage(page);
   await basePage.iniciarSesion('Eglobal');
   await basePage.menuGestionControversias();
   await controversias.consultarControversiasSimple();
   await basePage.cerrarSesion();
})


test.only('altaControversiasSimple',async ({page}) => {
   const controversias = new ControversiasPage(page);
   const basePage = new BasePage(page);
   await basePage.iniciarSesion('Eglobal');
   await basePage.menuGestionControversias();
   await controversias.altaControversiasSimple();
})

test('consultaControversiasFullValidation', async ({page}) => {
   const controversias = new ControversiasPage(page);
   const basePage = new BasePage(page);
   await basePage.iniciarSesion('Eglobal');
   await basePage.menuGestionControversias();
   await controversias.consultarControversias();
   await basePage.cerrarSesion();
})


test.only('altaControversiasFullValidation',async ({page}) => {
   const controversias = new ControversiasPage(page);
   const basePage = new BasePage(page);
   await basePage.iniciarSesion('Eglobal');
   await basePage.menuGestionControversias();
   await controversias.altaControversias();
})