// class Producto {
//     constructor (modelo, talle, color, precio) {
//         this.modelo = modelo;
//         this.talle = talle;
//         this.color = color;
//         this.precio = precio;
//         this.venta = false;
    
//     }
//     sumarIva() { 
//         this.precio = this.precio * 1.21; 
//     }
//     vender() {
//         this.venta = true;
//         }   
// }





// const listOfProducts = [];
// let salida
// do{
//     let selectModel = prompt("Ingrese el nombre del modelo seleccionado");
//     let selectTalle = prompt("Ingrese S - M - L para elegri el talle");
//     let selectColor = prompt("Ingrese violeta o negro para elegri el color"); 
//     let selectPrecio = parseFloat(prompt("Ingrese el precio del producto seleccionado"));
//     listOfProducts.push(new Producto(selectModel, selectTalle, selectColor, selectPrecio));
//     salida = prompt("Presione X para salir al carrito o cualquier otra tecla para continuar comprando").toLowerCase();
//     }while (salida != "x");

//     for (let i = 0; i < listOfProducts.length; i++) {
//         listOfProducts[i].vender();
//         listOfProducts[i].sumarIva();
        
//     }
//storage       
// const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

// guardarLocal("listaProductos", JSON.stringify(listOfProducts));

// const total = []; //declaro array vacio para el precio total

// //variables para generar tabla con for of
// let tabla = document.createElement("table");
// tabla.setAttribute("class", "table table-striped table-dark");//bootstrap clases
// let tablaBody = document.createElement("tbody");
// let tablaHead = document.createElement("thead");
// tablaHead.innerHTML = `<th>Modelo</th>
//                         <th>Talle</th>
//                         <th>Color</th>
//                         <th>Precio + IVA</th>`;


// for (const producto of listOfProducts) {


//     let fila = document.createElement("tr");
//     fila.innerHTML =       `<td>${producto.modelo}</td>
//                             <td>${producto.talle}</td>
//                             <td>${producto.color}</td>
//                             <td>${producto.precio.toFixed(2)}</td>`;
//     tablaBody.appendChild(fila);
    
//     total.push(producto.precio);//reutilzando for para pushear precios al array "total"
// }
// //for para precio total del array
// let sum = 0;
// for (let i = 0; i < total.length; i++) {
//     sum += parseFloat(total[i]);
// }


// tabla.appendChild(tablaHead);
// tabla.appendChild(tablaBody);
// document.body.appendChild(tabla); 

// let totalPrice = document.createElement("div");
// totalPrice.setAttribute("class", "d-flex flex-column align-items-center");//bootstrap clases
// totalPrice.innerHTML = `<h3>Total: ${sum.toFixed(2)}</h3>`;
// document.body.appendChild(totalPrice);


//choose event ejercicio 9
// let selectDetails = document.getElementById("selectDetails");
// selectDetails.addEventListener("click", clickSelect)
// let clicked = null;
// function clickSelect () {
//     if (clicked == null) {$("#selector").append(`<form>
//     <label for="seleccionarTalle">Selecciona el talle y el color</label>
//     <select id="seleccionarTalle">
//         <option value="S">S</option>
//         <option value="M">M</option>
//         <option value="L">L</option>
//         <option value="XL">XL</option>
//     </select>
//     <button id="btn">Confirmar Seleccion</button>
// </form>`);
// const btn = $('#btn');
// const sT = $('#seleccionarTalle')
// btn.onclick = (event) => {
//     event.preventDefault();
    
//     console.log(sT.value);
// };
// clicked = 1; 
// }
// }


// let colorSelect= document.getElementById("color");

// function colorElegido() {
//     productos[0].color = (colorSelect.value);
//     console.log(productos[0]);
// }

// const agregarAlCarrito = event => {
//     // arrayCarrito.push(productoAgregado)
//     console.log(event.target)
// };
// productos.forEach(newProduct => {
//     const producto = `
//         <div class="producto">
//             <h3 class="producto__modelo">${newProduct.modelo}</h3>
//             <div><img src="${newProduct.img}"></div>     
//             <select>${newProduct.talle.map(talle => `<option value="${talle}">${talle}</option>`)}</select>
//             <select>${newProduct.color.map(color => `<option value="${color}">${color}</option>`)}</select>
//             <h3 class="producto__precio">${newProduct.precio}</h3>
//             <button class="car">Agregar al carrito</button>
//         </div>
//           `;
//       $('#cards').append(producto);
//     });
//     document.querySelectorAll(".car").forEach(btn => btn.addEventListener("click", event => {
//         debugger
//         const precio = event.target.previousElementSibling.innerText;
//         const color = event.target.previousSibling.previousSibling.value;
//         const talle = event.target.previousSibling.previousSibling.previousSibling.value;
//         const img = event.target.previousSibling.previousSibling.previousSibling.previousSibling.src;
//         const modelo = event.target.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.innerText;
        
//         const productoSeleccionado = {
//             precio,
//             color,
//             talle,
//             img,
//             modelo
//         };
//         arrayCarrito.push(productoSeleccionado);
//         console.log(arrayCarrito);

//     }));

// $(".car").forEach(btn => $(btn).onclick(event => console.log(event)));
// console.log(arrayCarrito);


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
        <div class="producto">
            <h3 class="producto__modelo">${newProduct.modelo}</h3>
            <div><img src="${newProduct.img}"></div>     
            <select id="talleSeleccionado-${newProduct.id}">${newProduct.talle.map(talle => `<option value="${talle}">${talle}</option>`)}</select>
            <select id="colorSeleccionado-${newProduct.id}">${newProduct.color.map(color => `<option value="${color}">${color}</option>`)}</select>
            <h3 class="producto__precio">$  ${newProduct.precio}</h3>
            <button onclick='agregarAlCarrito(${JSON.stringify(newProduct)});'>Agregar al carrito</button>
        </div>
        `;
    document.querySelector("#cards").innerHTML += producto;
    });
