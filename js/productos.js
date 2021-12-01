const posiblesTalles = ["S","M","L","XL"];
const posiblesColores = ["Lila","Negro"];
let   arrayCarrito = JSON.parse(localStorage.getItem("listaProductos")) || [];
const total = []
const productos = [{
    id: "1",
    modelo: "Remera Ninja",
    img: "assets/WhatsApp Image 2021-10-14 at 13.57.06 (1).jpeg",
    talle: posiblesTalles,
    color: posiblesColores,
    precio: 1750,
    cantidad: 1
},
{
    id: "2",
    modelo: "Marge",
    img:"assets/WhatsApp Image 2021-10-14 at 13.57.06 (2).jpeg",
    talle: posiblesTalles,
    color: posiblesColores,
    precio: 1960,
    cantidad: 1
},
{
    id: "3",
    modelo: "Joey",
    img: "assets/WhatsApp Image 2021-10-14 at 13.57.07.jpeg",
    talle: posiblesTalles,
    color: posiblesColores,
    precio: 2100,
    cantidad: 1
},
{
    id: "4",
    modelo: "The Office",
    img: "assets/WhatsApp Image 2021-10-14 at 13.57.07 (1).jpeg",
    talle: posiblesTalles,
    color: posiblesColores,
    precio: 2300,
    cantidad: 1
}]

