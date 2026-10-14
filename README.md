# JARVIS — Control horario desde exportaciones de WhatsApp (iPhone)

Esta versión tiene interfaz futurista móvil, un panel de jornada, importación de chats exportados en texto, detección de eventos de entrada/pausa/vuelta/salida, cálculos, historial editable, exportación CSV y chat con IA opcional.

## Importante: cómo se conecta con WhatsApp
La aplicación NO puede leer automáticamente un grupo personal de WhatsApp desde una página web. Las integraciones oficiales de WhatsApp Business no dan acceso general al historial de un grupo personal como el que describes. Por eso esta versión usa la función oficial **Exportar chat** de WhatsApp para importar el `.txt`. Si más adelante se implementa una integración directa, tendrá que ajustarse a las capacidades oficiales disponibles y a las políticas de WhatsApp.

## Requisitos
- Node.js 18 o posterior para ejecutar el servidor.
- Opcional: clave API de OpenAI para preguntas generales con IA. El registro y los cálculos básicos funcionan sin ella. El uso de API puede tener coste aparte de ChatGPT.

## Ejecutar en ordenador
1. Instala Node.js: https://nodejs.org/
2. Descomprime el ZIP y abre la terminal en esta carpeta.
3. Ejecuta `npm install`.
4. Define `OPENAI_API_KEY` como variable de entorno si quieres activar la IA:
   - macOS/Linux: `export OPENAI_API_KEY="tu_clave"`
   - Windows PowerShell: `$env:OPENAI_API_KEY="tu_clave"`
   - Para alojamiento, configura la variable en el panel del proveedor. No la pongas en archivos públicos.
5. Ejecuta `npm start`.
6. Abre `http://localhost:3000`.

## En tu iPhone
Para probar en la misma Wi-Fi, abre desde el iPhone `http://IP-LOCAL-DE-TU-ORDENADOR:3000` mientras el servidor esté ejecutándose. Para usarlo fuera de casa, despliega el proyecto en un hosting Node.js con HTTPS y configura las variables de entorno.

Con la web publicada con HTTPS:
1. Abre la dirección en Safari.
2. Toca Compartir.
3. Elige **Añadir a pantalla de inicio**.
4. Abre Jarvis desde su icono.

## Exportar el grupo
En WhatsApp abre el grupo → toca el nombre del grupo → Exportar chat → Sin archivos. Guarda el archivo de texto en Archivos y selecciónalo en la pestaña WhatsApp de Jarvis. La aplicación analiza el texto localmente en el navegador; no envía el archivo entero al modelo de IA.

## Frases reconocidas
Entre otras: “entro”, “he entrado”, “empiezo a trabajar”, “paro a comer”, “me voy a comer”, “vuelvo de comer”, “vuelvo al trabajo”, “salgo”, “he salido” y “termino de trabajar”.

Revisa los eventos detectados después de cada importación. Las frases ambiguas, mensajes editados o formatos de exportación distintos pueden requerir corrección manual. Los eventos importados se guardan en el almacenamiento local del navegador de ese dispositivo; haz exportaciones CSV periódicas para tener copia de seguridad.

## Límites y seguridad
- Esta versión no monitoriza WhatsApp en tiempo real. Hay que volver a exportar e importar el chat para añadir mensajes recientes.
- Los datos quedan en el almacenamiento local del navegador; borrar datos del sitio puede eliminarlos.
- No introduzcas información sensible innecesaria.
- Antes de exponer el servicio en Internet, añade autenticación, límites de uso y protección contra abuso.
- Comprueba las horas calculadas antes de utilizarlas para nóminas o registros oficiales.
