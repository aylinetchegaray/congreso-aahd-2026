const contenedorPrograma = document.getElementById('contenedor-programa');
const inputBuscador= document.getElementById('buscador');
const botonesPestañas= document.querySelectorAll('.boton-pestaña');

let todosLosEventos=[];
let diaActual= '11 de noviembre';

function renderizarTarjetas(eventosAMostrar){
    contenedorPrograma.innerHTML= '';

    if(eventosAMostrar.lenght===0){
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
            tarjeta.innerHTML = `
                <div class="etiqueta">${evento.tipo} - ${evento.espacio}</div>
                <h3>${evento.titulo}</h3>
                <p><strong>Expositor(es):</strong> ${evento.expositores}</p>
                <p><em>${evento.dia} | ${evento.horario}</em></p>
                <hr>
            `;
            }
            contenedorPrograma.appendChild(tarjeta);
    });
}

function aplicarFiltros() {
    const textoBusqueda = inputBuscador.value.toLowerCase();
    
    const eventosFiltrados = todosLosEventos.filter(evento => {
        const coincideDia = diaActual === 'todos' || evento.dia === diaActual;
        
        const coincideTexto = evento.titulo.toLowerCase().includes(textoBusqueda) || (evento.expositores && evento.expositores.toLowerCase().includes(textoBusqueda));
        
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