# Programa Interactivo - Congreso AAHD 2026

Micrositio web interactivo para la consulta del cronograma, sedes, ponencias y actividades del **Congreso Internacional de Humanidades Digitales (AAHD 2026)**, a realizarse en la **Universidad Nacional de Río Negro (UNRN - Sede Atlántica)**.


## Características

- **Consulta dinámica:** Filtrado en tiempo real por día, franja horaria y tipología de actividad (talleres, paneles, conferencias).
- **Buscador integrado:** Localización instantánea de expositores, moderadores y títulos de ponencias.
- **Detalle en modal:** Acceso a resúmenes y datos institucionales sin recargar la página.
- **Optimizado para móviles:** Diseño responsive ligero (Vanilla JS) sin dependencias externas pesadas.
- **Exportación:** Función de impresión y guardado en PDF de la grilla diaria.


## Stack Tecnológico

- **Frontend:** HTML5, CSS3 modular (diseño institucional UNRN/CACIC), Vanilla JavaScript (ES6+).
- **Persistencia de Datos:** JSON estático (`programa.json`), arquitectura Serverless / Jamstack.
- **Despliegue:** GitHub Pages / Vercel CDN con integración continua (CI/CD).


## Estructura del Repositorio

```text
├── index.html        # Estructura principal de la SPA
├── style.css         # Estilos visuales y reglas institucionales
├── app.js            # Lógica de renderizado, búsqueda y filtros
├── programa.json     # Base de datos editable con los eventos y horarios
└── fotos/            # Recursos gráficos y logotipos
```


## Equipo de Desarrollo
Desarrollado para el Comité Organizador de AAHD 2026.
