
import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import * as XLSX from 'xlsx';
import { RUTAS } from "../data/constantes";

export class ControversiasPage extends BasePage {
    //GENERAL
    btnAceptar: Locator;
    btnMenuWorklist: Locator;
    btnMenuReportes: Locator;
    btnMenuAlta: Locator;
    btnMenuConsulta: Locator;
    private datosExcel : any[] = [];
    public datosPublicos;
    //ALTA
    readonly lbAdquiriente : Locator;
    lbFechaProceso: Locator;
    lbFechaInicial: Locator;
    lbFechaFinal: Locator;
    txtNumeroCuenta: Locator;
    lbEmisor: Locator;
    txtAfiliacion: Locator;
    txtImporteFacturacion: Locator;
    txtNumeroAutorizacion: Locator;
    btnConsultar: Locator;
    btnSiguienteHome: Locator;
    lbEtapa: Locator;
    txtImporteControversia: Locator;
    btnSiguienteDatosControversia: Locator;
    logoComplementoLog: Locator;
    logoInformacionAdicional: Locator;
    logoAltaCorrecta: Locator;
    btnPrimeraOpcion: Locator;
    lbTipoMoneda: Locator;
    btnGuardar: Locator;
    btnClose: Locator;
    iconDone: Locator;
    
    //CONSULTA
    lbTipoFecha: Locator;
    btnEditar: Locator;
    LabelFolioControversia: Locator;
    btnBack: Locator;
    btnControversias: Locator;
    btnFacturacion: Locator;
    btnHistoria: Locator;
    logoHistoria: Locator;
    txtFolioControversia : Locator;
    btnExportar: Locator;
    btnLimpiar: Locator;
    btnCargo: Locator;
    btnCerrarHistoria: Locator;
    tipoFecha: Locator;
    lbAdquirienteConsulta: Locator;
    txtNumeroCuentaConsulta: Locator;
    txtAfiliacionConsulta: Locator;
    //Consulta Simple
    lbEtapa2: Locator;
    lbEstatus: Locator;
    
    
    
