const pokeapi = {}

function convertPokeApiDetailToPokemon (pokemonDetails) {
    const pokemon = new Pokemon();
    pokemon.number = pokemonDetails.id;
    pokemon.name = pokemonDetails.name;
    
    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;
    pokemon.types = types;
    pokemon.type = type;
    
    pokemon.photo = pokemonDetails.sprites.other.dream_world.front_default;
    
    const abilities = pokemonDetails.abilities.map((abilities) => abilities.ability.name);
    const [ability] = abilities;
    pokemon.abilities = abilities;
    pokemon.ability = ability;

    pokemon.weight = pokemonDetails.weight/10;

    pokemon.height = pokemonDetails.height/10;

    pokemon.baseExperience = pokemonDetails.base_experience

    return pokemon
}

pokeapi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url).
            then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeapi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
    .then((res) => res.json())
    .then((data) => data.results)
    .then((pokemons) => pokemons.map(pokeapi.getPokemonsDetail))
    .then((detailRequests) => Promise.all(detailRequests)) 
    .then((pokemonDetails) => pokemonDetails)
    .catch((error) => console.log('Error: ', error));
}