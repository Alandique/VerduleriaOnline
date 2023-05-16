//Evento para el scroll
window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    header.classList.toggle("abajo", window.scrollY > 0);
});

//Animación para la frase Verduras frutas y algo mas
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
// ...

async function filtrarverduras() {
  const categoria = categoriaSelect.value;
  const orden = ordenarSelect.value;
  const precio = precioSelect.value;
  const buscar = buscarInput.value.toLowerCase();
  
  try {
    const resp = await fetch(url);
    const data = await resp.json();

    let listaOriginal = data.verduras.slice(0); // Crear una copia de la lista original

    let listaFiltrada = listaOriginal; // Asignar el valor por defecto a listaFiltrada

    if (precio === "Menor a mayor") {
      listaFiltrada = listaOriginal.sort((a, b) => a.precio - b.precio);
    } else if (precio === "Mayor a menor") {
      listaFiltrada = listaOriginal.sort((a, b) => b.precio - a.precio);
    }

    // Filtrar por categoría
    const resultados = listaFiltrada.filter((verdura) => {
      if (categoria !== "Todo" && verdura.categoria !== categoria) {
        return false;
      }

      // Filtrar por búsqueda
      if (buscar !== "" && !verdura.nombre.toLowerCase().includes(buscar)) {
        return false;
      }

      return true;
    });

    // Ordenar resultados
    if (orden === "A - Z") {
      resultados.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (orden === "Z - A") {
      resultados.sort((a, b) => b.nombre.localeCompare(a.nombre));
    }

    mostrarResultados(resultados);
  } catch (error) {
    console.error("Error al obtener los datos JSON:", error);
  }
}

  

//Función para mostrar los resultados en el HTML
const tienda = document.getElementById
("seccion-productos");

function mostrarResultados(resultados) {
tienda.innerHTML = '';
if (resultados.length === 0) {
    tienda.innerHTML = `
    <p class="resultadosNoEncontrados">No se encontraron resultados</p>
    `;
    return;
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

    tienda.append(cardProducto);

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

const url = '../js/data.json';
let verduras = [];

async function obtenerDatosJson() {
try {
const resp = await fetch(url);
const data = await resp.json();
verduras = data.verduras;
console.log(data);
mostrarResultados(verduras);
} catch (error) {
console.error("Error al obtener los datos JSON:", error);
} finally {
filtrarverduras();
}
}

obtenerDatosJson();

