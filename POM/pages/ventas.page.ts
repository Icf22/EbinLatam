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
    

constructor(page: Page){
    this.page = page;
    this.lbFechaProceso = page.getByText('arrow_drop_down').nth(2); 
    this.lbOpcionesFechaProceso = page.getByRole('listbox').getByText('Fecha Proceso');  
    this.dateFechaInicial = page.getByLabel('Fecha inicial*');  
    this.dateFechaFinal = page.getByLabel('Fecha final*')  
    this.btnConsultar = page.getByRole('button', { name: 'Consultar' })
    this.btnExportar = page.getByRole('button', { name: 'Exportar' })
    this.lbAdquiriente = page.getByLabel('Adquirente*')   
}


async consultarVentasAceptadas(){
    const filePath = RUTAS.FILEPATH;
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]; 
    const lastRow = XLSX.utils.sheet_to_json(worksheet).length + 1;
    
    for (let i = 2; i <= lastRow; i++) {
        let banco =  worksheet['B' + i].w;
        let afiliacion = worksheet['C' + i].w;
        let numeroCuenta = worksheet['D'+ i].w;
        let autorizacion = worksheet['E'+ i].w;
        let fecha = worksheet['F'+ i].w;
        let tipoFecha = worksheet['G'+ i].w;

      
        const elemento = [
          banco,
          afiliacion,
          numeroCuenta,
          autorizacion,
          fecha
       ];
       await this.lbAdquiriente.click();
       await this.page.locator(`//div[text()='${banco}']`).click();
       await this.lbFechaProceso.click();  
       await this.page.getByRole('listbox').getByText(tipoFecha).click();
       await this.dateFechaInicial.fill(fecha);
       await this.dateFechaFinal.fill(fecha);
       await this.btnConsultar.click();
       }
 }

    
}