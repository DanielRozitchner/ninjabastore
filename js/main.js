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
                total.push(almacen.precio);
            }
            let sum = 0;
                for (let i = 0; i < total.length; i++) {
                    sum += parseFloat(total[i]);
            }   
            $(".total").append(`<h3>Total: $${sum.toFixed(2)}</h3>`)
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
total.push(productoAgregado.precio);    

let sum = 0;
for (let i = 0; i < total.length; i++) {
    sum += parseFloat(total[i]);
}
$(".total").empty();   
$(".total").append(`<h3>Total: $${sum.toFixed(2)}</h3>`)

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


// for (const producto of listOfProducts) {
    
//     total.push(producto.precio);//reutilzando for para pushear precios al array "total"
// }
//for para precio total del array


// let totalPrice = document.createElement("div");
// totalPrice.setAttribute("class", "d-flex flex-column align-items-center");//bootstrap clases
// totalPrice.innerHTML = `<h3>Total: ${sum.toFixed(2)}</h3>`;
// document.body.appendChild(totalPrice);


// function carritoUI(productos){
//     //CAMBIAR INTERIOR DEL INDICADOR DE CANTIDAD DE PRODUCTOS;
//     $('#carritoCantidad').html(productos.length);
//     //VACIAR EL INTERIOR DEL CUERPO DEL CARRITO;
//     $('#carritoProductos').empty();
//     for (const producto of productos) {
//       $('#carritoProductos').append(registroCarrito(producto));
//     }
//     //AGREGAR TOTAL
//     $('#carritoProductos').append(`<p id="totalCarrito"> TOTAL ${totalCarrito(productos)}</p>`);
//     //AGREGAR BOTON CONFIRMAR
//     $('#carritoProductos').append('<div id="divConfirmar" class="text-center"><button id="btnConfimar" class="btn btn-success">CONFIRMAR</button></div>')
//     //ASOCIAMOS LOS EVENTOS A LA INTERFAZ GENERADA
//     $('.btn-delete').on('click', eliminarCarrito);
//     $('.btn-add').click(addCantidad);
//     $('.btn-sub').click(subCantidad);
//     $('#btnConfimar').click(confirmarCompra);

//     function confirmarCompra(){
//         //OCULTAR EL BOTON
//         $('#btnConfimar').hide();
//         //AÑADIR SPINNER
//         $('#divConfirmar').append(`<div class="spinner-border text-success" role="status">
//                                     <span class="sr-only">Loading...</span>
//                                   </div>`);
//         console.log("ENVIAR AL BACKEND");
//         //REALIZAMOS LA PETICION POST
//         //const URLPOST = '/compra.php';
//         const URLPOST = 'https://jsonplaceholder.typicode.com/posts';
//         //INFORMACION A ENVIAR
//         const DATA   = {productos: JSON.stringify(carrito), total: totalCarrito(carrito)}
//         //PETICION POST CON AJAX
//         $.post(URLPOST, DATA,function(respuesta,estado){
//             //console.log(respuesta);
//             //console.log(estado);
//             if(estado == 'success'){
//               //MOSTRAMOS NOTIFICACION DE CONFIRMACIÓN (CON ANIMACIONES)
//               $("#notificaciones").html(`<div class="alert alert-sucess alert-dismissible fade show" role="alert">
//                           <strong>COMPRA CONFIRMADA!</strong> Comprobante Nº ${respuesta.id}.
//                           <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//                             <span aria-hidden="true">&times;</span>
//                           </button>
//                           </div>`).fadeIn().delay(2000).fadeOut('');
// let totalPrice = document.createElement("div");
// totalPrice.setAttribute("class", "d-flex flex-column align-items-center");//bootstrap clases
// totalPrice.innerHTML = `<h3>Total: ${sum.toFixed(2)}</h3>`;
// document.body.appendChild(totalPrice);