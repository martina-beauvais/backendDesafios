class Usuario{
    constructor(nombre, apellido, libros = [], mascotas = []){
        this.nombre = nombre, 
        this.apellido = apellido, 
        this.libros = libros,
        this.mascotas = mascotas
    }
    getFullName(){
        return(`El nombre del usuario es ${this.nombre} ${this.apellido}`)
    }
    addMascotas(nombre){
        this.mascotas.push(nombre);
        void this.mascotas
    }
    countMascotas(){
        return (` ${this.nombre} tiene ${this.mascotas.length} mascotas`)
    }
    addBooks(titulo, autor){
        this.libros.push({titulo: titulo, autor: autor})
        void this.libros
    }
    getBooks(){
        let tituloLibro = [];
        this.libros.forEach(libro => tituloLibro.push(libro.titulo));
        return tituloLibro
    }
}
// --- Se crean dos nuevos usuarios ---
// taylor's section ---
const taylor = new Usuario('Taylor', 'Carpenter', [] ,['Conejo', 'Gato']) 

console.log(taylor.getFullName())
taylor.addBooks('Caraval', 'Stephanie Garber')
console.log(taylor.getBooks())
taylor.addMascotas('Gato')
console.log(taylor.countMascotas())
console.log(taylor)

// sabrina's section ---
const sabrina = new Usuario('Sabrina', 'Orlando', [], ['Perro'])

sabrina.addBooks('Legendary', 'Stephanie Garber')
sabrina.addBooks('Finale', 'Stephanie Garber')
console.log(sabrina.getFullName())
console.log(sabrina.getBooks())
sabrina.addMascotas('Gato')
console.log(sabrina.countMascotas())
console.log(sabrina)