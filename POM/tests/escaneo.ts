import { test, expect } from '@playwright/test';

test.use({
  ignoreHTTPSErrors: true
});

test('test', async ({ page }) => {
  await page.goto('https://ebinduat-services-latam.egl-cloud.com/');
  await page.locator('label').filter({ hasText: 'Adquirente*arrow_drop_down' }).locator('i').click();  //getByText('arrow_drop_down').nth(1)
  await page.getByText('BBVA Perú').click();
  await page.getByLabel('Fecha inicial').fill('2022/07/14');
  await page.getByLabel('Fecha final').fill('2022/07/14');
  await page.getByLabel('Número de cuenta').fill('5347789400001417');
  await page.locator('label').filter({ hasText: 'Emisorarrow_drop_down' }).locator('i').click(); 
  await page.getByText('Mastercard').click();
  await page.getByLabel('Afiliación').fill('20000150');
  await page.getByLabel('Importe facturación').fill('50001.00');
  await page.getByLabel('Número autorización').fill('005983');
  await page.getByRole('button', { name: 'Consultar' }).click();
  await page.getByRole('row', { name: 'Mastercard BBVA Perú 5115788000321431 72715812092100366200285 $800.00 600013 2023/10/16 1 MEGA PHARMA SA --' }).getByRole('checkbox').click();
  await page.getByRole('button', { name: 'Siguiente' }).click();
  await page.locator('label').filter({ hasText: 'Etapa*arrow_drop_down' }).locator('i').click();
  await page.getByText('Contracargo').click();
  await page.locator('label').filter({ hasText: 'ContracargoEtapa*closearrow_drop_down' }).locator('i').nth(1).click();
  await page.getByText('Solicitud de pagare').click();
  await page.locator('label').filter({ hasText: 'SolesMoneda*closearrow_drop_down' }).locator('i').nth(1).click();
  await page.locator('#qvs_27').getByText('Soles').click();
  await page.getByLabel('Importe controversia*').fill('80.000');
  await page.getByRole('button', { name: 'Siguiente' }).nth(1).click();
  await page.getByText('I/O error on POST request for "http://172.29.79.52:8200/api-log-latam/v1/logaut/').click();
  await page.getByRole('button', { name: 'Aceptar' }).click();
  await page.locator('button').filter({ hasText: 'arrow_drop_down' }).click();
 
  //CONSULTA
  await page.getByRole('img').nth(1).click();
  await page.getByRole('button', { name: 'Consulta', exact: true }).click();
  await page.getByRole('button', { name: 'Consulta', exact: true }).click();
  await page.locator('label').filter({ hasText: 'BanorteAdquirente*closearrow_drop_down' }).locator('i').nth(1).click();
  await page.getByText('BBVA Perú').click();
  await page.getByRole('img').nth(1).click();
  await page.locator('label').filter({ hasText: 'BBVA PerúAdquirente*closearrow_drop_down' }).locator('i').nth(1).click();
  await page.locator('#qvs_38').getByText('BBVA Perú').click();
  await page.locator('label').filter({ hasText: 'Fecha transacciónTipo de fechaclosearrow_drop_down' }).locator('i').nth(1).click();
  await page.locator('#qvs_40').getByText('Fecha transacción').click();
  await page.getByLabel('Fecha inicial').click();
  await page.getByLabel('Fecha inicial').fill('2023/09/20');
  await page.locator('label').filter({ hasText: 'Fecha finalerrorNo es una fecha.' }).locator('i').first().click();
  await page.getByRole('button', { name: '18' }).click();
  await page.getByRole('button', { name: 'Consultar' }).click();
  await page.getByText('CC231012000001').click();
  await page.getByRole('button', { name: 'Facturación' }).click();
  await page.getByRole('button', { name: 'Cargo' }).click();
  await page.locator('.text-center > div > div > .col-auto > .q-btn').click();
  await page.getByText('Contracargo').click();
  await page.getByText('none').first().click();
});




//Pantalla de detalle de controversias         en la "Consulta de controversias"

Adquiriente
locator('label').filter({ hasText: 'Adquirente' }).locator('div').first()

Emisor
locator('label').filter({ hasText: 'Emisor' }).locator('div').first()

