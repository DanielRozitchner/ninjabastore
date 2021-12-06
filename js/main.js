let sum = 0;
//obteniendo productos del local storage para pintar en el carrito
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
                    <td class='price-market-${almacen.id}-${almacen.talle}-${almacen.color}'>$${almacen.precio}</td>
                    <td>
                        <input class='qty-market-${almacen.id}-${almacen.talle}-${almacen.color}' value=${almacen.cantidad} style="width: 2em"></input>
                    </td>
                    <td>
                        <button data-id= ${almacen.id} data-size= ${almacen.talle} data-color= ${almacen.color}   class= "btn btn-remove btn-danger btn-small">
                            <i class="bi bi-trash-fill"></i>
                        </button>
                    </td>
                </tr>`)
                    sum += parseFloat(almacen.precio);
            } 
            eliminarEl();
            $(".total").append(`<h3 id="total">Total: $${sum.toFixed(2)}</h3>`)
            $(".login").append(`<button class="btn btn-danger btn-modal" id="btn-login">Registrar Compra</button>
            `)
            $(".btn-modal").click(registrarCompra);
        }
    }

});

let cantidad;


//funcion para agregar productos al carrito
const agregarAlCarrito = productoSeleccionado => {
    const productoAgregado = {
        ...productoSeleccionado, // spread operator
        talle: document.querySelector(`#talleSeleccionado-${productoSeleccionado.id}`).value,
        color: document.querySelector(`#colorSeleccionado-${productoSeleccionado.id}`).value
    }
    const laLista = JSON.parse(localStorage.getItem("listaProductos"));
    //unificando storage con arrayCarrito
    if (!arrayCarrito.length && laLista){
        arrayCarrito = laLista;
    }
//localizando producto en el array para usar en if else
    let located = arrayCarrito.filter(prod => prod.id == productoAgregado.id && prod.talle == productoAgregado.talle && prod.color == productoAgregado.color);
// condicion para pintar agregar si no encuentra producto con mismas caracteristicas
    if (!located.length || productoAgregado.talle != located[0].talle || productoAgregado.color != located[0].color)  {
        
        arrayCarrito.push(productoAgregado);
    
        let almacenados;
//chequeando storage para sumar producto al storage
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
        <td class='price-market-${productoAgregado.id}-${productoAgregado.talle}-${productoAgregado.color}' id= "precio-${productoAgregado.id}">$${productoAgregado.precio}</td>
        <td><input value=1 class="qty-market-${productoAgregado.id}-${productoAgregado.talle}-${productoAgregado.color}" quant-${productoAgregado.id}" style="width: 2em"></input></td>
        <td>
            <button data-id= ${productoAgregado.id} data-size= ${productoAgregado.talle} data-color= ${productoAgregado.color}  class= "btn btn-remove btn-danger btn-small ${productoAgregado.id}">
                <i class="bi bi-trash-fill"></i>
            </button>
        </td>
        </tr>`)
    sum += parseFloat(productoAgregado.precio);
    }
    //iterando el array para sumar cantidad de productos, precio y al storage
    else{
        for (let i = 0; i < arrayCarrito.length; i++) {
           if (productoAgregado.id == arrayCarrito[i].id && productoAgregado.talle == arrayCarrito[i].talle && productoAgregado.color == arrayCarrito[i].color){ 
            
            cantidad = arrayCarrito[i].cantidad += 1;
            subPrecio = arrayCarrito[i].precio += parseFloat(productoAgregado.precio);
            localStorage.setItem("listaProductos", JSON.stringify(arrayCarrito));  
        }
    }
   

        $(`#precio-${productoAgregado.id}`).text(`$${subPrecio}`);
        
        
        $(`.quant-${productoAgregado.id}`).value = cantidad;
        $(`.price-market-${productoAgregado.id}-${productoAgregado.talle}-${productoAgregado.color}`).html(`$${subPrecio}`);
        $(`.qty-market-${productoAgregado.id}-${productoAgregado.talle}-${productoAgregado.color}`).val(cantidad);
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

    
    eliminarEl();

    $(".total").empty();
    $(".total").append(`<h3 id="total">Total: $${sum}</h3>`)
    $(".login").empty();
    $(".login").append(`<button class="btn btn-danger btn-modal" id="btn-login">Registrar Compra</button>
    `)
    $(".btn-modal").click(registrarCompra);
    
};

//cargando los productos de la pagina dinamicamente
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