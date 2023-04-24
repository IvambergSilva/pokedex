const pokemonList = document.querySelector('#pokemons')
const loadMoreButton = document.querySelector('#loadMoreButton')
const maxRecords = 151;
const card = document.querySelector('#card')

let limit = 30;
let offset = 0;

function loadPokemonsList(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type} ${pokemon.number}">
                <span class="number ${pokemon.number}">#${pokemon.number}</span>
                <span class="name ${pokemon.number}">${pokemon.name}</span>
                    <div class="detail ${pokemon.number}">
                        <ol class="types ${pokemon.number}">
                        ${pokemon.types.map((type) => `<li class="type ${type} ${pokemon.number}">${type}</li>`).join('')}
                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}" class="${pokemon.number}">
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

pokemonList.addEventListener('click', (e) => {      
    if (e.target.tagName != 'OL') {
        let classList = e.target.classList
        let idPokemon = classList[classList.length-1];
        openCard(idPokemon)
    }
})

function openCard(idPokemon) {
    card.style.display = 'block'
    cardMount(idPokemon)
    pokemonList.style.opacity = "0.2"
}

function closeCard() {
    document.querySelector('.arrowLeft').addEventListener('click', () => {
        card.style.display = 'none'
        card.innerHTML = ''
        pokemonList.style.opacity = "1"
    })
}

function cardMount(idPokemon) {
    pokeapi.getPokemons(0, idPokemon).then((pokemons) => {
        pokemons.map((id) => {
            if (idPokemon == id.number) {
                card.innerHTML = 
                `
                <div class="pokemonContainer ${id.type}">
                    <div class="arrowLeft">
                        <div></div> <div></div>
                    </div>
                    <div class="pokemonCard">
                        <span class="nameCard">${id.name}</span>
                        <span class="numberCard">#${id.number}</span>
                        <ol class="typesCard">
                            ${id.types.map((type) => `<li class="${type} typeCard">${type}</li>`).join('')}
                        </ol>
                    </div>
                    <div class="blockImg">
                        <img src="${id.photo}" alt="${id.name}" class="imgCard">
                    </div>
                    <aside>
                        <div class="details">
                            <ul>
                                <li>About</li>
                                <li>Base Stats</li>
                                <li>Evolution</li>
                                <li>Moves</li>
                            </ul>
                            <div>
                                <table>
                                    <tr>
                                        <td>Base Experience</td>
                                        <td>${id.baseExperience}</td>
                                    </tr>
                                    <tr>
                                        <td>Height</td>
                                        <td>${id.height} cm</td>
                                    </tr>
                                    <tr>
                                        <td>Weight</td>
                                        <td>${id.weight} kg</td>
                                    </tr>
                                    <tr>
                                        <td>Abilities</td>
                                        ${`
                                        <td class="type">${id.abilities[0]}
                                        </td>`}
                                        ${
                                        `<td class="type">${id.abilities[1]}</td>`
                                        }
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </aside>
                </div>
                `
            }
        })
        closeCard()
    })    
}
