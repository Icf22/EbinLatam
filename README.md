# EbinLatam


EbindLatam
Tencnologías Usadas en este Framework: -Typescript -Nodejs -Playwright

Pasos para ejecutar este proyecto 
1.- Ejecutar en terminal de Visual studio "npm Install" -- Este comando nos ayudará a instalar los paquetes de node junto con las dependencias que se encuentran en el archivo package.json

2.- Preguntar cuál de los distintos servidores de Ebind se encuentra actualizado y disponible para ejecutar pruebas y cambiarlo

3.- Revisar las configuraciones del archivo constantes.ts para ver que tengamos la información que requiere el flujo que vamos a ejecutar, como por ejemplo las credenciales de acceso a las distintas plataformas

4.- Si estás utilizando Visual Studio Code(Recomendado) puedes ir a la opción de extensiones y desde ahí descargar una que se llama "Playwright Test for VSCode" creada por el mismo Microsft

5.- Elegir entre los distintos comandos de Playwright que nos sirven para ejecuta test, estando la documentación oficial para realizar este proyecto en la siguiente liga : https://playwright.dev/docs/running-tests Ejemplo rápido para ejecutar un test a continuación : npx playwright test consultaLog.spec.ts



###### QUERY PARA OBENER DATOS Y LLENAR EL EXCEL NECESARIO PARA PODER EJECUTAR EL TESTE ConsultasAceptadas TEST ### 
## Donde lo que cambiaremos sería la fecha de busqueda por la fecha en donde se encuentren ambientados los datos por parte de los testers manuales en Postgress en la base de datos donde se encuentra la tabla "d_lotes" (Falta agregar accesos y pasos para ingresar a la base de datos)

SELECT DISTINCT ON (numero_afiliacion)
  fh_proceso,id_adquirente,cod_tipo_transaccion,id_plataforma,cod_tipo_intercambio,fh_transaccion,hr_transaccion,numero_afiliacion,numero_referencia_rrn,numero_cuenta,referencia_intercambio,
  numero_autorizacion,importe_transaccion,importe_cashback,cod_tipo_moneda,registro_llave_log,id_emisor,cod_error,cod_riesgo,cod_tipo_producto,numero_contrato,
  cuenta_recaudadora,cod_medio_acceso,cod_indicador_comercio_electronico,diferimiento_promocion,parcializacion_promocion, bandera_tarjeta_presente,*
FROM d_lotes
WHERE fh_proceso BETWEEN '2023-06-01' AND '2023-07-31'
ORDER BY numero_afiliacion, fh_proceso DESC;


###### SERÁ NECESARIO APOYARSE DEL MISMO FORMATO QUE INCLUYE ESTE PROYECTO EN LA RUTA: RAIZ -resources/insumoEbindLATAM.xlsx ###





#####
