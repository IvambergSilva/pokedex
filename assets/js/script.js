const pokemonList = document.querySelector('#pokemons')
const loadMoreButton = document.querySelector('#loadMoreButton')
const maxRecords = 151

let limit = 50;
let offset = 0;

function loadPokemonsList(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
            </li>
        `).join('')
    })
}

loadPokemonsList(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    
    const qtRecordWithNextPage = offset + limit

    if (qtRecordWithNextPage >= maxRecords) {    
        const newLimt = maxRecords - offset
        loadPokemonsList(offset, newLimt)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonsList(offset, limit)
    }
})