folio de la controversia
locator('label').filter({ hasText: 'Folio de la Controversia' }).locator('div').first()

Folio Eglobal
locator('label').filter({ hasText: 'Folio Eglobal' }).locator('div').first()

Fecha alta
locator('label').filter({ hasText: 'Fecha alta' }).locator('div').first()

Fecha proceso
locator('label').filter({ hasText: 'Fecha proceso' }).locator('div').first()

Número de cuenta
locator('div:nth-child(7) > div > .q-field > .q-field__inner')

Número de cuenta con asteriscos
locator('div:nth-child(8) > div > .q-field > .q-field__inner')

Fecha transaccion
locator('label').filter({ hasText: 'Fecha transacción' }).locator('div').first()

Importe transacción
locator('label').filter({ hasText: 'Importe transacción' }).locator('div').first()

Importe controversia
locator('label').filter({ hasText: 'Importe controversia' }).locator('div').first()

Número autorización
locator('label').filter({ hasText: 'Número autorización' }).locator('div').first()

Etapa
locator('label').filter({ hasText: 'Etapa' }).locator('div').first()

Motivo estatus
locator('label').filter({ hasText: /^Estatus$/ }).locator('div').first()

Numero afiliación
locator('label').filter({ hasText: 'Número afiliación' }).locator('div').first()




//pantalla de facturacion

Fecha proceso
locator('label').filter({ hasText: 'Fecha proceso' }).locator('div').first()

adquieriente
locator('label').filter({ hasText: 'Adquirente' }).locator('div').first()

emisor
locator('label').filter({ hasText: 'Emisor' }).locator('div').first()



Pantalla de Cargo   getByRole('button', { name: 'Cargo' })

locator('label').filter({ hasText: 'Fecha proceso' }).locator('div').first()

locator('label').filter({ hasText: 'Adquirente' }).locator('div').first()

locator('label').filter({ hasText: 'Emisor' }).locator('div').first()

numero de cuenta
locator('div:nth-child(4) > div > .q-field > .q-field__inner')

Numero de cuenta con asteriscos
locator('div:nth-child(5) > div > .q-field > .q-field__inner')

Importe transaccion
locator('label').filter({ hasText: 'Importe transacción' }).locator('div').first()

Numero de autorizacion
locator('label').filter({ hasText: 'Número autorización' }).locator('div').first()


Numero de afiliacion
locator('label').filter({ hasText: 'Número afiliación' }).locator('div').first()

Nombre de comercio
locator('label').filter({ hasText: 'Nombre comercio' }).locator('div').first()

Tipo producto
locator('label').filter({ hasText: 'Tipo producto' }).locator('div').first()

Tipo de transaccion
locator('label').filter({ hasText: 'Tipo transacción' }).locator('div').first()


Diferimiento
locator('label').filter({ hasText: 'Diferimiento' }).locator('div').first()


Referencia de intercambio
locator('label').filter({ hasText: 'Referencia intercambio' }).locator('div').first()

Fecha transaccion
locator('label').filter({ hasText: 'Fecha transacción' }).locator('div').first()


Parcializacion
locator('label').filter({ hasText: 'Parcialización' }).locator('div').first()


//Pantalla Cargo

Adquiriente
locator('label').filter({ hasText: 'Adquirente' }).locator('div').first()

Afiliacion
locator('label').filter({ hasText: 'Afiliación' }).locator('div').first()

Origen Movimiento
locator('label').filter({ hasText: 'Origen movimiento' }).locator('div').first()

Id origen 
locator('label').filter({ hasText: 'ID Origen' }).locator('div').first()

Folio Movimiento
locator('label').filter({ hasText: 'Folio movimiento' }).locator('div').first()

Fecha Alta
locator('label').filter({ hasText: 'Fecha alta' }).locator('div').first()

Fecha Aplicacion
locator('label').filter({ hasText: 'Fecha aplicación' }).locator('div').first()

importe 
locator('label').filter({ hasText: 'Importe' }).locator('div').first()

Estatus
locator('label').filter({ hasText: 'Estatus' }).locator('div').first()

Moneda
locator('label').filter({ hasText: 'Moneda' }).locator('div').first()