//Variables

let carrito = document.querySelector('#carrito');

let productosCarrito = document.querySelector('#lista-carrito tbody');

let listaCursos = document.querySelector('#lista-cursos');

let botonVaciarCarrito = document.querySelector('#vaciar-carrito');

let agregarCarrito = [];

// Agregando cursos al carrito

cargarEventListener();

function cargarEventListener () {
    listaCursos.addEventListener('click', agregarCursos);
    
    carrito.addEventListener('click', eliminarCurso);

    botonVaciarCarrito.addEventListener('click', () => {
        agregarCarrito = [];
        carritoHTML();
    });
}

function agregarCursos (e) {
    event.preventDefault(e);
    if(e.target.classList.contains('agregar-carrito')){
        let cursoSeleccionado = e.target.parentElement.parentElement;
        curso(cursoSeleccionado);
}
}

// Eliminar Cursos

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        let idCurso= e.target.getAttribute('data-id');

        agregarCarrito = agregarCarrito.filter(curso => curso.id !== idCurso);
        carritoHTML();
    }
}

// Creando objeto con informacion del Curso



 function curso (cursoX) {
     let infoCurso = {
         imagen: cursoX.querySelector('img').src,
         precio: cursoX.querySelector('.precio span').textContent,
         titulo: cursoX.querySelector('h4').textContent,
         id: cursoX.querySelector('a').getAttribute('data-id'),
         cantidad: 1,
     }
     //Revisa si un elemento ya existe en el carrito
     let existe = agregarCarrito.some(curso => curso.id === infoCurso.id)
     if(existe){
         //Actualizamos la cantidad
         let cursos = agregarCarrito.map(curso => {
         if(curso.id === infoCurso.id){
            curso.cantidad++;
            return curso;
         } else {
            return curso;
         }});
         agregarCarrito = [...cursos];
     } else {
         //Agrega elementos al arreglo del carrito
        agregarCarrito = [...agregarCarrito, infoCurso ];
     }

    carritoHTML();
 }

 //Agragar HTML al carrito

 function carritoHTML(){

    //Limpiar HTML 
    limpiarHTML();
    //Recorre el carrito y genera HTML
     agregarCarrito.forEach( curso => {
         const lista = document.createElement('tr');
         lista.innerHTML = `
         <td>
                <img src= "${curso.imagen}" width = 150px
         </td>;
         <td>
            ${curso.titulo}
         </td>
         <td>
            ${curso.precio}
        </td>
        <td>
            ${curso.cantidad}
        </td>
        <td>
            <a href="#" class= "borrar-curso" data-id= "${curso.id}"> X </a>
        </td>
         `;

         //Agrega el producto en el carrito
         productosCarrito.appendChild(lista);
     })
 }

 function limpiarHTML () {
     productosCarrito.innerHTML = ('');
 }








