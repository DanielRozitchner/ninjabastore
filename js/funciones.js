function eliminarEl() {
    $(".btn-remove").click(function() {
    
    let atrib = $(this).attr("data-id");
    $(this).parent('td').parent('tr').remove();
    const laLista = JSON.parse(localStorage.getItem("listaProductos"))
    const finder = laLista.findIndex(element => element.id === atrib);
    priceFind = laLista[finder].precio;
    console.log(priceFind);
    sum = sum - priceFind;
    $("#total").html(`Total: $${sum.toFixed(2)}`);
    laLista.splice(finder, 1);
    arrayCarrito.splice(finder, 1);
    localStorage.setItem("listaProductos",JSON.stringify(laLista));
    
})
}

    
    


// function eliminarEl(i) {
//     $(this).parent('td').parent('tr').remove();
//     const laLista = JSON.parse(localStorage.getItem("listaProductos"))
//     const finder = laLista.findIndex(element => element.id === i);
//     priceFind = laLista[finder].precio;
//     sum = sum - priceFind;
//     $("#total").html(`Total: $${sum.toFixed(2)}`);
//     laLista.splice(finder, 1);
//     arrayCarrito.splice(finder, 1);
//     localStorage.setItem("listaProductos",JSON.stringify(laLista));
// }