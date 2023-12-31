const url = 'https://pokeapi.co/api/v2/pokemon/'
const nombre = document.getElementById('name')
const boton = document.getElementById('search')
const borrar = document.getElementById('borrar')
const appNode = document.getElementById('app')

boton.addEventListener('click', insertar)
borrar.addEventListener('click', limpiar)

function insertar(){
    window.fetch(`${url}${nombre.value.toLowerCase()}`)
    .then(response =>{
        if(response.status === 200){
            return response.json()
        }else{
            alert('Upss!!! Pokemon no disponible, lo siento')
            alert('Intenta nuevamente')
        }
    })
    .then(responseJson => {
        const allItems =[]
        const result = []

        for (let info  in responseJson){
            result.push([info, responseJson[info]])
        }

        console.table(result)

        const pokeNombre = document.createElement('h2')
        pokeNombre.innerText = `Nombre: ${result[10][1]}`

        const pokeId = document.createElement('h3')
        pokeId.innerText = `id: ${result[6][1]}`

        const pokeImagen = document.createElement('img')
        pokeImagen.src = result[15][1].front_default

        const pokeTipo = document.createElement('h3')
        pokeTipo.innerText = `Tipo: ${result[17][1][0].type.name}`

        const pokeHabilidad = document.createElement('h3')
        pokeHabilidad.innerText = `Habilidad: ${result[0][1][0].ability.name}`

        const contenedor = document.createElement('section')
        contenedor.append(pokeNombre, pokeId, pokeImagen, pokeTipo, pokeHabilidad)


        allItems.push(contenedor)

        appNode.append(...allItems)
    })
}

function limpiar(){
    let allPokemon = appNode.childNodes
    allPokemon = Array.from(allPokemon)

    allPokemon.forEach(pokemons => {
        pokemons.remove(pokemons)
    })
}