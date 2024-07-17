const noHayProductos = document.querySelector(".texto__no-productos");
const botonEnviar = document.querySelector("[data-enviar]");
const botonLimpiar = document.querySelector("[data-limpiar]");
const botonEliminar = document.querySelectorAll("[data-eliminar]");

let conexionConvertida = "";


const lista = document.querySelector("[data-productos]");


// ? Listar producto
async function listarProducto (){

    // console.log("Si funciona");
    
    try {
        const conexion = await fetch("http://localhost:4000/Productos");
        conexionConvertida = await conexion.json();
        console.log(conexionConvertida);
        
        conexionConvertida.forEach(producto => lista.appendChild(crearTarjeta(producto.nombre, producto.precio, producto.imagen)));

        return conexionConvertida;
    } catch (e) {
        console.error("Error: ", e);
        lista.innerHTML = `<h2 class = "mensaje__titulo">Ha ocurrido un problema con la conexion :( </h2>`;
    }

    return conexionConvertida;
}

// ? Enviar producto
async function enviarProducto(nombre, precio, imagen) {
    const conexion = await fetch("http://localhost:4000/Productos", {
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({
            nombre: nombre,
            precio: precio,
            imagen: imagen
        })
    });

    const conexionConvertida = conexion.json();
    
    if (!conexion.ok) {
        throw new Error("Ha ocurrido un error al enviar el producto");
    }

    return conexionConvertida;
}




function crearTarjeta(nombre, precio, imagen) {
    noHayProductos.style.display = "none";

    const producto = document.createElement("li");
    producto.className = "card producto__item";
    producto.setAttribute = "data-producto";
    producto.innerHTML = `<img class="img__producto" src="${imagen}" alt="img_producto">
                          <p class="texto nombre__producto">${nombre}</p>
                          <div class="texto precio__boton-eliminar">
                              <p class="precio">$ ${precio}</p>
                              <img src="img/bote-de-basura.png" alt="eliminar" class="boton__eliminar" data-eliminar>
                          </div>`;
    return producto;
}


async function crearProducto(evento) {
    evento.preventDefault();

    // noHayProductos.style.display = "none";

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    try{
        crearTarjeta(nombre, precio, imagen);
        await enviarProducto(nombre, precio, imagen);
    } catch (e) {
        alert(e);
    };
}

// async function eliminarProducto(nombre) {
//     const conexion = await fetch(`http://localhost:4000/Productos?q=${nombre}`, {method: "DELETE"});
// }

listarProducto();
botonEnviar.addEventListener("mousedown", (evento) => {crearProducto(evento)});
botonLimpiar.addEventListener("mousedown", () => {
    const nombre = document.querySelector("[data-nombre]").value = "";
    const precio = document.querySelector("[data-precio]").value = "";
    const imagen = document.querySelector("[data-imagen]").value = "";
})
