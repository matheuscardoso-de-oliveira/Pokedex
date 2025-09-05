// Global variables
const pokemonBoxes = document.querySelector('.pokemon-boxes');
const quantidadeInput = document.getElementById('quantidade');
const searchInput = document.getElementById('sPoke');
let pokemons = [];

// Event listeners
if (quantidadeInput) {
    quantidadeInput.addEventListener('change', () => {
        const count = parseInt(quantidadeInput.value, 10);
        if (!isNaN(count)) {
            renderPokemons(pokemons.slice(0, count));
        }
    });
}

if (searchInput) {
    // Using 'input' event for real-time search
    searchInput.addEventListener('input', () => {
        searchPokemons(searchInput.value);
    });
}

// Initial data fetch
window.addEventListener('load', () => {
    fetchAllPokemons();
});

// Resets the view to the initial state
function reset() {
    renderPokemons(pokemons.slice(0, 151));
}

// Fetches all Pokémon data from the API
async function fetchAllPokemons() {
    try {
        pokemonBoxes.innerHTML = 'Loading Pokémon...';
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const allpokemon = await response.json();

        const promises = allpokemon.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
        });

        const detailedPokemons = await Promise.all(promises);
        pokemons = detailedPokemons.map(p => ({
            nome: p.name,
            imagem: p.sprites.front_default,
            habilidades: p.abilities,
            exp: p.base_experience,
            types: p.types
        }));

        renderPokemons(pokemons.slice(0, 151)); // Render initial 151
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        pokemonBoxes.innerHTML = 'Failed to load Pokémon. Please try again later.';
    }
}

// Renders the provided list of Pokémon to the DOM
function renderPokemons(pokemonList) {
    if (pokemonList.length === 0) {
        pokemonBoxes.innerHTML = '<p>No Pokémon found.</p>';
        return;
    }

    pokemonBoxes.innerHTML = pokemonList.map(pokemon => `
        <div class="pokemon-box">
            <img src="${pokemon.imagem}" alt="${pokemon.nome}">
            <div class="items">
                <p>Name: ${pokemon.nome}</p>
                <p>Types: ${pokemon.types.map(t => t.type.name).join(' ')}</p>
                <p>Abilities: ${pokemon.habilidades.map(a => a.ability.name).join(' ')}</p>
            </div>
        </div>
    `).join('');
}

// Filters and renders Pokémon based on search query
function searchPokemons(query) {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) {
        renderPokemons(pokemons.slice(0, 151));
        return;
    }

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.nome.includes(searchTerm)
    );

    renderPokemons(filteredPokemons);
}
    
let mybutton = document.getElementById("back-to-top");


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}


function scrollToTop() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}
