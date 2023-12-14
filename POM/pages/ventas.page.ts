import {Locator, Page, errors} from "@playwright/test";
import {RUTAS} from "../data/constantes";
import * as XLSX from 'xlsx';
import {BasePage} from "../pages/base.page";


export class VentasPage extends BasePage {
    readonly page : Page;
    readonly lbAdquiriente : Locator;
    readonly lbFechaProceso : Locator;
    readonly dateFechaInicial : Locator;
    readonly dateFechaFinal : Locator;
    readonly btnConsultar : Locator;
    readonly btnExportar : Locator;
    readonly lbOpcionesFechaProceso : Locator;
    readonly txtAfiliacion : Locator;
    readonly txtNumeroCuenta : Locator;
    readonly txtAutorizacion : Locator;
    readonly loteRandom : Locator;
    private datosExcel : any[] = [];
    public datosPublicos;
    btnRehazadas: Locator;

    constructor(page : Page) {
        super(page);
        this.page = page; //--revisar si este es necesario
        this.lbFechaProceso = page.getByText('arrow_drop_down').nth(2);
        this.lbOpcionesFechaProceso = page.getByRole('listbox').getByText('Fecha Proceso');
        this.dateFechaInicial = page.getByLabel('Fecha inicial'); //('Fecha inicial*');
        this.dateFechaFinal = page.getByLabel('Fecha final'); // ('Fecha final*');
        this.txtAfiliacion = page.getByLabel('Afiliación').first();
        this.txtNumeroCuenta = page.getByPlaceholder('Número de cuenta');
        this.txtAutorizacion = page.getByPlaceholder('Número de autorización');
        this.btnConsultar = page.getByRole('button', {name: 'Consultar'});
        this.btnExportar = page.getByRole('button', { name: 'Exportar' });
        this.lbAdquiriente = page.locator('form').getByText('arrow_drop_down').first();
        this.btnRehazadas = page.getByRole('button', { name: 'Rechazadas' })

        this.loteRandom = page.locator('.q-td.text-secondary').first();  
    }
     ///****FLUJO VENTAS PERFIL EGLOBAL */
    async consultarVentasAceptadasEglobal() {
        try {
            const filePath = RUTAS.moduloVentas;
            const workbook = XLSX.readFile(filePath);
            const nameSheet = 'VENTAS CONSULTA ACEPTADAS'
            const worksheet = workbook.Sheets[nameSheet];
            const lastRow = XLSX.utils.sheet_to_json(worksheet).length + 1;
            this.datosPublicos = XLSX.utils.sheet_to_json(worksheet);

            for (let i = 2; i <= lastRow; i++) {
                try {
                    let fechaInicial = worksheet['A' + i] ?. w || '';
                    let fechaFinal = worksheet['B' + i] ?. w || '';
                    let banco = worksheet['D' + i] ?. w || '';
                    let numAfiliacion = worksheet['J' + i] ?. w || '';
                    let numCuenta = worksheet['L' + i] ?. w || '';
                    let numAutorizacion = worksheet['O' + i] ?. w || '';
                    let tipoProceso = worksheet['AG' + i] ?. w || '';
                    
                    await this.page.reload();
                    await this.lbAdquiriente.click(); 
                    await this.page.getByText(banco).click();  // await this.page.locator(`//div[text()='${banco}']`).click();
                    await this.lbFechaProceso.click();
                    await this.page.getByRole('listbox').getByText(tipoProceso).first().click();
                    await this.dateFechaInicial.click();
                    await this.dateFechaInicial.fill(fechaInicial);
                    await this.dateFechaFinal.fill(fechaFinal);
                    await this.txtAfiliacion.fill(numAfiliacion);
                    await this.txtNumeroCuenta.fill(numCuenta);
                    await this.txtAutorizacion.fill(numAutorizacion);
                    await this.btnConsultar.click();
                    //await this.page.getByText(lote).click();
        

                } catch (error) {
                    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                    console.error('Error en la fila  ' + i + ':', error);
                    this.cerrarSesion();
                    this.cerrarNavegador();
                }
            }
        } catch (error) {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.error('Error al cargar el archivo de excell')
            this.cerrarSesion();
            this.cerrarNavegador();
        }

    }

    async consultarVentasRechazadasEglobal() {
        try {
            const filePath = RUTAS.moduloVentas;
            const workbook = XLSX.readFile(filePath);
            const nameSheet = 'VENTAS CONSULTAS RECHAZADAS'
            const worksheet = workbook.Sheets[nameSheet];
            const lastRow = XLSX.utils.sheet_to_json(worksheet).length + 1;
            this.datosPublicos = XLSX.utils.sheet_to_json(worksheet);

            for (let i = 2; i <= lastRow; i++) {
                try {
                    let fechaInicial = worksheet['A' + i] ?. w || '';
                    let fechaFinal = worksheet['B' + i] ?. w || '';
                    let banco = worksheet['D' + i] ?. w || '';
                    let numAfiliacion = worksheet['J' + i] ?. w || '';
                    let numCuenta = worksheet['L' + i] ?. w || '';
                    let numAutorizacion = worksheet['O' + i] ?. w || '';
                    let tipoProceso = worksheet['AG' + i] ?. w || '';
                    
                    await this.page.reload(); 
                    await this.btnRehazadas.click();
                    await this.lbAdquiriente.click(); 
                    await this.page.getByText(banco).click();  // await this.page.locator(`//div[text()='${banco}']`).click();
                    await this.lbFechaProceso.click();
                    await this.page.getByRole('listbox').getByText(tipoProceso).first().click();
                    await this.dateFechaInicial.click();
                    await this.dateFechaInicial.fill(fechaInicial);
                    await this.dateFechaFinal.fill(fechaFinal);
                    await this.txtAfiliacion.fill(numAfiliacion);
                    await this.txtNumeroCuenta.fill(numCuenta);
                    await this.txtAutorizacion.fill(numAutorizacion);
                    await this.btnConsultar.click();
                    //await this.page.getByText(lote).click();
                

                } catch (error) {
                    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                    console.error('Error en la fila  ' + i + ':', error);
                    this.cerrarSesion();
                    this.cerrarNavegador();
                }
            }
        } catch (error) {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.error('Error al cargar el archivo de excell')
            this.cerrarSesion();
            this.cerrarNavegador();
        }

    }




