const contenedorPrograma = document.getElementById('contenedor-programa');
const inputBuscador = document.getElementById('buscador');
const botonesPestañas = document.querySelectorAll('.boton-pestaña');
const selectTipo = document.getElementById('filtro-tipo');
const selectHorario = document.getElementById('filtro-horario');

// Data incrustada para evitar errores CORS
let todosLosEventos = [
  {
    "dia": "11 de noviembre",
    "horario": "9:00 a 11:00",
    "espacio": "Espacio 1",
    "tipo": "Taller 1",
    "titulo": "Metodologías de trabajo en corpus",
    "expositores": "Pierabella, Silvana (UNR)",
    "resumen": "En este taller abordaremos técnicas para la limpieza y estructuración de corpus textuales destinados al análisis semántico.",
    "requisitos": "Computadora portátil obligatoria. Conocimientos básicos de expresiones regulares (opcional)."
  },
  {
    "dia": "11 de noviembre",
    "horario": "11:00 a 13:00",
    "espacio": "Espacio 1",
    "tipo": "Taller 4",
    "titulo": "Reconocimiento y transcripción automática de textos impresos antiguos con Transkribus",
    "expositores": "De León, Romina (HD LAB, CONICET)"
  },
  {
    "dia": "11 de noviembre",
    "horario": "9:00 a 11:00",
    "espacio": "Espacio 2",
    "tipo": "Taller 2",
    "titulo": "Trabajo editorial en revistas científicas 1: El artículo como dispositivo de conocimiento en Humanidades; edición digital, curación de metadatos y marcadores persistentes",
    "expositores": "Corbellini, Natalia (UNLP)"
  },
  {
    "dia": "11 de noviembre",
    "horario": "11:00 a 13:00",
    "espacio": "Espacio 2",
    "tipo": "Taller 5",
    "titulo": "Construcción de tableros interactivos en Tableau a partir de fuentes históricas",
    "expositores": "Lissandrello, Guido (CONICET-UBA)"
  },
  {
    "dia": "11 de noviembre",
    "horario": "9:00 a 11:00",
    "espacio": "Espacio 3",
    "tipo": "Taller 3",
    "titulo": "Introducción a la codificación y publicación digital en XML-TEI de textos dramáticos",
    "expositores": "del Rio Riande, Gimena \n Volkind, Laura (HD LAB, CONICET)"
  },
  {
    "dia": "11 de noviembre",
    "horario": "11:00 a 13:00",
    "espacio": "Espacio 3",
    "tipo": "Taller 6",
    "titulo": "Análisis Automático de Textos, Procesamiento del Lenguaje Natural y Minería de Textos: métodos no supervisados para la exploración de corpus",
    "expositores": "Nusch, Carlos (UNLP)"
  },
  {
    "dia": "11 de noviembre",
    "horario": "14:00 a 16:00",
    "espacio": "Espacio 1",
    "tipo": "Taller 7",
    "titulo": "Uso de herramientas computacionales para el análisis histórico: ARS y construcción de corpus digitales",
    "expositores": "Riganti, Maria Valentina (CIEGeF, CONICET-UNS)"
  },
  {
    "dia": "11 de noviembre",
    "horario": "16:30 a 18:30",
    "espacio": "Museo Emma Nozzi",
    "tipo": "Panel. Modera: Lucia Cantamutto",
    "titulo": "Puentes hacia la justicia hídrica: memoria ambiental y tecnologías participativas",
    "expositores": "Liberman, Mariana \n Birochio, Diego \n Musi Saluj, Cristian \n Zangra, Alejandro \n Viladrich, Leonel"
  },
  {
    "dia": "11 de noviembre",
    "horario": "16:30 a 18:30",
    "espacio": "Espacio 2",
    "tipo": "Taller 10",
    "titulo": "Salud y Humanidades Digitales en tiempos de inteligencia artificial: paradigmas, tensiones y alcances",
    "expositores": "Goldschmidt, Julieta Yasmín (UBA - UTN)"
  },
  {
    "dia": "11 de noviembre",
    "horario": "16:30 a 18:30",
    "espacio": "Espacio 3",
    "tipo": "Taller 11",
    "titulo": "Mapas narrativos interactivos con tecnologías abiertas: una introducción práctica a los Storymaps",
    "expositores": "Calarco, Gabriel (UTDT)"
  },
  {
    "dia": "11 de noviembre",
    "horario": "13:00",
    "espacio": "Comedor Universitario",
    "tipo": "Pausa",
    "titulo": "PAUSA ALMUERZO",
    "expositores": ""
  }
];

