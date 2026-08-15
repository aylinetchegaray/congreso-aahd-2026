const contenedorPrograma = document.getElementById('contenedor-programa');
const inputBuscador = document.getElementById('buscador');
const botonesPestañas = document.querySelectorAll('.boton-pestaña');
const selectTipo = document.getElementById('filtro-tipo');
const selectHorario = document.getElementById('filtro-horario');

let diaActual = '11 de noviembre';

// ==========================================================
// MODAL DE INFORMACIÓN
// ==========================================================
function abrirModal(evento) {
    const modal = document.getElementById('modal-info');
    
    document.getElementById('modal-titulo').textContent = evento.titulo;
    document.getElementById('modal-tipo-espacio').textContent = `${evento.tipo} - ${evento.espacio}`;
    document.getElementById('modal-expositores').textContent = evento.expositores || "N/A";
    
    document.getElementById('modal-resumen').textContent = evento.resumen || "No hay resumen disponible para esta actividad.";
    document.getElementById('modal-requisitos').textContent = evento.requisitos || "No se requieren conocimientos ni materiales previos.";
    
    modal.showModal();
}

// ==========================================================
// RENDERIZAR TARJETAS (AGRUPADAS POR HORARIO)
// ==========================================================
function renderizarTarjetas(eventosAMostrar) {
    contenedorPrograma.innerHTML = '';

    if(eventosAMostrar.length === 0){
        contenedorPrograma.innerHTML = '<p style="text-align: center; font-weight: bold; color: var(--unrn-gris-medio); margin-top: 30px;">No se encontraron resultados con estos filtros.</p>';
        return;
    }

    // 1. Agrupar los eventos cronológicamente por su horario
    const gruposPorHorario = [];
    eventosAMostrar.forEach(evento => {
        let grupo = gruposPorHorario.find(g => g.horario === evento.horario);
        if (!grupo) {
            grupo = { horario: evento.horario, eventos: [] };
            gruposPorHorario.push(grupo);
        }
        grupo.eventos.push(evento);
    });

    // 2. Dibujar un bloque (Outline) por cada horario
    gruposPorHorario.forEach(grupo => {
        // Contenedor principal de la franja horaria
        const bloqueHorario = document.createElement('div');
        bloqueHorario.style.marginBottom = '40px'; 
        bloqueHorario.style.width = '100%';

        // Banner del Horario (Ocupa todo el ancho)
        const bannerHora = document.createElement('div');
        bannerHora.style.backgroundColor = 'var(--unrn-rojo, #a82020)';
        bannerHora.style.color = 'white';
        bannerHora.style.padding = '10px 20px';
        bannerHora.style.borderRadius = '5px';
        bannerHora.style.fontWeight = 'bold';
        bannerHora.style.fontSize = '18px';
        bannerHora.style.marginBottom = '20px';
        bannerHora.style.textAlign = 'center';
        bannerHora.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        bannerHora.textContent = `HORARIO: ${grupo.horario.toUpperCase()}`;
        bloqueHorario.appendChild(bannerHora);

        // Contenedor Flex "Inline" Adaptativo para las actividades de ese horario
        const contenedorActividades = document.createElement('div');
        contenedorActividades.style.display = 'flex';
        contenedorActividades.style.flexWrap = 'wrap'; // Clave para que baje en celular
        contenedorActividades.style.gap = '20px';
        
        // 3. Dibujar las actividades dentro de ese horario
        grupo.eventos.forEach(evento => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-evento'); 
            tarjeta.style.flex = '1 1 300px'; 

            const esPausa = (evento.tipo || '').toLowerCase().includes('pausa') || 
                            (evento.tipo || '').toLowerCase().includes('acreditación') ||
                            (evento.tipo || '').toLowerCase().includes('evento social') ||
                            (evento.tipo || '').toLowerCase().includes('actividad');

            if (esPausa) {
                tarjeta.classList.add('pausa');
                tarjeta.style.backgroundColor = '#f9f9f9';
                tarjeta.style.borderLeft = '5px solid var(--unrn-rojo, #a82020)';
                
                // Detectar si es un Café para inyectar la foto
                let imagenCafe = '';
                if ((evento.titulo || '').toLowerCase().includes('café') || (evento.titulo || '').toLowerCase().includes('cafe')) {
                    imagenCafe = `<img src="fotos/cafe.avif" alt="Pausa Café" style="width: 100%; height: 150px; object-fit: cover; border-radius: 5px; margin-bottom: 15px;">`;
                }

                tarjeta.innerHTML = `
                    ${imagenCafe}
                    <p style="color: #666;"><em>📍 ${evento.espacio}</em></p> 
                    <h3 style="margin-top: 5px;">☕ ${evento.titulo}</h3>
                    ${evento.expositores ? `<p>${evento.expositores}</p>` : ''}
                `;
            } else {
                let ponenciasHTML = '';
                
                // Lógica para las mesas de ponencias con acordeón
                if (evento.ponencias && evento.ponencias.length > 0) {
                    ponenciasHTML = `
                        <details class="acordeon-ponencias no-imprimir" style="margin-top: 15px; border: 1px solid #ddd; padding: 10px; border-radius: 5px; background: #fafafa;">
                            <summary style="cursor: pointer; font-weight: bold; color: var(--unrn-rojo, #a82020);">Ver ${evento.ponencias.length} ponencias</summary>
                            <div class="lista-ponencias" style="margin-top: 15px; padding-left: 10px; border-left: 3px solid var(--unrn-rojo, #a82020);">
                                ${evento.ponencias.map(p => `
                                    <div class="sub-ponencia" style="margin-bottom: 15px;">
                                        <h4 style="margin: 0; font-size: 14px; color: #333;">🔹 ${p.titulo}</h4>
                                        <p class="autor" style="margin: 3px 0 0 0; font-size: 13px; color: #666;">${p.expositores}</p>
                                    </div>
                                `).join('')}
                            </div>
                        </details>
                    `;
                }

                tarjeta.innerHTML = `
                    <div class="etiqueta" style="margin-bottom: 10px; display: inline-block;">${evento.tipo} - ${evento.espacio}</div>
                    <h3 style="margin-top: 0;">${evento.titulo}</h3>
                    ${evento.moderador ? `<p style="color: #666; margin-bottom: 8px;"><em>Moderador/a: ${evento.moderador}</em></p>` : ''}
                    ${evento.expositores ? `<p><strong>Expositor(es):</strong> ${evento.expositores}</p>` : ''}
                    ${ponenciasHTML}
                `;

                const boton = document.createElement('button');
                boton.className = 'btn-mas-info no-imprimir';
                boton.textContent = 'Ver más info';
                boton.style.marginTop = '15px';
                boton.style.width = '100%';
                boton.onclick = () => abrirModal(evento);
                
                tarjeta.appendChild(boton);
            }
            
            contenedorActividades.appendChild(tarjeta);
        });

        bloqueHorario.appendChild(contenedorActividades);
        contenedorPrograma.appendChild(bloqueHorario);
    });
}

