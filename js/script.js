const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}
//tem que ser assincrono, pois não se sabe quanto tempo o fetch vai demorar

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "loading...";
    const data = await fetchPokemon(pokemon);
    if(data){
        searchPokemon = data.id;
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = searchPokemon;
        pokemonImage.src = data.sprites.versions['generation-v']['black-white']['animated']['front_default'];
        input.value = "";
    } else{
        pokemonName.innerHTML = "pokemon not found";
        pokemonNumber.innerHTML = "";
    }
    
}

form.addEventListener('submit', () => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon--;
        renderPokemon(searchPokemon);
    }
})

btnNext.addEventListener('click', () => {
    searchPokemon++;
    renderPokemon(searchPokemon);
})

renderPokemon(searchPokemon);
