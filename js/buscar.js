//Evento para el scroll
window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    header.classList.toggle("abajo", window.scrollY > 0);
})





//Animación para la frase de frozono
window.onload = function () {
    let elemento1 = document.querySelector('h2.animacion1');
    elemento1.classList.add('translate');

    setTimeout(function () {
        let elemento2 = document.querySelector('h2.animacion2');
        elemento2.classList.add('translate');
    }, 750);

    setTimeout(function () {
        let elemento3 = document.querySelector('h2.animacion3');
        elemento3.classList.add('translate');
    }, 1500);

    setTimeout(function () {
        let elemento4 = document.querySelector('h2.animacion4');
        elemento4.classList.add('translate');
    }, 2250);
};





//Código para el filtro del buscador:
//Obtener elementos del DOM
const categoriaSelect = document.getElementById('categoria');
const ordenarSelect = document.getElementById('ordenar');
const precioSelect = document.getElementById('precio');
const buscarInput = document.getElementById('buscar');

//Asignar eventos a los elementos del DOM
categoriaSelect.addEventListener('change', filtrarverduras);
ordenarSelect.addEventListener('change', filtrarverduras);
precioSelect.addEventListener('change', filtrarverduras);
buscarInput.addEventListener('input', filtrarverduras);

//Función para filtrar Verduras
function filtrarverduras() {
    const categoria = categoriaSelect.value;
    const orden = ordenarSelect.value;
    const precio = precioSelect.value;
    const buscar = buscarInput.value.toLowerCase();
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            //Filtrar Verduras
            const resultados = data.verduras.filter((verdura) => {
                //Filtrar por categoría
                if (categoria !== "Todo" && verdura.categoria !== categoria) {
                    return false;
                }

                //Filtrar por precio
                let listaOriginal = verduras.slice(0); // Crear una copia de la lista original

                if (precio === "Todos") {
                    listaFiltrada = listaOriginal;
                } else if (precio === "Menor a mayor") {
                    listaFiltrada = verduras.sort((a, b) => a.precio - b.precio);
                } else if (precio === "Mayor a menor") {
                    listaFiltrada = verduras.sort((a, b) => b.precio - a.precio);
                }

                //Filtrar por búsqueda
                if (buscar !== "" && !verdura.nombre.toLowerCase().includes(buscar)) {
                    return false;
                }

                return true;
            });

            //Ordenar resultados
            if (orden === "A - Z") {
                resultados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            } else if (orden === "Z - A") {
                resultados.sort((a, b) => b.nombre.localeCompare(a.nombre));
            }

            //Mostrar resultados en el HTML
            mostrarResultados(resultados);
        });
}

//Función para mostrar los resultados en el HTML
const tienda = document.getElementById("seccion-productos");

function mostrarResultados(resultados) {
    tienda.innerHTML = '';

    if (resultados.length === 0) {
        tienda.innerHTML = `
        <p class="resultadosNoEncontrados">No se encontraron resultados</p>
        `;
        return;
    }

    //Asegurarse de que resultados sea un array, sino esto me va a traer problemas en el .forEach
    if (!Array.isArray(resultados)) {
        resultados = [resultados]; //Convertir a un array
    }

    resultados.forEach(verdura => {
        const cardProducto = document.createElement("div");
        cardProducto.className = "card";
        cardProducto.innerHTML = `
        <div class="cardImagen">
            <div class="capa">
                <h2>${verdura.nombre}</h2>
            </div>
            <img src="${verdura.imagen}" alt="">
        </div>

        <div class="cardFooter">
            <button class="verDetalles">
                <img class="cardFooterImagen" src="https://i.ibb.co/HqFNb69/detalles.png" alt="">
            </button>
            <div class="precio">$ ${verdura.precio}</div>
            <button id="${verdura.id}" class="botonComprar">
                <img class="cardFooterImagen" src="https://i.ibb.co/ypzNP3p/carritosuper2.png" alt="">
            </button>
        </div>`;

        //Agregar la cardProducto al contenedor de la tienda
        tienda.append(cardProducto);

        //Función para el botón comprar.
        let botonComprar = cardProducto.querySelector(".botonComprar");

        botonComprar.addEventListener("click", () => {
            agregarAlCarrito(verdura);
            //Pongo el mensaje del tostify
            Toastify({
                text: "Agregado al carrito",
                duration: 2000,
                close: false,
                gravity: "bottom",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: '#ffd60a',
                    color: '#000000',
                    fontFamily: 'Carter One, cursive',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontSize: '1.1rem',
                    paddingTop: '0.5em',
                    paddingBottom: '0.5em',
                    paddingLeft: '1.5em',
                    paddingRight: '1.5em',
                    borderTopRightRadius: '1em',
                    borderBottomLeftRadius: '1em'
                },
                onClick: function () { }
            }).showToast();
        });
    });
}





//Fetch con promesas: async y await
const url = '../js/data.json';
let verduras = [];

async function obtenerDatosJson() {
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data);
        mostrarResultados(data.verduras);
    } catch (error) {
        console.error("Error al obtener datos JSON:", error);
    }
}

obtenerDatosJson();


//Mostrar las verduras filtradas
filtrarverduras();