$(document).ready(function () {
    if("listaProductos" in localStorage){
        const almacenados = JSON.parse(localStorage.getItem("listaProductos"));
        if(almacenados.length > 0){
            for (const almacen of almacenados) {
                $(".carritoProducts").append(`
                <tr>
                    <td><img src="${almacen.img}" height="80%" width="80%"></img></td>
                    <td>${almacen.modelo}</td>
                    <td>${almacen.talle}</td>
                    <td>${almacen.color}</td>
                    <td>$${almacen.precio}</td>
                    </tr>`)
            }
        }
    }
});
const agregarAlCarrito = productoSeleccionado => {
    const productoAgregado = {
        ...productoSeleccionado, // spread operator
        talle: document.querySelector(`#talleSeleccionado-${productoSeleccionado.id}`).value,
        color: document.querySelector(`#colorSeleccionado-${productoSeleccionado.id}`).value
    }
    arrayCarrito.push(productoAgregado);
    console.log(arrayCarrito);

    let almacenados;

    if (JSON.parse(localStorage.getItem("listaProductos"))?.length) {
        almacenados = JSON.parse(localStorage.getItem("listaProductos"));
} else {
    almacenados= [];
    }
    almacenados.push(productoAgregado);
    
    localStorage.setItem("listaProductos",JSON.stringify(almacenados));


    Swal.fire({
position: 'center',
icon: 'success',
title: productoAgregado.modelo,
text: 'Ha sido agregado al carrito!',
showConfirmButton: false,
timer: 1300
})
//Agregando los productos al carrito del DOM mediante jQuery
$(".carritoProducts").append(`
<tr>
    <td><img src="${productoAgregado.img}" height="80%" width="80%"></img></td>
    <td>${productoAgregado.modelo}</td>
    <td>${productoAgregado.talle}</td>
    <td>${productoAgregado.color}</td>
    <td>$${productoAgregado.precio}</td>
    </tr>`)
};

productos.forEach(newProduct => {
    const producto = `
        <div class="col mb-4">  
            <div class="producto card d-flex flex-column align-items-center"">
                <img class="card-img-top imgStyle"src="${newProduct.img}"> 
                <div class="card=body">
                    <h3 class="producto__modelo">${newProduct.modelo}</h3>
                    <select class="custom-select" id="talleSeleccionado-${newProduct.id}">${newProduct.talle.map(talle => `<option value="${talle}">${talle}</option>`)}</select>
                    <select class="custom-select" id="colorSeleccionado-${newProduct.id}">${newProduct.color.map(color => `<option value="${color}">${color}</option>`)}</select>
                    <h3 class="producto__precio">$  ${newProduct.precio}</h3>
                    <button class="btn btn-danger" onclick='agregarAlCarrito(${JSON.stringify(newProduct)});'>Agregar al carrito</button>
                </div>
            </div>
        </div>`;
    document.querySelector("#cards").innerHTML += producto;
    });
