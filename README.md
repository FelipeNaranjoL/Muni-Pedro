# Proyecto — Landing Municipalidad de El Monte

## Cómo abrirlo
1. Descomprime la carpeta.
2. Abre `index.html` en el navegador. Para pruebas más fieles, usa Live Server desde VS Code.
3. El diseño y la estructura original se conservaron; se realizaron ajustes puntuales.

## Dónde agregar tus cuatro imágenes de Ruta de la Patria
Guarda tus imágenes optimizadas en formato WebP dentro de `assets/img/hitos/`, usando exactamente estos nombres:

| Hito | Archivo que debes reemplazar/agregar |
|---|---|
| Casa de los Carrera / Fundo San Miguel | `casa-carrera.webp` |
| Iglesia San Francisco de Asís | `iglesia-san-francisco.webp` |
| Museo Patrimonial de El Monte | `museo-patrimonial.webp` |
| Humedal Río Mapocho | `humedal-mapocho.webp` |

**No necesitas modificar el HTML al agregar las fotos**: solo copia cada archivo a esa carpeta con el nombre exacto. Si prefieres otros nombres o formatos, modifica la propiedad `img` de cada objeto en `index.html`, dentro de `const hitosData = [...]` (aprox. línea 1340), y también el `src` inicial de `#hito-img` (aprox. línea 592).

Las imágenes del Hero y de Noticias no fueron modificadas. Solo se cambiaron las cuatro imágenes de los hitos. Mientras no agregues la foto del hito seleccionado, el espacio de imagen queda vacío (sin mostrar el texto de imagen pendiente). Al cargar o recargar la página, el Hito 1 queda seleccionado automáticamente.

## Cambios incluidos
- Rutas locales para las cuatro imágenes de hitos; Hero y Noticias intactos.
- Carga diferida (`loading=lazy`) y decodificación asíncrona de la imagen del hito.
- Alturas mínimas en el panel de hitos para reducir saltos al cambiar de parada.
- Mapa incrustado de Google Maps para `Los Libertadores 277, 9810274 El Monte, Región Metropolitana, Chile`.
- Selecciones obligatorias en formularios donde faltaba una elección explícita.

## Importante: formularios
Los formularios todavía muestran una confirmación local en el navegador. El HTML por sí solo **no envía ni almacena** solicitudes. Para recibir OIRS o reservas reales, hay que conectar un backend/API, validar nuevamente en servidor y definir almacenamiento, notificaciones y protección antispam.

## Dependencias externas actuales
El HTML sigue usando Tailwind CDN, Google Fonts y Font Awesome CDN. Para producción conviene compilar Tailwind y servir los recursos localmente, además de configurar CSP, HTTPS y validación del lado servidor.
