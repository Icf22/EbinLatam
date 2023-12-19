
import { test } from '@playwright/test';
import { BasePage } from '../pages/base.page';


/*test.beforeEach(async ({ page }) => {
    const basePage = new BasePage(page);
    const consultaLog = new ConsultaLogPage(page);
    await basePage.iniciarSesion();
    await consultaLog.btnSubMenu.isVisible();
    await consultaLog.menuConsultaLogPos();
});*/

test.afterEach(async ({ page }) => {
    const basePage = new BasePage(page);
    await basePage.cerrarSesion();
    await basePage.cerrarNavegador();
});