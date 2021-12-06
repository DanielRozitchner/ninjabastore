//funcion eliminar productos del carrito y local storage
function eliminarEl() {
        $(".btn-remove").click(function() {
        let atributo = $(this).attr("data-id"); //obteniendo valor de id del producto a borrar
        let atributoSize = $(this).attr("data-size"); // obteniendo talle del producto a borrar
        let atributoColor = $(this).attr("data-color"); //obteniendo color del producto a borrar
        $(this).parent('td').parent('tr').remove(); //borrando producto del dom
        const laLista = JSON.parse(localStorage.getItem("listaProductos"));
        //localizando el index del producto a borrar dentro del array del storage segun los valores obtenidos
        const findId = laLista.findIndex(element => element.id == atributo && element.talle == atributoSize && element.color == atributoColor); 
        //condicion para evitar error en consola, la funcion se activaba 2 veces
        if (laLista[findId]){
        priceFind = laLista[findId].precio;
        sum = sum - priceFind;
        $("#total").html(`Total: $${sum.toFixed(2)}`);
        laLista.splice(findId, 1);
        arrayCarrito.splice(findId, 1);
        localStorage.setItem("listaProductos",JSON.stringify(laLista));
    
    checkCarrito(arrayCarrito, laLista);
        }
    })
}
//funcion con condicion para borrar html si no hay nada en el carrito o en el local storage
    function checkCarrito(listCarrito, storageCarrito) {
    if (!listCarrito.length && !storageCarrito.length) {
        $('.total').empty();
        $(".login").empty();
        $(".registroModal").empty();
		}
}


//confirmacion compra/ post de la compra y get simulando comprobante de compra obteniendo el id de la api
function confirmarCompra() {
const datosUsuario = {Nombre: $("#valorNombre").val(), Mail: $("#valorMail").val()};
$('#btnCon').hide();

    localStorage.setItem("Usuario", JSON.stringify(datosUsuario));

    
    const URLGET   = "https://jsonplaceholder.typicode.com/posts";

    const infoPost =  { Productos: JSON.stringify(localStorage.getItem("listaProductos")) , Precio: sum, Usuario: JSON.stringify(localStorage.getItem("Usuario"))};

    console.log(infoPost,); // console.log para simular la informacion que se envia a backend con los datos de la compra

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
    localStorage.setItem("Usuario",'[]');
    arrayCarrito = [];
    $('.carritoProducts').empty();
    $('.total').empty();
    $(".login").empty();
    $(".registroModal").empty();
    sum = 0;
}
//append de formulario
function registrarCompra() {
    $(".registroModal").empty();
    $(".registroModal").append(`<form>
    <label for="" id="labelUsuario" class="labelUsuario">
    <input type="text" placeholder="Nombre" id="valorNombre"></input>
    <label for="" id="labelMail" class="labelMail">
    <input type="email" placeholder="Email" id="valorMail"></input>
    <button type="reset" >Limpiar </button>
    <input type="submit" class="btn btn-danger btnConfirmar" id="btnCon" value="confirmar" />
    </form>`)

		$('.btnConfirmar').click(function(e) {
			e.preventDefault();
			validar();
		})
}
//parametros de validacion de inputs
const validateExp = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}
//validacion de parametros regex con inputs
function validar () {
	const valorNombre = $("#valorNombre").val();
	const valorMail = $("#valorMail").val();
	if (validateExp.nombre.test(valorNombre) && validateExp.mail.test(valorMail) ) {
		confirmarCompra();
	} else if (valorNombre == "" || valorMail == "") {
		Swal.fire({
				icon: 'error',
				title: 'Por favor, completar todos los datos',
		})
	} else {  
		Swal.fire({
				icon: 'error',
				title: 'Datos incorrectos',
		})
	}

}