let diaActual = '11 de noviembre';

// Función segura para inyectar datos en el Modal
function abrirModal(evento) {
    const modal = document.getElementById('modal-info');
    
    document.getElementById('modal-titulo').textContent = evento.titulo;
    document.getElementById('modal-tipo-espacio').textContent = `${evento.tipo} - ${evento.espacio}`;
    document.getElementById('modal-expositores').textContent = evento.expositores || "N/A";
    
    document.getElementById('modal-resumen').textContent = evento.resumen || "No hay resumen disponible para esta actividad.";
    document.getElementById('modal-requisitos').textContent = evento.requisitos || "No se requieren conocimientos ni materiales previos.";
    
    modal.showModal();
}

function renderizarTarjetas(eventosAMostrar){
    contenedorPrograma.innerHTML = '';

<<<<<<< HEAD
    if(eventosAMostrar.length === 0){
        contenedorPrograma.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; font-weight: bold;">No se encontraron resultados con estos filtros.</p>';
=======
    if(eventosAMostrar.length===0){
        contenedorPrograma.innerHTML='<p>No se encontraron resultados.</p>';
>>>>>>> 3b5dc9b6d778f2c4d1bcf3a063f55df4572f5c32
        return;
    }

    eventosAMostrar.forEach(evento => {
        // SEGURIDAD: Creación de elementos HTML de forma segura
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-evento'); 

<<<<<<< HEAD
        const esPausa = evento.tipo.toLowerCase().includes('pausa') || evento.tipo.toLowerCase().includes('acreditación');

        if(esPausa){
            tarjeta.classList.add('pausa');
            
            const textoHorario = document.createElement('p');
            const em = document.createElement('em');
            em.textContent = `${evento.horario} | ${evento.espacio}`;
            textoHorario.appendChild(em);

            const titulo = document.createElement('h3');
            titulo.textContent = `☕ ${evento.titulo}`;

            tarjeta.appendChild(textoHorario);
            tarjeta.appendChild(titulo);
        } else {
            const etiqueta = document.createElement('div');
            etiqueta.className = 'etiqueta';
            etiqueta.textContent = `${evento.tipo} - ${evento.espacio}`;

            const titulo = document.createElement('h3');
            titulo.textContent = evento.titulo;

            const expositores = document.createElement('p');
            expositores.innerHTML = `<strong>Expositor(es):</strong> `;
            expositores.appendChild(document.createTextNode(evento.expositores));

            const horario = document.createElement('p');
            const emHorario = document.createElement('em');
            emHorario.textContent = `${evento.dia} | ${evento.horario}`;
            horario.appendChild(emHorario);

            const boton = document.createElement('button');
            boton.className = 'btn-mas-info no-imprimir';
            boton.textContent = 'Ver más info';
            boton.onclick = () => abrirModal(evento);

            tarjeta.appendChild(etiqueta);
            tarjeta.appendChild(titulo);
            tarjeta.appendChild(expositores);
            tarjeta.appendChild(horario);
            tarjeta.appendChild(boton);
        }
        
        contenedorPrograma.appendChild(tarjeta);
=======
            if(evento.tipo.toLowerCase()==='pausa'){
                tarjeta.classList.add('pausa');
                tarjeta.innerHTML=`
                    <p><em>${evento.horario} | ${evento.espacio}</em></p> 
                    <h3>☕ ${evento.titulo}</h3>
                `;
            }else{
            let ponenciasHTML='';
            if(evento.ponencias && evento.ponencias.length > 0){
                ponenciasHTML=`
                    <details class="acordeon-ponencias">
                        <summary>Ver ${evento.ponencias.length} ponencias</summary>
                        <div class="lista-ponencias">
                            ${evento.ponencias.map(p => `
                                <div class="sub-ponencia">
                                    <h4>🔹 ${p.titulo}</h4>
                                    <p class="autor">${p.expositores}</p>
                                </div>
                            `).join('')}
                        </div>
                    </details>
                `;
            }
                tarjeta.innerHTML = `
                <div class="etiqueta">${evento.tipo} - ${evento.espacio}</div>
                <h3>${evento.titulo}</h3>
                ${evento.moderador ? `<p style="color: #00e5ff; margin-bottom: 8px;"><em>${evento.moderador}</em></p>` : ''}
                ${evento.expositores ? `<p><strong>Expositor(es):</strong> ${evento.expositores}</p>` : ''}
                <p><em>${evento.dia} | ${evento.horario}</em></p>
                ${ponenciasHTML}
            `;
            }
            contenedorPrograma.appendChild(tarjeta);
>>>>>>> 3b5dc9b6d778f2c4d1bcf3a063f55df4572f5c32
    });
}

function quitarAcentos(texto) {
    if (!texto) return "";
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function aplicarFiltros() {
<<<<<<< HEAD
    const textoBusqueda = inputBuscador.value.toLowerCase();
    const tipoSeleccionado = selectTipo.value;
    const horarioSeleccionado = selectHorario.value;
=======
    const textoBusqueda = quitarAcentos(inputBuscador.value.toLowerCase());
>>>>>>> 3b5dc9b6d778f2c4d1bcf3a063f55df4572f5c32
    
    const eventosFiltrados = todosLosEventos.filter(evento => {
        // Filtro por Día
        const coincideDia = diaActual === 'todos' || evento.dia === diaActual;
        
<<<<<<< HEAD
        // Filtro por Texto
        const coincideTexto = evento.titulo.toLowerCase().includes(textoBusqueda) || 
                              (evento.expositores && evento.expositores.toLowerCase().includes(textoBusqueda));
=======
        const tituloNormalizado = quitarAcentos(evento.titulo.toLowerCase());
        const expositoresNormalizados = quitarAcentos((evento.expositores || "").toLowerCase());

        const coincideTitulo = tituloNormalizado.includes(textoBusqueda);
        const coincideExpositor = expositoresNormalizados.includes(textoBusqueda);

        let coincideSub= false;
        if (evento.ponencias && evento.ponencias.length > 0) {
            coincideSub = evento.ponencias.some(p => {
                const subTitulo = quitarAcentos((p.titulo || "").toLowerCase());
                const subExpositor = quitarAcentos((p.expositores || "").toLowerCase());
                
                return subTitulo.includes(textoBusqueda) || subExpositor.includes(textoBusqueda);
            });
        }
        const coincideTexto = coincideTitulo || coincideExpositor || coincideSub;
>>>>>>> 3b5dc9b6d778f2c4d1bcf3a063f55df4572f5c32
        
        // Filtro por Tipo
        let coincideTipo = true;
        if(tipoSeleccionado !== 'todos') {
            coincideTipo = evento.tipo.toLowerCase().includes(tipoSeleccionado);
        }

        // Filtro por Horario
        let coincideHorario = true;
        if(horarioSeleccionado === 'mañana') {
            coincideHorario = /8:|9:|10:|11:|12:/.test(evento.horario);
        } else if(horarioSeleccionado === 'tarde') {
            coincideHorario = /13:|14:|15:|16:|17:|18:|19:|20:/.test(evento.horario);
        }

        return coincideDia && coincideTexto && coincideTipo && coincideHorario;
    });

    renderizarTarjetas(eventosFiltrados);
}

inputBuscador.addEventListener('input', aplicarFiltros);
selectTipo.addEventListener('change', aplicarFiltros);
selectHorario.addEventListener('change', aplicarFiltros);

botonesPestañas.forEach(boton => {
    boton.addEventListener('click', (e) => {
        botonesPestañas.forEach(b => b.classList.remove('activo'));
        e.target.classList.add('activo');
        diaActual = e.target.getAttribute('data-dia');
        aplicarFiltros();
        
        const btnDescarga = document.getElementById('btn-descargar');
        if(diaActual === 'todos') {
            btnDescarga.textContent = '📄 Descargar Programa Completo (PDF)';
        } else {
            btnDescarga.textContent = `📄 Descargar Programa ${e.target.textContent} (PDF)`;
        }
    });
});

aplicarFiltros();