// ==========================================================
// FUNCIÓN AUXILIAR (Búsqueda robusta)
// ==========================================================
function quitarAcentos(texto) {
    if (!texto) return "";
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ==========================================================
// APLICAR FILTROS
// ==========================================================
function aplicarFiltros() {
    const textoBusqueda = quitarAcentos(inputBuscador.value.toLowerCase().trim());
    const tipoSeleccionado = selectTipo.value;
    const horarioSeleccionado = selectHorario.value;
    
    // Verificación de seguridad por si tarda en cargar el archivo de datos
    if (typeof todosLosEventos === 'undefined') return;

    const eventosFiltrados = todosLosEventos.filter(evento => {
        
        // 1. Filtro por Día
        const coincideDia = diaActual === 'todos' || evento.dia === diaActual;
        
        // 2. Filtro Inteligente por Texto
        const tituloNormalizado = quitarAcentos((evento.titulo || "").toLowerCase());
        const expositoresNormalizados = quitarAcentos((evento.expositores || "").toLowerCase());

        const coincideTitulo = tituloNormalizado.includes(textoBusqueda);
        const coincideExpositor = expositoresNormalizados.includes(textoBusqueda);

        let coincideSub = false;
        if (evento.ponencias && evento.ponencias.length > 0) {
            coincideSub = evento.ponencias.some(p => {
                const subTitulo = quitarAcentos((p.titulo || "").toLowerCase());
                const subExpositor = quitarAcentos((p.expositores || "").toLowerCase());
                return subTitulo.includes(textoBusqueda) || subExpositor.includes(textoBusqueda);
            });
        }
        const coincideTexto = coincideTitulo || coincideExpositor || coincideSub;
        
        // 3. Filtro por Tipo
        let coincideTipo = true;
        if(tipoSeleccionado !== 'todos') {
            coincideTipo = (evento.tipo || '').toLowerCase().includes(tipoSeleccionado);
        }

        // 4. Filtro por Horario
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

// ==========================================================
// EVENT LISTENERS
// ==========================================================
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

// ==========================================================
// INICIALIZAR
// ==========================================================
aplicarFiltros();