    ///****FLUJO VENTAS PERFIL ADQUIERIENTE */
    async consultarVentasAceptadasAdquiriente(){
        try {
            const filePath = RUTAS.moduloVentas;
            const workbook = XLSX.readFile(filePath);
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const lastRow = XLSX.utils.sheet_to_json(worksheet).length + 1;
            this.datosPublicos = XLSX.utils.sheet_to_json(worksheet);
            

            for (let i = 2; i <= lastRow; i++) {
                try {
                    let fechaInicial = worksheet['A' + i] ?. w || '';
                    let fechaFinal = worksheet['B' + i] ?. w || '';
                    let banco = worksheet['D' + i] ?. w || '';
                    let numAfiliacion = worksheet['J' + i] ?. w || '';
                    let numCuenta = worksheet['L' + i] ?. w || '';
                    let numAutorizacion = worksheet['O' + i] ?. w || '';
                    let tipoProceso = worksheet['AG' + i] ?. w || '';

                    await this.page.reload(); 
                    await this.lbAdquiriente.click(); 
                    await this.page.getByText(banco).click();  // await this.page.locator(`//div[text()='${banco}']`).click();
                    await this.lbFechaProceso.click();
                    await this.page.getByRole('listbox').getByText(tipoProceso).first().click();
                    await this.dateFechaInicial.click();
                    await this.dateFechaInicial.fill(fechaInicial);
                    await this.dateFechaFinal.fill(fechaFinal);
                    await this.txtAfiliacion.fill(numAfiliacion);
                    await this.txtNumeroCuenta.fill(numCuenta);
                    await this.txtAutorizacion.fill(numAutorizacion);
                    await this.btnConsultar.click();

                } catch (error) {
                    console.error('Error en la fila  ' + i + ':', error);
                    this.cerrarSesion();
                    this.cerrarNavegador();
                }
            }
        } catch (error) {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.error('Error al cargar el archivo de excell')
            this.cerrarSesion();
            this.cerrarNavegador();
        }

    }


   ///****Métodos compartidos entre las clases */
    async compararDetalleVenta(i) {
       try {
        await this.page.waitForSelector('.col-12.row.q-mt-lg');
        const datosDelFrontend = await this.page.evaluate(() => {
            
            const tabla = document.querySelector('.col-12.row.q-mt-lg');
            if (! tabla) {
                console.log('tabla no existe');
                return [] as string[];
            }
            const columnas = tabla.querySelectorAll('.col-6.text-left.text-grey-6.e-wrap-word');
            const datos: string[] = [];
            columnas.forEach(elemento => {
                const dato = elemento.textContent ?. trim() ?? '';
                datos.push(dato);
            });
            
            return datos;
        })

        const datosNoEncontrados = this.datosExcel.filter(dato => dato.trim() !== '' && ! datosDelFrontend.includes(dato));

        if (datosNoEncontrados.length > 0) {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.log('Datos de Excel no encontrados en el frontend en la fila', + i, ':');
            datosNoEncontrados.forEach(dato => {
                console.log(dato);
            });
        } else {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.log('Todos los datos de Excel se encontraron en el frontenden la fila', + i, ':');
  
        }
    } catch (error) {
        console.error('Error en la fila  ' + i + ':', error);
        this.cerrarSesion();
        this.cerrarNavegador();
    }
    }


    async validarFuncionalidades() {
    try {
        await this.page.reload();
        await this.dateFechaInicial.fill('20230601');
        await this.dateFechaFinal.fill('20230701');
        await this.page.getByText('arrow_drop_down').nth(2).click();
        await this.page.getByRole('listbox').getByText('Fecha Proceso').click();
        await this.btnConsultar.click();    
        const resultado = await this.validarPestañas();
        const resultado2 = await this.validarFuncionalidadExportar(); 
        console.log(resultado);
        console.log(resultado2);
    } catch (error) {
        console.error('Error', error);
        this.cerrarSesion();
        this.cerrarNavegador();
    }
    }

    async validarPestañas() {
        try {
            
       
        const boton1 = await this.page.locator('button:nth-child(5)');
        const boton2 = await this.page.locator('button:nth-child(6)');
    
        const ambosClicleables = await boton1.isEnabled() && await boton2.isEnabled();
        
        if (ambosClicleables) {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.log('Ambas Opciones de cambiar entre pestañas se encuentran habilitados');
            
            return 'Ambos botones se encuentran habilitados';
        } else {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.log('Una o ambas opciones de cambio de pestaña no se encuentra disponibles para dar click');
            return 'Alguno o ambos botones no se encuentra disponibles para dar click';
        }
    } catch (error) {
        console.error('Error', error);
        this.cerrarSesion();
        this.cerrarNavegador();
    }
    }

    async validarFuncionalidadExportar() {
        try {
        this.loteRandom.click();
        const btn = await this.btnExportar.isEnabled();
        //const btnEnable = await btn.isVisible();

        if (btn) {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            return 'El botón exportar se encuentra habilitado';
        } else {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            return 'No se encuentra disponible el botón exportar';
        }
        } catch (error) {
        console.error('Error', error);
        this.cerrarSesion();
        this.cerrarNavegador();
          }
    }
    
}
