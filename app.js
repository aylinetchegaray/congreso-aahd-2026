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
    
    // 👇 ESTA ES LA LÍNEA NUEVA QUE CONGELA EL FONDO 👇
    document.body.classList.add('bloquear-scroll');
    
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

        // Contenedor de la línea divisoria
        const bannerContainer = document.createElement('div');
        bannerContainer.style.width = '100%';
        bannerContainer.style.borderTop = '1px solid #d1d5db';
        bannerContainer.style.marginBottom = '25px';
        bannerContainer.style.marginTop = '15px';
        
        // Bloque compacto de la hora
        const bannerHora = document.createElement('div');
        bannerHora.style.display = 'inline-block';
        bannerHora.style.backgroundColor = 'var(--unrn-rojo)';
        bannerHora.style.color = 'white';
        bannerHora.style.padding = '6px 14px';
        bannerHora.style.fontWeight = 'bold';
        bannerHora.style.fontSize = '12px';
        bannerHora.style.textTransform = 'uppercase';
        bannerHora.style.letterSpacing = '1px';
        
        // Ajuste de posición para cortar la línea
        bannerHora.style.position = 'relative';
        bannerHora.style.top = '-13px';
        bannerHora.style.left = '0';
        
        bannerHora.textContent = `HORARIO: ${grupo.horario}`;
        
        bannerContainer.appendChild(bannerHora);
        bloqueHorario.appendChild(bannerContainer);

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
                tarjeta.style.backgroundColor = 'var(--unrn-claro)';
                tarjeta.style.border = '1px solid #ddd';
                tarjeta.style.borderLeft = '5px solid var(--unrn-rojo)';
                
                // Normalizamos textos para buscar palabras clave más fácil
                const tituloNormalizado = (evento.titulo || '').toLowerCase();
                const tipoNormalizado = (evento.tipo || '').toLowerCase();

                // Detectar qué imagen e icono inyectar
                let imagenDinamica = '';
                let iconoTexto = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" style="vertical-align: middle; margin-right: 5px;"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>';

                // 1. Caso: Pausa Café
                if (tituloNormalizado.includes('café') || tituloNormalizado.includes('cafe')) {
                    imagenDinamica = `<img src="fotos/cafe.avif" alt="Pausa Café" style="width: 100%; height: 150px; object-fit: cover; border-radius: 0; margin-bottom: 15px;">`;
                    iconoTexto = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" style="vertical-align: middle; margin-right: 5px;"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>';
                } 
                // 2. Caso: Acreditaciones
                else if (tipoNormalizado.includes('acreditación') || tituloNormalizado.includes('acreditacion')) {
                    imagenDinamica = `<img src="fotos/acreditacion2.jpg" alt="Acreditación" style="width: 100%; height: 150px; object-fit: cover; border-radius: 0; margin-bottom: 15px;">`;
                    iconoTexto = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" style="vertical-align: middle; margin-right: 5px;"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="0" ry="0"></rect></svg>';
                } 
                // 3. Caso: Eventos Sociales / Fin de Jornada (City Tour, Cena, etc.)
                else if (tipoNormalizado.includes('evento social') || tituloNormalizado.includes('cena') || tituloNormalizado.includes('tour') || tituloNormalizado.includes('brindis')) {
                    imagenDinamica = `<img src="fotos/social.jpg" alt="Evento Social" style="width: 100%; height: 150px; object-fit: cover; border-radius: 0; margin-bottom: 15px;">`;
                    iconoTexto = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" style="vertical-align: middle; margin-right: 5px;"><path d="M8 22l4-10 4 10"></path><path d="M12 12v-2"></path><path d="M12 10a4 4 0 0 0 4-4V2H8v4a4 4 0 0 0 4 4z"></path></svg>';
                }
                
                const svgPin = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" style="vertical-align: middle; margin-right: 3px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';

                // Inyectamos todo en la tarjeta
                tarjeta.innerHTML = `
                    ${imagenDinamica}
                    <p style="color: #666; text-transform: uppercase; letter-spacing: 1.5px; font-size: 12px; margin-bottom: 8px;"><em>${svgPin} ${evento.espacio}</em></p> 
                    <h3 style="margin-top: 5px; display: flex; align-items: center; justify-content: center;">${iconoTexto} <span style="margin-left: 5px;">${evento.titulo}</span></h3>
                    ${evento.expositores ? `<p>${evento.expositores}</p>` : ''}
                `;
            } else {
                let ponenciasHTML = '';
                
                // Lógica para las mesas de ponencias con acordeón
                if (evento.ponencias && evento.ponencias.length > 0) {
                    ponenciasHTML = `
                        <details class="acordeon-ponencias no-imprimir" style="margin-top: 15px; border: 1px solid #ddd; padding: 10px; border-radius: 0; background: #fafafa;">
                            <summary style="cursor: pointer; font-weight: bold; color: var(--unrn-rojo); text-transform: uppercase; letter-spacing: 1.5px;">VER ${evento.ponencias.length} PONENCIAS</summary>
                            <div class="lista-ponencias" style="margin-top: 15px; padding-left: 10px; border-left: 3px solid var(--unrn-rojo);">
                                ${evento.ponencias.map(p => `
                                    <div class="sub-ponencia" style="margin-bottom: 15px;">
                                        <h4 style="margin: 0; font-size: 14px; color: #333; text-transform: uppercase;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" style="vertical-align: middle; margin-right: 5px;"><polyline points="9 18 15 12 9 6"></polyline></svg> ${p.titulo}</h4>
                                        <p class="autor" style="margin: 3px 0 0 17px; font-size: 13px; color: #666;">${p.expositores}</p>
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
                boton.textContent = 'VER MÁS INFO →';
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
// DESCONGELAR SCROLL AL CERRAR EL MODAL
// ==========================================================
document.getElementById('modal-info').addEventListener('close', () => {
    document.body.classList.remove('bloquear-scroll');
});

// ==========================================================
// INICIALIZAR
// ==========================================================
aplicarFiltros();