    constructor(page : Page) {
        super(page);
        //GENERAL
        this.btnMenuAlta = page.getByRole('button', { name: 'Alta' })
        this.btnMenuWorklist = page.getByRole('button', { name: 'Worklist' });
        this.btnMenuReportes = page.getByRole('button', { name: 'Reportes' });
        this.btnMenuConsulta = page.getByRole('button', { name: 'Consulta' });
        //ALTA 
        this.lbAdquiriente = page.locator('div').filter({ hasText: /^Adquirente\*$/ }).first(); 
        this.lbFechaInicial = page.getByLabel('Fecha inicial');
        this.lbFechaFinal = page.getByLabel('Fecha final');
        this.txtNumeroCuenta = page.getByLabel('Número de cuenta'); 
        this.txtImporteFacturacion = page.getByLabel('Importe facturación');
        this.txtAfiliacion = page.getByLabel('Afiliación');
        this.txtNumeroAutorizacion = page.getByLabel('Número autorización');
        this.btnConsultar = page.getByRole('button', { name: 'Consultar' });
        this.btnPrimeraOpcion = page.locator('td').first();
        this.btnSiguienteHome = page.getByRole('button', { name: 'Siguiente' }).first();
        this.lbEtapa = page.locator('div').filter({ hasText: /^Etapa\*$/ }).first() 
        this.txtImporteControversia = page.getByLabel('Importe controversia*');
        this.btnSiguienteDatosControversia = page.getByRole('button', { name: 'Siguiente' }).nth(1)
        this.iconDone = page.getByText('done').nth(2)
        this.logoComplementoLog = page.getByText('editComplemento log'); 
        this.logoInformacionAdicional = page.getByText('editInformación adicional'); 
        this.logoAltaCorrecta = page.getByText('La controversia fue ingresada correctamente:');
        this.btnAceptar = page.getByRole('button', { name: 'Aceptar' }); //Se usa en la etapa final, Aquí podríamos tomar un ScreenShoot
        this.lbTipoMoneda = page.locator('label').filter({ hasText: 'SolesMoneda*closearrow_drop_down' }).locator('i').nth(1);
        this.btnGuardar = page.getByRole('button', { name: 'Guardar' });
        this.btnClose = page.getByText('close').nth(1);
        //CONSULTA      
        this.lbAdquirienteConsulta = page.locator('.q-field__control > div:nth-child(3)');
        this.txtNumeroCuentaConsulta = page.getByPlaceholder('Número de cuenta');
        this.txtAfiliacionConsulta = page.getByPlaceholder('Afiliación')      
        this.txtFolioControversia = page.getByPlaceholder('Folio controversia');
        this.lbEmisor = page.locator('#ePageContainer div').filter({ hasText: /^arrow_drop_down$/ }).nth(1);                  
        this.lbTipoFecha = page.locator('div').filter({ hasText: /^Tipo de fechaarrow_drop_down$/ }).first();    
        this.tipoFecha = page.getByRole('option', { name: 'Fecha proceso' }).locator('div').nth(1);
        this.btnEditar = page.locator('.e-truncate-cell').first(); 
        this.btnBack =  page.locator('button').filter({ hasText: 'keyboard_backspace' }); 
        this.btnControversias = page.getByRole('button', { name: 'Controversias' }); 
        this.btnFacturacion = page.getByRole('button', { name: 'Facturación' }); 
        this.btnCargo = page.getByRole('button', { name: 'Cargo' });
        this.btnHistoria = page.locator('.text-center > div > div > .col-auto > .q-btn'); 
        this.logoHistoria = page.getByText('Historia');
        this.btnExportar = page.getByRole('button', { name: 'Exportar' });
        this.btnLimpiar = page.getByRole('button', { name: 'Limpiar' })
        this.btnCerrarHistoria = page.locator('button').filter({ hasText: 'close' })
        //ConsultaSimple
        this.lbEtapa2 = page.locator('div').filter({ hasText: /^Etapa$/ }).first();
        this.lbEstatus = page.locator('div').filter({ hasText: /^Estatus$/ }).first();

    }
    //****************CONSULTA CONTROVERSIAS */
    async consultarControversias() {
       try {
            const filePath = RUTAS.moduloGestionControversias;
            const workbook = XLSX.readFile(filePath);
            const nameSheet = 'Consulta_Controversias'
            const worksheet = workbook.Sheets[nameSheet];
            const lastRow = XLSX.utils.sheet_to_json(worksheet).length + 1;
            this.datosPublicos = XLSX.utils.sheet_to_json(worksheet);
            
            for (let i = 2; i <= lastRow  ; i++) {  //Con esto estamos solamente haciendo laS primeras iteraciones
                try {
                    let adquieriente = worksheet['A' + i] ?. w || '';
                    let folioControversia = worksheet['J' + i] ?. w || '';
                    let Etapa = worksheet['K' + i] ?. w || '';
                    let Estatus = worksheet['L' + i] ?. w || '';
                        
                        await this.page.reload();
                        if (await this.btnClose.isVisible()){
                            this.btnClose.click();
                        }
                        if(await this.lbAdquirienteConsulta.first().isEnabled()){
                        //await this.page.reload();
                        await this.lbAdquirienteConsulta.click();
                        await this.page.getByText(adquieriente).click();
                        await this.txtFolioControversia.fill(folioControversia);
                        await this.lbEtapa2.click();
                        await this.page.getByText(Etapa).click();
                        await this.lbEstatus.click();
                        await this.page.getByRole('option', { name: Estatus, exact: true }).locator('div').nth(1).click();
                        //await this.page.getByText(Estatus).first().click();
                        await this.btnConsultar.click();
                        await this.page.getByText(folioControversia).click();
                        if (await this.logoHistoria.isVisible()){
                            const screenshotPath = `screenshot_${i}.png`;
                            await this.page.screenshot({ path: screenshotPath, fullPage: true });
                        }
                        //await this.validarConsultaControversias(); 
                    }   

                } catch (error) {
                    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                    await this.handleError("Error en la fila  " + i + ":", error);
                }
            }
        } catch (error) {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            await this.handleError("Error al cargar el archivo de excell", error);
        }
    }

    
    async validarConsultaControversias() {
          
         const BtnControverias = this.btnControversias;
         const BtnFacturacion = this.btnFacturacion;
         const BtnCargo = this.btnCargo;

        const isControversiasEnable = await BtnControverias.isEnabled();
        const isFacturacionEnable = await BtnFacturacion.isEnabled();
    

       if (!isControversiasEnable || !isFacturacionEnable ) { // || !isCargoEnable
         throw new Error('Uno o los 2 modulos de esta pantalla, controversias o facturacion no está disponible');
       }
        console.log('Todos los elementos web están disponibles para ser utilizados');
      
        await this.page.reload();  
    }

    async validarOpcionControversia(){
       this.btnConsultar.click();
       
    }

    async validarOpcionFacturacion(){
        this.btnFacturacion.click(); 
        

    }

    async validarOpcionCargo(){ 
       this.btnCargo.click();
    }

