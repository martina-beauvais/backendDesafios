export function getTimestamp(){
    return (`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}-${new Date().toLocaleTimeString('es-AR')}`);
}

export function checkLength(arr){
    if (arr.length === 0){
        console.error('El array esta vacio')
        return false
    }
    return true
}

export function checkID(product, arr){
    arr.forEach(element => { // Por cada elemento del array
        if(element.id == product.id){ // Si existe un elemento con el mismo id del producto nuevo
            console.warn('El id del elemento ya existe, se le asignara uno nuevo.')
            return newID(arr, product) // Ejecutamos newId
        } 
    });
        return product.id
}
export function newID(arr, product=false){
    if(product){ // Si el producto llega ...
        arr.sort((a, b) => {return a - b}) // Ordenamos de forma ascendente segun el id
        product.id = parseInt(arr[arr.length - 1].id) + 1 // Tomamos el id mas grande le sumamos 1 y lo asignamos al producto
        return product.id
    }
    return parseInt(arr[arr.length - 1].id) + 1
}



export function onAdd(valor){
    if(valor < 1){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            background: '#FACE4D',
            color: 'black',  
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: false,
        })
        Toast.fire({
            icon: 'error',
            title: 'Debes añadir por lo menos 1 producto'
        });
    }else{
        addToCart(products, valor)
        Swal.fire(`${valor} Producto(s) añadido(s)`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: false,
            });
            setValor(false)
    }
}
