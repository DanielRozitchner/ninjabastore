function eliminarEl() {
    $(".btn-remove").click(function() {
    
    let atributo = $(this).attr("data-id");
    $(this).parent('td').parent('tr').remove();
    const laLista = JSON.parse(localStorage.getItem("listaProductos"))
    const finder = laLista.findIndex(element => element.id === atributo);
    priceFind = laLista[finder].precio;
    sum = sum - priceFind;
    $("#total").html(`Total: $${sum.toFixed(2)}`);
    laLista.splice(finder, 1);
    arrayCarrito.splice(finder, 1);
    localStorage.setItem("listaProductos",JSON.stringify(laLista));
		
    checkCarrito(arrayCarrito, laLista);
})
}
function checkCarrito(listCarrito, storageCarrito) {
    if (!listCarrito.length && !storageCarrito.length) {
        $('.total').empty();
        $(".login").empty();
		}
}

function confirmarCompra() {
const datosUsuario = {Nombre: $("#valorNombre").val(), Mail: $("#valorMail").val()};
$('#btnCon').hide();

    localStorage.setItem("Usuario", JSON.stringify(datosUsuario));

    
    const URLGET   = "https://jsonplaceholder.typicode.com/posts";

    const infoPost =  { Productos: JSON.stringify(localStorage.getItem("listaProductos")) , Precio: sum, Usuario: JSON.stringify(localStorage.getItem("Usuario"))};

    console.log(infoPost,);

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

// const datosRegistro=[nombre = false, mail = false]

const validateExp = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

function validar () {
	const valorNombre = $("#valorNombre").val();
	const valorMail = $("#valorMail").val();
	if (validateExp.nombre.test(valorNombre) && validateExp.mail.test(valorMail) ) {
		confirmarCompra();
	} else if (valorNombre == "" || valorMail == "") {
		Swal.fire({
				icon: 'error',
				title: 'Por favor, completar todos los datos',
				timer: 3000
		})
	} else {  
		Swal.fire({
				icon: 'error',
				title: 'Datos incorrectos'
		})
	}

}