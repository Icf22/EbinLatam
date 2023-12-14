import {test} from "@playwright/test";
import {BasePage} from "../pages/base.page";
import {VentasPage} from "../pages/ventas.page";

test.use({ignoreHTTPSErrors: true});

test.only('consultaVentasAceptadasEglobalSimple', async ({page}) => {
    const basePage = new BasePage(page);
    const ventasPage = new VentasPage(page);
    await basePage.iniciarSesion('Eglobal');
    await basePage.menuConsultaVentas();
    await ventasPage.consultarVentasAceptadasEglobal();
    //await ventasPage.validarFuncionalidades();
    await basePage.cerrarSesion();
})

test.only('consultaVentasRechazadasEglobalSimple', async ({page}) => {
    const basePage = new BasePage(page);
    const ventasPage = new VentasPage(page);
    await basePage.iniciarSesion('Eglobal');
    await basePage.menuConsultaVentas();
    await ventasPage.consultarVentasRechazadasEglobal();
    //await ventasPage.validarFuncionalidades();
    await basePage.cerrarSesion();
})


test('consultaVentasAceptadasEglobalFullValidation', async ({page}) => {
    const basePage = new BasePage(page);
    const ventasPage = new VentasPage(page);
    await basePage.iniciarSesion('Eglobal');
    await basePage.menuConsultaVentas();
    await ventasPage.consultarVentasAceptadasEglobal();
    await ventasPage.validarFuncionalidades();
    await basePage.cerrarSesion();
})
test('consultaVentasAceptadasAdquirienteFullValidation', async ({page}) => {
    const basePage = new BasePage(page);
    const ventasPage = new VentasPage(page);
    await basePage.iniciarSesion('Adquiriente');
    await basePage.menuConsultaVentas();
    await ventasPage.consultarVentasAceptadasAdquiriente();
    await ventasPage.validarFuncionalidades();
    await basePage.cerrarSesion();
})



