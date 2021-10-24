// let login = (nombre, apellido) => {
//     alert("Hola " + nombre + " " + apellido + "!");
// }

// login(prompt("Ingresa tu nombre"), prompt("Ingresa tu apellido"));

// let precioRemera = parseFloat(prompt("Ingrese el precio del primer producto seleccionada"));
// let precioRemera2 = parseFloat(prompt("Ingrese el precio del segundo producto seleccionado"));

// function calcularTotal(producto1, producto2) {
// let precioTotalConIva= (producto1 + producto2) * 1.21;
// return precioTotalConIva;
// }

// let precioFinal=calcularTotal(precioRemera, precioRemera2);
// alert("El importe total con iva incluído es: "+precioFinal);


// const multiplicar = (precioProduct, cantProd) => precioProduct * cantProd;
// const realizarDescuento = (precioTtl, precioDesc) => precioTtl - precioDesc; 
// const calcularIva = (pepe, pepito) => multiplicar(pepe, pepito) * 1.21 ; 

// let precioRemera = parseInt(prompt("ingrese el precio del producto"));
// let cantidadRemeras = parseInt(prompt("ingrese la cantidad del producto"));
// let cantidadDescuento = parseInt(prompt("ingrese la cantidad de descuento"));

// let precioFinal = realizarDescuento(calcularIva(precioRemera, cantidadRemeras), cantidadDescuento);

// alert("El importe total con el iva agregado es: "+precioFinal);

// class Remera {
//     constructor(talle, modelo, color, precio) {
//         this.talle = talle;
//         this.modelo = modelo;
//         this.color = color;
//         this.precio = precio;
//     }
//     talleSeleccionado() {
//         alert("El talle seleccionado es: " + this.talle)
//     }
//     modeloSeleccionado() {
//         alert("El modelo seleccionado es: " + this.modelo)
//     }
//     colorSeleccionado() {
//         alert("El color seleccionado es: " + this.color)
//     }
//     precioSeleccionado() {
//         alert("El precio del producto seleccionado + iva es: " + this.precio * 1.21)
//     }
// }

// let reme = new Remera(prompt("ingrese el talle seleccionado"), 
//     prompt("ingrese el modelo seleccionado"), 
//     prompt("ingrese el color seleciconado"), 
//     parseInt(prompt("ingrese el precio del producto")));

// reme.talleSeleccionado();
// reme.modeloSeleccionado();
// reme.colorSeleccionado();
// reme.precioSeleccionado();




// class Remera {
//     constructor(talle, modelo, color, precio) {
//         this.talle = talle;
//         this.modelo = modelo;
//         this.color = color;
//         this.precio = precio;
//     }
//     selectTalle() {
//         let talleSeleccionado = prompt("ingrese el talle seleccionado");
//         this.talle = talleSeleccionado;
//     }
// }

// let reme = new Remera (talle, chomba, rojo);

// reme.selectTalle();

// class Remera {
//     constructor(talle, color, precio) {
//         this.talle = talle;
//         this.color = color;
//         this.precio = precio;
//     }
//     mostrarCaracteristicasProducto() {
//         alert("talle: " + this.talle + " color: " + this.color + " precio con iva: " + this.precio);
//     }
//     ingresarTalle() {
//         let nuevoTalle = prompt("Ingresa el talle de la remera");
//         this.talle = nuevoTalle;
//     }
//     ingresarColor() {
//         let nuevoColor = prompt("Ingresa el color de la remera");
//         this.color = nuevoColor;
//     }
//     ingresarPrecio() {
//         let nuevoPrecio = parseInt(prompt("Ingresa el precio de la remera"));
//         this.precio = nuevoPrecio *1.21;
//     }
// }

// let reme = new Remera("", "","");
// reme.ingresarTalle();
// reme.ingresarColor();
// reme.ingresarPrecio();
// reme.mostrarCaracteristicasProducto();

// const listOfProducts = [{ color: "blanco", modelo: "Britney", precio: 950, talle: "L" },
//     { color: "negro", modelo: "Friends", precio: 4050, talle: "M" },
//     { color: "verde", modelo: "Bordado", precio: 1050, talle: "S" }
// ];

// let selectColor = prompt("Ingrese el color del producto");
// let selectModel = prompt("Ingrese el modelo del producto");
// let selectPrize = parseInt(prompt("Ingrese el precio"));
// let selectSize = prompt("Ingrese el talle del producto");

// class Producto {
//     constructor(color, modelo, precio, talle) {
//         this.color = color;
//         this.modelo = modelo;
//         this.precio = precio;
//         this.talle = talle;
//     }
// }

// const newProduct = new Producto(selectColor, selectModel, selectPrize, selectSize);
// listOfProducts.push(newProduct);

// for (const producto of listOfProducts) {
//     alert("Color: " + producto.color + " " + "Modelo: " + producto.modelo + " " + "Precio: " + 
//     producto.precio + " " + "Talle: " + producto.talle);
// }
class Producto {
    constructor (modelo, talle, color, precio) {
        this.modelo = modelo;
        this.talle = talle;
        this.color = color;
        this.precio = precio;
        this.venta = false;
    
    }
    sumarIva() { 
        this.precio = this.precio * 1.21; 
    }
    vender() {
        this.venta = true;
        }   
}

const listOfProducts = [];
let salida
do{
    let selectModel = prompt("Ingrese el nombre del modelo seleccionado");
    let selectTalle = prompt("Ingrese S - M - L para elegri el talle");
    let selectColor = prompt("Ingrese violeta o negro para elegri el color"); 
    let selectPrecio = parseFloat(prompt("Ingrese el precio del producto seleccionado"));
    listOfProducts.push(new Producto(selectModel, selectTalle, selectColor, selectPrecio));
    salida = prompt("Presione X para salir al carrito o cualquier otra tecla para continuar comprando").toLowerCase();
    }while (salida != "x");

    for (let i = 0; i < listOfProducts.length; i++) {
        listOfProducts[i].vender();
        listOfProducts[i].sumarIva();
        
    }
//storage       
const guardarLocal = (clave, valor) => { localStorage.setItem(clave, valor) };

guardarLocal("listaProductos", JSON.stringify(listOfProducts));

const total = []; //declaro array vacio para el precio total

//variables para generar tabla con for of
let tabla = document.createElement("table");
tabla.setAttribute("class", "table table-striped table-dark");//bootstrap clases
let tablaBody = document.createElement("tbody");
let tablaHead = document.createElement("thead");
tablaHead.innerHTML = `<th>Modelo</th>
                        <th>Talle</th>
                        <th>Color</th>
                        <th>Precio + IVA</th>`;


for (const producto of listOfProducts) {


    let fila = document.createElement("tr");
    fila.innerHTML =       `<td>${producto.modelo}</td>
                            <td>${producto.talle}</td>
                            <td>${producto.color}</td>
                            <td>${producto.precio.toFixed(2)}</td>`;
    tablaBody.appendChild(fila);
    
    total.push(producto.precio);//reutilzando for para pushear precios al array "total"
}
//for para precio total del array
let sum = 0;
for (let i = 0; i < total.length; i++) {
    sum += parseFloat(total[i]);
}


tabla.appendChild(tablaHead);
tabla.appendChild(tablaBody);
document.body.appendChild(tabla); 

let totalPrice = document.createElement("div");
totalPrice.setAttribute("class", "d-flex flex-column align-items-center");//bootstrap clases
totalPrice.innerHTML = `<h3>Total: ${sum.toFixed(2)}</h3>`;
document.body.appendChild(totalPrice);
