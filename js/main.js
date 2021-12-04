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
                    <td class='price-market'>$${almacen.precio}</td>
                    <td>
                        <input type="number" class='qty-market' value=${almacen.cantidad} style="width: 2em"></input>
                    </td>
                    <td>
                        <button data-id= ${almacen.id}  class= "btn btn-remove btn-danger btn-small">
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
let locatePos;
let sizeLocation;
let colorLocation;


const agregarAlCarrito = productoSeleccionado => {
    const productoAgregado = {
        ...productoSeleccionado, // spread operator
        talle: document.querySelector(`#talleSeleccionado-${productoSeleccionado.id}`).value,
        color: document.querySelector(`#colorSeleccionado-${productoSeleccionado.id}`).value
    }
    const laLista = JSON.parse(localStorage.getItem("listaProductos"));
    
    if (!arrayCarrito.length && laLista){
        arrayCarrito = laLista;
    }

    let located = arrayCarrito.filter(prod => prod.id == productoAgregado.id && prod.talle == productoAgregado.talle && prod.color == productoAgregado.color);
debugger;
    if (!located.length || productoAgregado.talle != located[0].talle || productoAgregado.color != located[0].color)  {
        
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
        <td class='price-market-${productoAgregado.id}-${productoAgregado.talle}-${productoAgregado.color}' id= "precio-${productoAgregado.id}">$${productoAgregado.precio}</td>
        <td><input type="number" value=1 class="qty-market-${productoAgregado.id}-${productoAgregado.talle}-${productoAgregado.color}" quant-${productoAgregado.id}" style="width: 2em"></input></td>
        <td>
            <button data-id= ${productoAgregado.id}  class= "btn btn-remove btn-danger btn-small ${productoAgregado.id}">
                <i class="bi bi-trash-fill"></i>
            </button>
        </td>
        </tr>`)
    sum += parseFloat(productoAgregado.precio);
    locatePos = arrayCarrito.findIndex(p => p.id == productoAgregado.id);
    // sizeLocation = arrayCarrito[locatePos].talle;
    // colorLocation = arrayCarrito[locatePos].color;
    }
    else{
        for (let i = 0; i < arrayCarrito.length; i++) {
           if (productoAgregado.id == arrayCarrito[i].id && productoAgregado.talle == arrayCarrito[i].talle && productoAgregado.color == arrayCarrito[i].color){ 
            
            cantidad = arrayCarrito[i].cantidad += 1;
            subPrecio = arrayCarrito[i].precio += parseFloat(productoAgregado.precio);
            localStorage.setItem("listaProductos", JSON.stringify(arrayCarrito));  
        }
    }
                // locatePos = arrayCarrito.findIndex(p => p.id == productoAgregado.id);

        $(`#precio-${productoAgregado.id}`).text(`$${subPrecio}`);
        
    //    $(`#quant-${productoAgregado.modelo}`).val(cantidad);
        
        $(`.quant-${productoAgregado.id}`).value = cantidad;
        $(`.price-market-${productoAgregado.id}-${productoAgregado.talle}-${productoAgregado.color}`).html(subPrecio);
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
    

/* SECCION USUARIO */

// const inputs = ["nombreApellido","mail"]
// const labels =  ["Nombre y apellido", "Correo"]
// const places = ["Nombre completo","Ingrese su correo"]
// /* ACA VAN A IR LOS NUEVOS USUARIOS */
// let usuarios=[]

// $("#usuarioBoton").click(function(){
    
//     for(const inputsNames of inputs){ 
        
//         $("#formularioUsuario").append(`
//         <label for="" id="labelUsuario" class="labelUsuario">
//             ${labels[i]}           
//             <input type="text"  placeholder=${places[i]} class="inputUsuario" name = ${inputsNames} id="${inputsNames}"></input>
//         </label>`)
//         i = i+1;
//     }
//     $("#formularioUsuario").append(`
//         <button  type="submit" id="registro"> Registrarse </button>
//         <button type="reset" >Limpiar </button>
//     `)
    



//     const form = document.getElementById("formularioUsuario")
//     /* Funcion que toma el boton de envio */

//     /* USUARIO REGISTRADO? */

//     let uRegistrado = false

    // form.addEventListener("submit",(e)=>{
    //     e.preventDefault(); 
//         if ((inputsLlenados.nombreApellido === true ) && (inputsLlenados.nombreUsuario === true ) && (inputsLlenados.gmail === true) && (inputsLlenados.clave === true ) && (inputsLlenados.claveVerificada === true )){
//             swal.fire({
//                 icon: 'success',
//                 title: 'Se a registrado con exito!',
//             });
//             /* Creacion de usuarios */
//             usuarios.push(usuarioTerminado)
//             console.log(usuarios)
//             localStorage.setItem("usuario",JSON.stringify(usuarios))

            

//             /* resetea el form */
//             form.reset()

//             uRegistrado = true

//         }else{
            
//             swal.fire({

//                 icon: 'error',
//                 title: 'Rellene los campos faltantes',

//             });
            
//         }
//     })

// })

// /* Expresiones */
// const expresiones = {
//     nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
// 	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
// 	contra: /^.{4,12}$/, // 4 a 12 digitos.
// 	gmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
// }

// /* Los inputs estan definidos como false al principio para que no pueda ser enviado el formulario de una */
// const inputsLlenados=[nombre = false, mail = false]
// class user {
//     constructor(nC,nDU,c,c1,c2) {
//         this.nombreCompleto = nC;
//         this.nombreDeUsuario = nDU;
//         this.correo = c;
//         this.contra1 = c1;
//         this.contra2 = c2;

//     }
// }



// const validarForm = (e) => {
//     let datosUsuario
//     switch (e.target.name) {
//         case "nombreApellido":{

//             validar(expresiones.nombre,e,"nombreApellido",nombreApellido)
//             let name =e.target.value
//             console.log(name)
//             datosUsuario= new user (name,"hola","","","")
//             usuarios.push(datosUsuario)
//             break
//         }
//         case "gmail":{

//             validar(expresiones.gmail,e,"gmail")



//             break
//         }
//     }
//             if (clave2.value !== clave1.value ) {

//                 /* Validacion Incorrecta */
//                 document.getElementById("claveVerificada").classList.remove("formVacio")
//                 document.getElementById("claveVerificada").classList.remove("formCorrecto")
//                 document.getElementById("claveVerificada").classList.add("formMal")
//                 inputsLlenados.claveVerificada = false;
                    
 
//             }else if (clave2.value == " ") {
//                 /* Validacio Vacia */
//                 console.log("Estoy vacio")
//                 document.getElementById("claveVerificada").classList.remove("formCorrecto")
//                 document.getElementById("claveVerificada").classList.remove("formMal")
//                 document.getElementById("claveVerificada").classList.add("formVacio")
//                 inputsLlenados.claveVerificada = false;
                

//             }else if (clave2.value === clave1.value ){

//                 /* Validacion correcta */
//                 document.getElementById("claveVerificada").classList.remove("formMal")
//                 document.getElementById("claveVerificada").classList.remove("formVacio")
//                 document.getElementById("claveVerificada").classList.add("formCorrecto")
//                 inputsLlenados.claveVerificada = true;
//             }

//             break

//     }
//     console.log(datosUsuario)
//     console.log(usuarios)





// /* FUNCION DE VALIDACION */

// function validar (expresion,evento,campos){
//     if (expresion.test(evento.target.value)){
//         /* Validacion correcta */

//         document.getElementById(campos).classList.remove("formMal");
//         document.getElementById(campos).classList.remove("formVacio");
//         document.getElementById(campos).classList.add("formCorrecto");
//         inputsLlenados[campos] = true;       

//     }else if (evento.target.value == "") {
//         /* Validacio Vacia */
//         console.log("Estoy vacio")
//         document.getElementById(campos).classList.remove("formCorrecto")
//         document.getElementById(campos).classList.remove("formMal")
//         document.getElementById(campos).classList.add("formVacio")
//         inputsLlenados[campos]=false;

//     } else {
//         /* Validacion Incorrecta */
//         document.getElementById(campos).classList.remove("formVacio")
//         document.getElementById(campos).classList.remove("formCorrecto")
//         document.getElementById(campos).classList.add("formMal") 
//         inputsLlenados[campos]=false;

//     }
// }

