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
title: 'Nuevo producto agregado al carrito',
showConfirmButton: false,
timer: 1300
})
};
productos.forEach(newProduct => {
    const producto = `
        <div class="col mb-4">  
            <div class="producto card d-flex flex-column align-items-center"">
                <img class="card-img-top imgStyle"src="${newProduct.img}"> 
                <div class="card=body">
                    <h3 class="producto__modelo">${newProduct.modelo}</h3>
                    <select id="talleSeleccionado-${newProduct.id}">${newProduct.talle.map(talle => `<option value="${talle}">${talle}</option>`)}</select>
                    <select id="colorSeleccionado-${newProduct.id}">${newProduct.color.map(color => `<option value="${color}">${color}</option>`)}</select>
                    <h3 class="producto__precio">$  ${newProduct.precio}</h3>
                    <button onclick='agregarAlCarrito(${JSON.stringify(newProduct)});'>Agregar al carrito</button>
                </div>
            </div>
        </div>`;
    document.querySelector("#cards").innerHTML += producto;
    });
