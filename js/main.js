let sum = 0;

$(document).ready(function() {
    if ("listaProductos" in localStorage) {
        const almacenados = JSON.parse(localStorage.getItem("listaProductos"));
        if (almacenados.length > 0) {
            for (const almacen of almacenados) {
                $(".carritoProducts").append(`
                <tr>
                    <td><img src="${almacen.img}" height="80%" width="80%"></img></td>
                    <td>${almacen.modelo}</td>
                    <td>${almacen.talle}</td>
                    <td>${almacen.color}</td>
                    <td>$${almacen.precio}</td>
                    <td>
                        <input type="number" value=${almacen.cantidad}></input>
                    </td>
                    <td>
                        <button data-id= ${almacen.id}  class= "btn btn-remove btn-danger btn-small">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>`)
                    sum += parseFloat(almacen.precio);
             } 
            // $(".btn-remove").click(eliminarEl($(this).attr("data-id")));
             eliminarEl();
            $(".total").append(`<h3 id="total">Total: $${sum.toFixed(2)}</h3>`)
            $(".confirmarCompra").append(`<button class="btn btn-danger btnConfirmar" id="btnCon">CONFIRMAR</button>`)
            $('#btnCon').click(confirmarCompra)
        }
    }
   

});

let cantidad;
let locatePos;
let sizeLocation;
let colorLocation;
const agregarAlCarrito = productoSeleccionado => {
    const productoAgregado = {
        ...productoSeleccionado, // spread operator
        talle: document.querySelector(`#talleSeleccionado-${productoSeleccionado.id}`).value,
        color: document.querySelector(`#colorSeleccionado-${productoSeleccionado.id}`).value
    }
    let located = arrayCarrito.find(prod => prod.id == productoAgregado.id);
    
    if (located == undefined || productoAgregado.talle != sizeLocation || productoAgregado.color != colorLocation) {
        
        arrayCarrito.push(productoAgregado);
    
        let almacenados;

        if (JSON.parse(localStorage.getItem("listaProductos"))) {
        almacenados = JSON.parse(localStorage.getItem("listaProductos"));


        } else {
        almacenados = [];
        }
        almacenados.push(productoAgregado);
        
        localStorage.setItem("listaProductos", JSON.stringify(almacenados));
        
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
        <td id= "precio-${productoAgregado.id}">$${productoAgregado.precio}</td>
        <td><input type="number" value=1 id="quant-${productoAgregado.modelo}"></input></td>
        <td>
            <button data-id= ${productoAgregado.id}  class= "btn btn-remove btn-danger btn-small ${productoAgregado.id}">
                <i class="bi bi-trash-fill"></i>
            </button>
        </td>
        </tr>`)
    sum += parseFloat(productoAgregado.precio);
    locatePos = arrayCarrito.findIndex(p => p.id == productoAgregado.id);
    sizeLocation = arrayCarrito[locatePos].talle;
    colorLocation = arrayCarrito[locatePos].color;
    }
    else {
        locatePos = arrayCarrito.findIndex(p => p.id == productoAgregado.id);
        cantidad = arrayCarrito[locatePos].cantidad += 1;
        subPrecio = arrayCarrito[locatePos].precio += parseFloat(productoAgregado.precio); // talvez el bardo es aca
        localStorage.setItem("listaProductos", JSON.stringify(arrayCarrito));

        $(`#precio-${productoAgregado.id}`).text(`$${subPrecio}`);
        
    //    $(`#quant-${productoAgregado.modelo}`).val(cantidad);
        
        document.getElementById(`quant-${productoAgregado.modelo}`).value = cantidad;
        sum += parseFloat(productoAgregado.precio);
        
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: productoAgregado.modelo,
            text: 'Ha sido agregado al carrito!',
            showConfirmButton: false,
            timer: 1300
        })
        
    }

    // $(".btn-remove").click(eliminarEl($(this).attr("data-id")));
    eliminarEl();
    $(".total").empty();
    $(".total").append(`<h3 id="total">Total: $${sum}</h3>`)
    $(".confirmarCompra").empty();
    $(".confirmarCompra").append(`<button class="btn btn-danger btnConfirmar" id="btnCon">CONFIRMAR</button>`)
    $('#btnCon').click(confirmarCompra)
    
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

   //jquery animacion

    $(".titleStyle").hover(
        function() {
            $( this ).fadeOut( 300 );
            $( this ).fadeIn( 500 )
            $( this ).css("color", "blueviolet");
        });

    




    //calcular total para enviar datos a backend    
    
    // function calcularTotal() {
    //     let sum = 0;
    // for (let i = 0; i < total.length; i++) {
    //     sum += parseFloat(total[i]);
    // }
    // return sum;
    // }
    

function confirmarCompra() {

    $('#btnCon').hide();

    const URLGET   = "https://jsonplaceholder.typicode.com/posts";

    const infoPost =  { Productos: JSON.stringify(localStorage.getItem("listaProductos")) , Precio: sum}

    console.log(infoPost);

    $.post(URLGET, infoPost ,(respuesta, estado) => {
        if(estado == "success"){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tu orden de compra ha sido confirmada con el comprobante N°:',
                text: respuesta.id,
                showConfirmButton: false,
                timer: 1800
                })
    };
    });
    localStorage.setItem("listaProductos",'[]');
    arrayCarrito = [];
    $('.carritoProducts').empty();
    $('.total').empty();
    sum = 0;
}