# Programa Interactivo - Congreso AAHD 2026

Micrositio web interactivo para la consulta del cronograma, sedes, ponencias y actividades del **Congreso Internacional de Humanidades Digitales (AAHD 2026)**, a realizarse en la **Universidad Nacional de Río Negro (UNRN - Sede Atlántica)**.


## Características

- **Consulta dinámica:** Filtrado en tiempo real por día, franja horaria y tipología de actividad (talleres, paneles, conferencias).
- **Buscador integrado:** Localización instantánea de expositores, moderadores y títulos de ponencias.
- **Detalle en modal:** Acceso a resúmenes y datos institucionales sin recargar la página.
- **Optimizado para móviles:** Diseño responsive ligero (Vanilla JS) sin dependencias externas pesadas.
- **Impresión dinámica:** Genera la vista para imprimir o guardar como PDF con los datos actuales del día seleccionado o del programa completo, sin usar archivos PDF estáticos.


## Stack Tecnológico

- **Frontend:** HTML5, CSS3 modular (diseño institucional UNRN/CACIC), Vanilla JavaScript (ES6+).
- **Datos del programa:** Actividades y horarios editables en `data/programa.js`, servidos sin backend.
- **Despliegue:** GitHub Pages / Vercel CDN con integración continua (CI/CD).


## Estructura del Repositorio

```text
├── index.html        # Estructura principal de la SPA
├── style.css         # Estilos visuales y reglas institucionales
├── app.js            # Lógica de renderizado, búsqueda y filtros
├── data/programa.js  # Base de datos editable con los eventos y horarios
└── fotos/            # Recursos gráficos y logotipos
```


## Mantenimiento
Para modificar horarios, aulas o expositores no es necesario tocar la lógica de la aplicación. Toda la información se gestiona desde data/programa.js:
- Abrir el archivo data/programa.js.
- Localizar el bloque del evento a editar:

```text
{
  "dia": "13 de noviembre",
  "horario": "8:00 a 10:00",
  "tipo": "Taller 12",
  "espacio": "Campus UNRN-Espacio 1",
  "titulo": "Salud y Humanidades Digitales...",
  "expositores": "Goldschmidt, Julieta Yasmín",
  "resumen": "Descripción o resumen de la actividad..."
}
```
Realizar las modificaciones necesarias y guardar los cambios.

Al hacer commit y push a la rama main, la plataforma desplegará la actualización de forma automática en pocos segundos.


## Equipo de Desarrollo
Desarrollado para el Comité Organizador de AAHD 2026.
