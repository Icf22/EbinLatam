import { Locator, Page } from "@playwright/test";
import {RUTAS } from "../data/constantes";
import * as XLSX from 'xlsx';


export class VentasPage{
readonly page: Page;
readonly lbAdquiriente: Locator;
readonly lbFechaProceso: Locator;
readonly dateFechaInicial: Locator;
readonly dateFechaFinal: Locator;
readonly btnConsultar: Locator;
readonly btnExportar: Locator;
readonly lbOpcionesFechaProceso: Locator;
readonly txtAfiliacion: Locator;
readonly txtNumeroCuenta: Locator;
readonly txtAutorizacion: Locator;
private datosExcel: any[] = [];


constructor(page: Page){
    this.page = page;
    this.lbFechaProceso = page.getByText('arrow_drop_down').nth(2); 
    this.lbOpcionesFechaProceso = page.getByRole('listbox').getByText('Fecha Proceso');  
    this.dateFechaInicial = page.getByLabel('Fecha inicial*');  
    this.dateFechaFinal = page.getByLabel('Fecha final*');  
    this.txtAfiliacion = page.getByLabel('Afiliación');
    this.txtNumeroCuenta = page.getByPlaceholder('Número de cuenta');
    this.txtAutorizacion = page.getByPlaceholder('Número de autorización');
    this.btnConsultar = page.getByRole('button', { name: 'Consultar' });
    this.btnExportar = page.getByRole('button', { name: 'Exportar' });
    this.lbAdquiriente = page.getByLabel('Adquirente*');   
}

async consultarVentasAceptadas(){
    const filePath = RUTAS.FILEPATH;
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]; 
    const lastRow = XLSX.utils.sheet_to_json(worksheet).length + 1;
    

        for (let i = 2; i <= lastRow; i++) {
          
          let fecha = worksheet['A'+ i]?.w || '';
          let banco =  worksheet['B' + i]?.w || '';
          let codigoTransaccion = worksheet['C'+i]?.w || '';
          let plataforma = worksheet['D'+i]?.w || '';
          let codigoIntercambio = worksheet['E'+i]?.w || '';
          let fechaTransaccion = worksheet['F'+i]?.w || '';
          let horaTransaccion = worksheet['G'+i]?.w || '';
          let numAfiliacion = worksheet['H' + i]?.w || '';
          let numReferenciaRrn = worksheet['I'+i]?.w || '';
          let numCuenta = worksheet['J'+ i]?.w || '';
          let numCuenta2= worksheet['K'+i]?.w || '';
          let referenciaIntercambio = worksheet['L'+i]?.w || '';
          let numAutorizacion = worksheet['M'+ i]?.w || '';
          let importeTransaccion= worksheet['N'+i]?.w || '';
          let importeCashback= worksheet['O'+i]?.w || '';
          let moneda= worksheet['P'+i]?.w || '';
          let registroLog= worksheet['Q'+i]?.w || '';
          let emisor= worksheet['R'+i]?.w || '';
          let codigoError= worksheet['S'+i]?.w || '';
          let codigoRiesgo= worksheet['T'+i]?.w || '';
          let codigoTipoProducto= worksheet['U'+i]?.w || '';
          let numContrato= worksheet['V'+i]?.w || '';
          let cuentaRecaudadora= worksheet['W'+i]?.w || '';
          let codigoMedioAcceso= worksheet['X'+i]?.w || '';
          let codigoIndicadorComercioElectronico= worksheet['Y'+i]?.w || '';
          let diferimientoPromocion= worksheet['Z'+i]?.w || '';
          let parcializadoPromocion= worksheet['AA'+i]?.w || '';
          let banderaTarjetaPresente= worksheet['AB'+i]?.w || '';
          let descripcionTipoMoneda= worksheet['AC'+i]?.w || '';
          let tipoProceso = worksheet['AD'+ i]?.w || '';
          let lote = worksheet['AE'+i]?.w || '';
          let fechaDatePicker = worksheet['AF'+i]?.w || '';

      
       this.datosExcel = [fecha, banco, codigoTransaccion, plataforma, codigoIntercambio, fechaTransaccion, horaTransaccion, numAfiliacion, numReferenciaRrn, numCuenta, numCuenta2,referenciaIntercambio,
       numAutorizacion, importeTransaccion, importeCashback, moneda, registroLog, emisor, codigoError, codigoRiesgo, codigoTipoProducto, numContrato, cuentaRecaudadora, codigoMedioAcceso,
        codigoIndicadorComercioElectronico, diferimientoPromocion, parcializadoPromocion, banderaTarjetaPresente, descripcionTipoMoneda ];

       await this.lbAdquiriente.click();
       await this.page.locator(`//div[text()='${banco}']`).click();
       await this.lbFechaProceso.click();  
       await this.page.getByRole('listbox').getByText(tipoProceso).click();
       await this.dateFechaInicial.fill(fechaDatePicker);
       await this.dateFechaFinal.fill(fechaDatePicker);
       await this.txtAfiliacion.fill(numAfiliacion);
       await this.txtNumeroCuenta.fill(numCuenta);
       await this.txtAutorizacion.fill(numAutorizacion);
       await this.btnConsultar.click();
       await this.page.getByText(lote).click();
       await this.compararDetalleVenta(i, this.datosExcel);
       }
 }

     async compararDetalleVenta(i, datoExcel){
      await this.page.waitForSelector('.col-12.row.q-mt-lg');

      const datosDelFrontend = await this.page.evaluate(() => {
        const tabla = document.querySelector('.col-12.row.q-mt-lg');
    
        if (!tabla) {
          console.log('tabla no existe en la iteración número '+ i);
          return [];
        }
    
        const columnas = tabla.querySelectorAll('.col-6.text-left.text-grey-6.e-wrap-word');
        const datos: string[] = [];
    
        columnas.forEach(elemento => {
          const dato = elemento.textContent?.trim() ?? '';
          datos.push(dato);
        });
    
        return datos;
      });
    
      console.log(datosDelFrontend);
    
      const minLength = Math.min(this.datosExcel.length, datosDelFrontend.length);
    
      for (let i = 0; i < minLength; i++) {
        const datoExcel = this.datosExcel[i];
        const datoFrontend = datosDelFrontend[i];
    
        if (!datoExcel || !datoFrontend) {     // Salta la comparación si una de las matrices tiene datos vacíos
          continue;
        }
    
        if (datoExcel !== datoFrontend) {
          console.log(`Error en el registro ${i + 1}`);
        }
      }
    
      console.log('Datos comparados satisfactoriamente en la iteración: '+ i);
     }

    
}