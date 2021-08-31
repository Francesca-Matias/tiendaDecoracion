// Ingreso de nuevos productos 
class Producto {
    constructor(codigo, nombre, mueble, material, stock) {
        this.codigo = codigo;
       this.nombre = nombre;
       this.mueble = mueble;
       this.material = material;
       this.stock = stock;
    }
}

const botonRemoverProductos = document.getElementById("removerProductos")
botonRemoverProductos.addEventListener("click", removerProductos);

// dark mode 
const botonDarkMode = document.getElementById("darkMode");
botonDarkMode.addEventListener("click", cambiarTema);

const mostrarMenu = document.getElementById("mostrarMenu");
mostrarMenu.addEventListener("click", mostrarFormulario)

const formulario = document.getElementById("formularioProductos");
formulario.addEventListener("submit", guardarProducto);

//cambiar tema
function cambiarTema() {
    document.body.classList.toggle("darkMode");
}


// eliminar todos los productos
function removerProductos() {
    localStorage.clear();
    mostrarListado(cargarListado());
}

function cargarListado() {
    const listadoProductos = JSON.parse(localStorage.getItem("listadoProductos"));
    if (listadoProductos == null) {
        return [];
    }
    return listadoProductos;
}

function guardarListado(listadoProductos) {
    localStorage.setItem("listadoProductos", JSON.stringify(listadoProductos));
    mostrarListado(listadoProductos);
}

function guardarProducto(e) {
    e.preventDefault();
    const formulario = new FormData(e.target);
    const codigo = formulario.get("codigo");
    const nombre = formulario.get("nombre");
    const mueble = formulario.get("mueble");
    const material = formulario.get("material");
    const stock = formulario.get("stock");

    const producto = new Producto(codigo, nombre, mueble, material, stock);

    if (validarformulario(producto)) {
        
        const listadoProductos = cargarListado();

        listadoProductos.push(producto);

        guardarListado(listadoProductos);

        document.getElementById('formularioProductos').reset();
    } else {
        mostrarError("Campos vacios, por favor ingrese todos los datos");
    }
}

//  Muestra error
function mostrarError(mensaje) {
    const div = document.createElement("div");
    div.classList.add("alert", "alert-danger", "m-3");
    div.textContent = mensaje;
    const menu = document.getElementById("menuAgregar");
    menu.appendChild(div);
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}

//  Validar campos vacios
function validarformulario(producto){
    let salida = true;
    const campos = Object.values(producto);
    campos.forEach(campo => {
        if (campo === "") {
            salida = false;
        }
    });
    return salida;
}

function mostrarFormulario() {
    document.getElementById("menuAgregar").classList.toggle("oculto");
}

function armarTarjeta(elemento) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta", "m-2");

    const btnEliminar = document.createElement("div");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.classList.add("btn", "btn-danger", "float-end", "m-2");
    btnEliminar.setAttribute("id", elemento.codigo);
    btnEliminar.setAttribute("onclick", `eliminarProducto(${elemento.codigo})`);
    tarjeta.appendChild(btnEliminar);

    const nombreProducto = document.createElement("h3");
    nombreProducto.textContent = elemento.nombre
    tarjeta.appendChild(nombreProducto);

    const mueble = document.createElement("div");
    mueble.textContent = `Mueble: ${elemento.mueble}`;
    tarjeta.appendChild(mueble);

    const material = document.createElement("div");
    material.textContent = `Material: ${elemento.material}`;
    tarjeta.appendChild(material);

    const stock = document.createElement("div");
    stock.textContent = `stock: ${elemento.stock}`;
    tarjeta.appendChild(stock);


    return tarjeta;
}

// eliminar producto especifico
function eliminarProducto(codigo){
    let listadoProductos = cargarListado();
    listadoProductos = listadoProductos.filter(producto => producto.codigo != codigo);
    guardarListado(listadoProductos);
}

function mostrarListado(listadoProductos) {
    const listado = document.getElementById("listado");
    listado.textContent = "";
    listadoProductos.map(elemento => {
        listado.appendChild(armarTarjeta(elemento));
    });
}

mostrarListado(cargarListado());


// mostrar/ocultar listado

$(() => {
    $("#btn-hide").dblclick(() => {
        $("#listado").hide()
    })

    $("#btn-show").dblclick(() => {
        $("#listado").show()
    })
});

//API

$(document).ready(function () {

    const APIURL = 'https://jsonplaceholder.typicode.com/posts';

    const infoPost = {
        nombre: "F&M Decoratione"
    }

    $(".botonApi").prepend('<button id="post" class="btn btn-api m-2">Guardar Cambios</button>');

    $("#post").click(() => {
        $.ajax({
            method: "POST",
            url: APIURL,
            data: infoPost,
            success: function (respuesta) {
                $(".row").append(`<div class=" textSalida h3">Guardado Exitoso: ${respuesta.nombre}</div>`);
            }
        });
    });
})