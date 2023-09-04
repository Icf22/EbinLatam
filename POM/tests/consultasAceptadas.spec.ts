import {test} from "@playwright/test";
import {BasePage} from "../pages/base.page";
import {VentasPage} from "../pages/ventas.page";

test.use({ignoreHTTPSErrors: true});
test.only('consultaVentasAceptadasEglobal', async ({page}) => {
    const basePage = new BasePage(page);
    const ventasPage = new VentasPage(page);
    await basePage.iniciarSesion();
    await basePage.menuConsultaVentas();
    await ventasPage.consultarVentasAceptadasEglobal();
    await ventasPage.validarFuncionalidades();
    await basePage.cerrarSesion();

})


test('consultaVentasAceptadasAdquiriente', async ({page}) => {
    const basePage = new BasePage(page);
    const ventasPage = new VentasPage(page);
    await basePage.iniciarSesion();
    await basePage.menuConsultaVentas();
    await ventasPage.consultarVentasAceptadasAdquiriente();
    await ventasPage.validarFuncionalidades();
    await basePage.cerrarSesion();

})

test('consultaVentasAceptadasEmisor', async ({page}) => {
    const basePage = new BasePage(page);
    const ventasPage = new VentasPage(page);
    await basePage.iniciarSesion();
    await basePage.menuConsultaVentas();
    await ventasPage.consultarVentasAceptadasEmisor();
    await ventasPage.validarFuncionalidades();
    await basePage.cerrarSesion();

})
