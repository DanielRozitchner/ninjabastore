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


//choose event ejercicio 9
let selectDetails = document.getElementById("selectDetails");
selectDetails.addEventListener("click", clickSelect)
function clickSelect () {
        let selectShirt = document.createElement("h1");
        selectShirt.innerText = "Proximamente tendras mas novedades";
     document.getElementById("selector").appendChild(selectShirt);
}