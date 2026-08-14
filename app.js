const contenedorPrograma = document.getElementById('contenedor-programa');
const inputBuscador= document.getElementById('buscador');
const botonesPestañas= document.querySelectorAll('.boton-pestaña');

let todosLosEventos=[];
let diaActual= '11 de noviembre';

function renderizarTarjetas(eventosAMostrar){
    contenedorPrograma.innerHTML= '';

    if(eventosAMostrar.length===0){
        contenedorPrograma.innerHTML='<p>No se encontraron resultados.</p>';
        return;
    }

    eventosAMostrar.forEach(evento => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-evento'); 

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
    });
}

function quitarAcentos(texto) {
    if (!texto) return "";
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function aplicarFiltros() {
    const textoBusqueda = quitarAcentos(inputBuscador.value.toLowerCase());
    
    const eventosFiltrados = todosLosEventos.filter(evento => {
        const coincideDia = diaActual === 'todos' || evento.dia === diaActual;
        
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
        
        return coincideDia && coincideTexto;
    });

    renderizarTarjetas(eventosFiltrados);
}

botonesPestañas.forEach(boton => {
    boton.addEventListener('click', (e) => {

        botonesPestañas.forEach(b => b.classList.remove('activo'));
     
        e.target.classList.add('activo');
        
        diaActual = e.target.getAttribute('data-dia');
        aplicarFiltros();
    });
});

inputBuscador.addEventListener('input', aplicarFiltros);

//cargar datos iniciales
async function cargarPrograma() {
    try {
        const respuesta = await fetch('./data/programa.json');
        todosLosEventos= await respuesta.json();
        aplicarFiltros();
    } catch(error){
        console.error("Error cargando el programa:", error);
        contenedorPrograma.innerHTML = "<p>Hubo un error al cargar el cronograma.</p>";
    }
}
cargarPrograma();