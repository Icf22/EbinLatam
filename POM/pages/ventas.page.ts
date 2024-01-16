import {Locator, Page, errors, expect} from "@playwright/test";
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
        this.page = page;
        this.lbFechaProceso = page.getByText('arrow_drop_down').nth(2);
        this.lbOpcionesFechaProceso = page.getByRole('listbox').getByText('Fecha Proceso');
        this.dateFechaInicial = page.getByLabel('Fecha inicial');
        this.dateFechaFinal = page.getByLabel('Fecha final'); 
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
    async consultarVentasAceptadas() {
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
                    await this.page.getByText(banco).click();
                    await this.lbFechaProceso.click();
                    await this.page.getByRole('listbox').getByText(tipoProceso).first().click();
                    await this.dateFechaInicial.click();
                    await this.dateFechaInicial.fill(fechaInicial);
                    await this.dateFechaFinal.fill(fechaFinal);
                    await this.txtAfiliacion.fill(numAfiliacion);
                    await this.txtNumeroCuenta.fill(numCuenta);
                    await this.txtAutorizacion.fill(numAutorizacion);
                    await this.btnConsultar.click();
                    await this.page.waitForLoadState("domcontentloaded"); //revisar si esto espera a que cambie el texto
                    const mensaje = await buscarTexto(this.page);
                    console.log("En el registro: " + i  , mensaje);
                    async function buscarTexto(page: Page): Promise<string> {
                        const content = await page.content();
                        const result = await page.evaluate(() => {
                          const element = document.querySelector(".col-12.text-left.q-mb-md.text-primary.text-body1");
                          if (element) {
                            return element?.textContent || "";
                          } else {
                            return "";
                          }
                        });
                        return result;
                      }
                     
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
                    await this.page.getByText(banco).click();
                    await this.lbFechaProceso.click();
                    await this.page.getByRole('listbox').getByText(tipoProceso).first().click();
                    await this.dateFechaInicial.click();
                    await this.dateFechaInicial.fill(fechaInicial);
                    await this.dateFechaFinal.fill(fechaFinal);
                    await this.txtAfiliacion.fill(numAfiliacion);
                    await this.txtNumeroCuenta.fill(numCuenta);
                    await this.txtAutorizacion.fill(numAutorizacion);
                    await this.btnConsultar.click();
                    const mensaje = await buscarTexto(this.page);
                    console.log("En el registro: " + i  , mensaje);
                    async function buscarTexto(page: Page): Promise<string> {
                        const content = await page.content();
                        const result = await page.evaluate(() => {
                          const element = document.querySelector(".col-12.text-left.q-mb-md.text-primary.text-body1");
                          if (element) {
                            return element?.textContent || "";
                          } else {
                            return "";
                          }
                        });
                        return result;
                      }
                     
                   
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
                    await this.page.getByText(banco).click();
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

    async consultarVentasRechazadasFullValidation() {
        try {
            const filePath = RUTAS.moduloVentas;
            const workbook = XLSX.readFile(filePath);
            const nameSheet = 'VENTAS CONSULTAS RECHAZADAS'
            const worksheet = workbook.Sheets[nameSheet];
            const lastRow = XLSX.utils.sheet_to_json(worksheet).length + 1;
            this.datosPublicos = XLSX.utils.sheet_to_json(worksheet);
            let txnQueFallaron: string[] = [];

            for (let i = 2; i <= lastRow; i++) {
                try {
                    let fechaInicial = worksheet['A' + i] ?. w || '';
                    let fechaFinal = worksheet['B' + i] ?. w || '';
                    let fechaProceso = worksheet['C' + i] ?. w || '';
                    let banco = worksheet['D' + i] ?. w || '';
                    let codigoTransaccion = worksheet['E' + i] ?. w || '';
                    let plataforma = worksheet['F' + i] ?. w || '';
                    let codigoIntercambio = worksheet['G' + i] ?. w || '';
                    let fechaTransaccion = worksheet['H' + i] ?. w || '';
                    let horaTransaccion = worksheet['I' + i] ?. w || '';
                    let numAfiliacion = worksheet['J' + i] ?. w || '';
                    let numReferenciaRrn = worksheet['K' + i] ?. w || '';
                    let numCuenta = worksheet['L' + i] ?. w || '';
                    let numCuenta2 = worksheet['M' + i] ?. w || '';
                    let referenciaIntercambio = worksheet['N' + i] ?. w || '';
                    let numAutorizacion = worksheet['O' + i] ?. w || '';
                    let importeTransaccion = worksheet['P' + i] ?. w || '';
                    let importeCashback = worksheet['Q' + i] ?. w || '';
                    let moneda = worksheet['R' + i] ?. w || '';
                    let registroLog = worksheet['S' + i] ?. w || '';
                    let emisor = worksheet['T' + i] ?. w || '';
                    let codigoError = worksheet['U' + i] ?. w || '';
                    let codigoRiesgo = worksheet['V' + i] ?. w || '';
                    let codigoTipoProducto = worksheet['W' + i] ?. w || '';
                    let numContrato = worksheet['X' + i] ?. w || '';
                    let cuentaRecaudadora = worksheet['Y' + i] ?. w || '';
                    let codigoMedioAcceso = worksheet['Z' + i] ?. w || '';
                    let codigoIndicadorComercioElectronico = worksheet['AA' + i] ?. w || '';
                    let diferimientoPromocion = worksheet['AB' + i] ?. w || '';
                    let parcializadoPromocion = worksheet['AC' + i] ?. w || '';
                    let banderaTarjetaPresente = worksheet['AD' + i] ?. w || '';
                    let descripcionTipoMoneda = worksheet['AE' + i] ?. w || '';
                    let importePropina = worksheet['AF' + i] ?. w || '';
                    let tipoProceso = worksheet['AG' + i] ?. w || '';
                    let lote = worksheet['AH' + i] ?. w || '';
                    
                    const elemento = [
                        numAutorizacion,
                        numAfiliacion
                    ];

                    await this.page.reload();
                    await this.lbAdquiriente.first().click();
                    await this.page.getByText(banco).click();
                    await this.lbFechaProceso.click();
                    await this.page.getByRole('listbox').getByText(tipoProceso).first().click();
                    await this.dateFechaInicial.click();
                    await this.dateFechaInicial.fill(fechaInicial);
                    await this.dateFechaFinal.fill(fechaFinal);
                    await this.txtAfiliacion.fill(numAfiliacion);
                    await this.txtNumeroCuenta.fill(numCuenta);
                    await this.txtAutorizacion.fill(numAutorizacion);
                    await this.btnConsultar.click();
                    const registros = this.validarRegistros(elemento);

                    const condicionesNoCumplidas =
                    (await registros).missingElements.length !== 0
                    console.log (condicionesNoCumplidas);

                    if (condicionesNoCumplidas) {
                      console.log('No se cumplieron las condiciones');
                      console.log('Registros faltantes :', (await registros).missingElements.length);
                      txnQueFallaron.push("-Fallo la transacción numero "+(i-1));  
                    }

                    console.log(
                      "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
                    );
                    console.log(
                      "Registros que si se muestran en el grid:",
                      (await registros).similarElements
                    );

                } catch (error) {
                    console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                    console.error('Error en la fila  ' + i + ':', error);
                    this.cerrarSesion();
                    this.cerrarNavegador();
                }

                if(txnQueFallaron.length !== 0){ //revisar este reporte
                  console.log("***************** FALLAS QUE HUBO DURANTE LA EJECUCION ********************************")
                  console.log("Numero de transacciones que fallaron: "+txnQueFallaron.length);
                  for (const elemento of txnQueFallaron) {
                    console.log(elemento + '\n'); 
                  }
                  console.log('----------->REVISAR LOG'); 
                  console.log("***************************************************************************************")
                }
            }
        } catch (error) {
            console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.error('Error al cargar el archivo de excell')
            this.cerrarSesion();
            this.cerrarNavegador();
        }

    }
    
    async consultarVentasAceptadasFullValidation() {
      try {
          const filePath = RUTAS.moduloVentas;
          const workbook = XLSX.readFile(filePath);
          const nameSheet = 'VENTAS CONSULTA ACEPTADAS'
          const worksheet = workbook.Sheets[nameSheet];
          const lastRow = XLSX.utils.sheet_to_json(worksheet).length + 1;
          this.datosPublicos = XLSX.utils.sheet_to_json(worksheet);
          let txnQueFallaron: string[] = [];

          for (let i = 2; i <= lastRow; i++) {
              try {
                  let fechaInicial = worksheet['A' + i] ?. w || '';
                  let fechaFinal = worksheet['B' + i] ?. w || '';
                  let fechaProceso = worksheet['C' + i] ?. w || '';
                  let banco = worksheet['D' + i] ?. w || '';
                  let codigoTransaccion = worksheet['E' + i] ?. w || '';
                  let plataforma = worksheet['F' + i] ?. w || '';
                  let codigoIntercambio = worksheet['G' + i] ?. w || '';
                  let fechaTransaccion = worksheet['H' + i] ?. w || '';
                  let horaTransaccion = worksheet['I' + i] ?. w || '';
                  let numAfiliacion = worksheet['J' + i] ?. w || '';
                  let numReferenciaRrn = worksheet['K' + i] ?. w || '';
                  let numCuenta = worksheet['L' + i] ?. w || '';
                  let numCuenta2 = worksheet['M' + i] ?. w || '';
                  let referenciaIntercambio = worksheet['N' + i] ?. w || '';
                  let numAutorizacion = worksheet['O' + i] ?. w || '';
                  let importeTransaccion = worksheet['P' + i] ?. w || '';
                  let importeCashback = worksheet['Q' + i] ?. w || '';
                  let moneda = worksheet['R' + i] ?. w || '';
                  let registroLog = worksheet['S' + i] ?. w || '';
                  let emisor = worksheet['T' + i] ?. w || '';
                  let codigoError = worksheet['U' + i] ?. w || '';
                  let codigoRiesgo = worksheet['V' + i] ?. w || '';
                  let codigoTipoProducto = worksheet['W' + i] ?. w || '';
                  let numContrato = worksheet['X' + i] ?. w || '';
                  let cuentaRecaudadora = worksheet['Y' + i] ?. w || '';
                  let codigoMedioAcceso = worksheet['Z' + i] ?. w || '';
                  let codigoIndicadorComercioElectronico = worksheet['AA' + i] ?. w || '';
                  let diferimientoPromocion = worksheet['AB' + i] ?. w || '';
                  let parcializadoPromocion = worksheet['AC' + i] ?. w || '';
                  let banderaTarjetaPresente = worksheet['AD' + i] ?. w || '';
                  let descripcionTipoMoneda = worksheet['AE' + i] ?. w || '';
                  let importePropina = worksheet['AF' + i] ?. w || '';
                  let tipoProceso = worksheet['AG' + i] ?. w || '';
                  let lote = worksheet['AH' + i] ?. w || '';
                  
                  const elemento = [
                    numAutorizacion,
                    numAfiliacion
                ];

                  await this.page.reload();
                  await this.lbAdquiriente.first().click();
                  await this.page.getByText(banco).click();
                  await this.lbFechaProceso.click();
                  await this.page.getByRole('listbox').getByText(tipoProceso).first().click();
                  await this.dateFechaInicial.click();
                  await this.dateFechaInicial.fill(fechaInicial);
                  await this.dateFechaFinal.fill(fechaFinal);
                  await this.txtAfiliacion.fill(numAfiliacion);
                  await this.txtNumeroCuenta.fill(numCuenta);
                  await this.txtAutorizacion.fill(numAutorizacion);
                  await this.btnConsultar.click();
                  const registros = this.validarRegistros(elemento);

                  const condicionesNoCumplidas =
                  (await registros).missingElements.length !== 0
                  //console.log (condicionesNoCumplidas);

                  if (condicionesNoCumplidas) {
                    console.log('No se cumplieron las condiciones');
                    console.log('Registros faltantes :', (await registros).missingElements.length);
                    txnQueFallaron.push("-Fallo la transacción numero "+(i-1));  
                  }

                  console.log(
                    "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
                  );
                  console.log(
                    "Registros que si se muestran en el grid:",
                    (await registros).similarElements
                  );

              } catch (error) {
                  console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
                  console.error('Error en la fila  ' + i + ':', error);
                  this.cerrarSesion();
                  this.cerrarNavegador();
              }

              if(txnQueFallaron.length !== 0){ //revisar este reporte
                console.log("***************** FALLAS QUE HUBO DURANTE LA EJECUCION ********************************")
                console.log("Numero de transacciones que fallaron: "+txnQueFallaron.length);
                for (const elemento of txnQueFallaron) {
                  console.log(elemento + '\n'); 
                }
                console.log('----------->REVISAR LOG'); 
                console.log("***************************************************************************************")
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
   async validarGrid(expectedHeaderTexts: string[]) {
    try {
      const gridTextos = await this.page.evaluate(() => {
        const thElements = Array.from(
          document.querySelectorAll("th.text-center.sortable")
        );
        const gridTextos = thElements.map((th) => th.textContent?.trim());
        return gridTextos;
      });

      const missingElements: string[] = [];
      const elementsPresent: string[] = [];
      const elementsOutOfOrder: string[] = [];

      for (const element of expectedHeaderTexts) {
        if (gridTextos.includes(element)) {
          elementsPresent.push(element);
        } else {
          //missingElements.push(element);
        }
      }
      for (const element of elementsPresent.reverse()) {
        const expectedIndex = expectedHeaderTexts.indexOf(element);
        const actualIndex = gridTextos.indexOf(element);
        if (expectedIndex !== actualIndex) {
          elementsOutOfOrder.push(element);
        }
      }
      return {
        gridTextos,
        elementsPresent,
        missingElements,
        elementsOutOfOrder,
      };
    } catch (error) {
      await this.handleError(
        "Ocurrió un error al validar headers del grid:",
        error
      );
      throw error;
    }
  }
  async validarRegistros(expectedRegistersTexts: string[]) {
    try {
      let gridTextos: string[] = [];
      await this.page.waitForLoadState("domcontentloaded");
      await this.page.waitForSelector("td.q-td>div");
      gridTextos = await this.page.evaluate(() => {
        const thElements = Array.from(document.querySelectorAll("td.q-td>div"));
        const gridTextos1 = thElements.map(
          (th) => th.textContent?.trim()
        ) as string[];
        const gridTextos = gridTextos1.filter(
          (text) => text.trim() !== "--" && text.trim() !== ""
        );
        return gridTextos;
      });
      const missingElements: string[] = [];
      const similarElements: string[] = [];

      for (const element of expectedRegistersTexts) {
        if (gridTextos.includes(element)) {
          similarElements.push(element);
        } else {
          missingElements.push(element);
        }
      }

      return { missingElements, similarElements, gridTextos };
    } catch (error) {
      console.log("Ocurrió un error al validar los datos del grid:", error);
      throw error;
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
