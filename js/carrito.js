// 1)
//Storage: get item
//Esto sirve para guardar los datos incluso si cerrás la página o apagás la computadora
//Variable carrito (que empieza con un array vacío), donde voy a guardar todos los disfraces que el usuario quiera comprar
//Tiene que ser let para poder cambiarlo
//Le pongo el localStorage.getItem para guardar lo que haya agregado al carrito el usuario
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//Storage: set item
//Con esto guardo el carrito en el almacenamiento local. Sólo falta ponerlo en el push, línea 191
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};





// 2)
//Enumeración de constantes. (Implementación de DOM para enlazar el archivo html con el js)
const verCarrito = document.getElementById("ver-carrito"); //el id está en el header
const modal = document.getElementById("carrito-id"); //el id está en el div del modal del carrito





// 3)
//Creo el modal para el carrito, creo cada parte y luego las añado al const modal. Header, button y content
//Para el content tenemos que hacer un forEach así muestro lo que clickea el usuario
const pintarCarrito = () => {
    //Estas 2 líneas sirven para abrir y cerrar el carrito sin problemas
    modal.innerHTML = "";
    modal.style.display = "flex";

    const modalContainer = document.createElement("div");
    modalContainer.className = "modalContainer";
    modal.append(modalContainer);

    const modalHeader = document.createElement("div");
    modalHeader.className = "modalHeader";
    modalHeader.innerHTML = `
    <h1 class="modalHeaderTitle">Shop</h1>
    <img class="modalHeaderImagen" src="https://i.ibb.co/pRWmFgB/carritosuper.png" loading="lazy">
    `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement("button");
    modalButton.className = "modalHeaderButton";
    modalButton.innerText = "❌";

    //Evento para que se cierre el modal y vuelva a aparecer el scroll del body
    modalButton.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
    })

    modalHeader.append(modalButton);

    const modalContent = document.createElement("div");
    modalContent.className = "modalContent";
    modalContainer.append(modalContent);

    carrito.forEach((verdura) => {
        let modalProduct = document.createElement("div");
        modalProduct.className = "modalProduct";
        modalProduct.innerHTML = `
            <div class="modalProductImagen">
                <img src="${verdura.imagen}">
            </div>
            <p class="modalProductNombre">${verdura.nombre}</p>
            <p class="modalProductPrecio">$ ${verdura.precio}</p>
            <div class="modalProductCantidad">
                <button class="modalProductRestar"> - </button>
                <p class="modalProductNumero">${verdura.cantidad}</p>
                <button class="modalProductSumar"> + </button>
            </div>
            <div class="modalProductTotal">
                <p class="modalProductTotalPalabra">Total: </p>
                <p class="modalProductTotalNumero">$ ${verdura.cantidad * verdura.precio}</p>
            </div>
            <button class="modalProductBorrar"> ❌ </button>
        `;
        modalContent.append(modalProduct);


        let restar = modalProduct.querySelector(".modalProductRestar");
        let sumar = modalProduct.querySelector(".modalProductSumar");
        let eliminar = modalProduct.querySelector(".modalProductBorrar");

        restar.addEventListener("click", (event) => {
            if (verdura.cantidad !== 1) {
                verdura.cantidad--;
            }
            saveLocal();
            pintarCarrito();
        });

        sumar.addEventListener("click", (event) => {
            verdura.cantidad++;
            saveLocal();
            pintarCarrito();
        });

        eliminar.addEventListener("click", (event) => {
            eliminarProducto(verdura.id);
        });


    });

    //Función para calcular el total del carrito
    //El método reduce lleva 2 parámetros: "acc" que es el acumulador y "el" que es cada elemento de los productos
    //0 es el número con el que arranca el acumulador
    //Esto lo utilizo en la línea 127
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    //Creo el footer
    const modalFooter = document.createElement("div");
    modalFooter.className = "modalFooter";
    modalFooter.innerHTML = `
    <button class="modalFooterButton">
        <p id="vaciar-carrito" class="modalFooterButtonPalabra">Vaciar carrito</p>
    </button>
    <div class="modalFooterTotal">
        <p class="modalFooterTotalPalabra">Total a pagar:</p>
        <p class="modalFooterTotalNumero">$ ${total}</p>
    </div>
    <button class="modalFooterButton">
        <p id="finalizar-compra" class="modalFooterButtonPalabra">Finalizar compra</p>
    </button>
    `;
    modalContainer.append(modalFooter);

    //Función para que el botón de finalizar compra limpie el storage y aparezca un cartel
    let vaciarCarrito = document.getElementById("vaciar-carrito")
    let finalizarCompra = document.getElementById("finalizar-compra");
    let compraCompletada = document.getElementById("compra-completada");

    vaciarCarrito.addEventListener('click', () => {
        localStorage.clear();
        eliminarTodosProductos();
        //Pongo el mensaje del tostify
        Toastify({
            text: "Carrito vacío",
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

    finalizarCompra.addEventListener('click', () => {
        localStorage.clear();
        eliminarTodosProductos();
        //Pongo el mensaje del tostify
        Toastify({
            text: "¡Gracias por por elejirnos! 😊",
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
};





// 4)
//Sin esta función, cuando clickee en "comprar" me van a aparecer TODOS los productos en carrito
//Con esto le estoy avisando qué es lo que debe subir al carrito
//Esto me va a servir para llamar a esta función más abajo
//Uso esta función en el botón comprar de cada card
function agregarAlCarrito(disfraz) {
    //"some" sirve para ver si el usuario compra 2 o más veces el mismo producto
    //Es un valor booleando. Devuelve false para comprar 1 sola vez, true para más veces
    const repetir = carrito.some((repetirProducto) => repetirProducto.id === disfraz.id);

    //Si el producto se repite, se suma 1 en cantidad. Sino se pushea el producto entero
    if (repetir === true) {
        carrito.map((disfrazEnCarrito) => {
            if (disfrazEnCarrito.id === disfraz.id) {
                disfrazEnCarrito.cantidad++;
            }
        })
    } else {
        carrito.push({
            id: disfraz.id,
            nombre: disfraz.nombre,
            categoria: disfraz.categoria,
            precio: disfraz.precio,
            imagen: disfraz.imagen,
            cantidad: 1,
        });
    };
    console.log(carrito);
    console.log(carrito.length);

    carritoContador();
    saveLocal();
};





// 5)
//Cuando clickee en el carrito, va a ocurrir la función "pintarCarrito"
//También va a ocurrir que se va a mostrar el modal, y va a desaparecer el scroll del body
//Es decir estoy juntando las 2 cosas en esta función
verCarrito.addEventListener('click', function () {
    pintarCarrito();

    // Mostrar el div del modal
    modal.style.display = 'flex';

    // Ocultar el scrollbar del body
    document.body.style.overflow = 'hidden';
});





// 6)
//Función para eliminar cada producto
//La palabra element puede ser verdura o cualquier cosa
const eliminarProducto = (id) => {
    //Lo que el usuario quiere eliminar
    const idEncontrado = carrito.find((element) => element.id === id);

    //El carrito entero, menos el id eliminado 
    carrito = carrito.filter((carritoId) => {
        return carritoId !== idEncontrado;
    });

    // Actualiza la vista del carrito, contador y guarda en local
    carritoContador();
    saveLocal();
    pintarCarrito();
};

//Función para eliminar todos los productos
const eliminarTodosProductos = () => {
    // Vacía el carrito completamente
    carrito = [];

    // Actualiza la vista del carrito, contador y guarda en local
    carritoContador();
    saveLocal();
    pintarCarrito();
};





// 7)
//Estoy modificando el dibujo al lado de "carrito"
//Si no compran nada aparece el carrito1 que es un png de carrito. Si compran aparece el carrito2 que es un contador
//Estoy agregando set item para que cuando se refresque, me siga mostrando el contador con las verduras clickeadas en el local storage
const carritoContador = () => {
    let carrito1 = document.querySelector('.carrito1');
    let carrito2 = document.querySelector('.carrito2');
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    if (carrito.length === 0) {
        carrito1.style.display = "inline-block";
        carrito2.style.display = "none";
    } else {
        carrito1.style.display = "none";
        carrito2.style.display = "inline-block";
        carrito2.innerText = JSON.parse(localStorage.getItem("carritoLength"));
    }
};

//Para que cuando se refresque, me siga mostrando el contador de las verduras clickeadas en el header
carritoContador();





// 8)
// Esto es un añadido que solamente me sirve para arreglar el css del carrito
//Clase ".hidden" agregada con Javascript para que no aparezca el fondo del modal del carrito cuando refresque la página
document.addEventListener("DOMContentLoaded", function () {
    modal.classList.add("hidden");
});