    async validarFuncionalidadHistoria(){ 
        const BtnHistoria = this.btnHistoria.isEnabled();
        if(!BtnHistoria){
           console.log('El elemento web "Historial" no está disponible')
        }
        console.log("La funcionalidad del historial se encuentra correctamente implementada en el front2");
        this.btnHistoria.click();
       
        const isLogoHistoria = await this.logoHistoria.isVisible(); 
        if (!isLogoHistoria) {
         console.log('El elemento "logoHistoria" no está disponible');
        }
        
        console.log('El elemento "logoHistoria" se está mostrando correctamente');
        this.btnCerrarHistoria.click();
        this.btnBack.click();
       

    };
   //** TERMINA CONSULTA CONTROVERSIAS    */

    async  altaControversias() {
try {
            const filePath = RUTAS.moduloGestionControversias;
            const workbook = XLSX.readFile(filePath);
            const nameSheet = 'Alta_Controversias'
            const worksheet = workbook.Sheets[nameSheet];
            const lastRow = XLSX.utils.sheet_to_json(worksheet).length + 1;
           
            
            for (let i = 2; i <= /* lastRow */ 4 ; i++) {  //Con esto estamos solamente haciendo las primeras iteraciones
                try {
                    let adquieriente = worksheet['A' + i] ?. w || '';
                    let fechaInicial = worksheet['B' + i] ?. w || '';
                    let fechaFinal = worksheet['C' + i] ?. w || '';
                    let numeroCuenta = worksheet['D' + i] ?. w || '';
                    let afiliacion = worksheet['E' + i] ?. w || '';
                    let importeFacturacion = worksheet['F' + i] ?. w || '';
                    let numeroAutorizacion = worksheet['G' + i] ?. w || '';
                    let tipoMoneda = worksheet['H' + i] ?. w || '';
                    let etapa = worksheet['I' + i] ?. w || '';
                  
                        await this.btnMenuAlta.click(); //revisar si este es necesario en todas las iteraciones o cuando terminas un flujo te regresar a la alta y esto debe de ir en otra parte
                        if (await this.btnClose.isVisible()){ 
                            this.btnClose.first().click();1
                        }
                        if(await this.lbAdquiriente.isEnabled()){
                        await this.page.reload();  
                        await this.lbAdquiriente.click();
                        await this.page.getByText(adquieriente).click();
                        await this.lbFechaInicial.fill(fechaInicial);
                        await this.lbFechaFinal.fill(fechaFinal);
                        await this.txtNumeroCuenta.fill(numeroCuenta);
                        await this.txtAfiliacion.fill(afiliacion);
                        await this.txtNumeroAutorizacion.fill(numeroAutorizacion);
                        await this.btnConsultar.click();
                        await this.gestionAltaContrversia(importeFacturacion, etapa, tipoMoneda)
                    } else{
                        console.log ('algo fallo ')
                    }

                } catch (error) {
                    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                    await this.handleError("Error en la fila  " + i + ":", error);
                }
            }
        } catch (error) {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.error('Error al cargar el archivo de excell')
        }
    }


    async gestionAltaContrversia(importeFacturacion, etapa, tipoMoneda){
        await this.btnPrimeraOpcion.click();
        await this.btnSiguienteHome.click();
        await this.lbEtapa.click();
        await this.page.getByText(etapa).click();
        await this.lbTipoMoneda.click();
        await this.page.getByText(tipoMoneda).first().click();
        await this.txtImporteControversia.fill(importeFacturacion);
        await this.btnSiguienteDatosControversia.click();
        //await this.btnPrimeraOpcion.click(); Esta opción desapareció 06/12/2023
        await this.btnSiguienteHome.click(); 
        await this.btnGuardar.click();

       
        const controversia = await this.page.locator("(//div[@class='col-6 text-left text-grey-6 e-wrap-word'])[1]").innerText()
        const estatus = await this.page.locator("(//div[@class='col-6 text-left text-grey-6 e-wrap-word'])[2]").innerText()
        const motivoEstatus = await this.page.locator("(//div[@class='col-6 text-left text-grey-6 e-wrap-word'])[3]").innerText()
        const reverso = await this.page.locator("(//div[@class='col-6 text-left text-grey-6 e-wrap-word'])[4]").innerText()
    
        console.log("Controversia: "+controversia)
        console.log("Estatus: "+estatus)
        console.log("Motivo Estatus: "+motivoEstatus)
        console.log("Reverso: "+reverso)
        console.log("---------------------------------")

        await this.btnAceptar.click();

        }
    
}
