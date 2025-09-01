var quantidade = document.getElementById('quantidade')
quantidade.addEventListener('change', ()=>{
    catchAll(quantidade.value)
})
catchAll(151)
function catchAll(quantidade){
fetch('https://pokeapi.co/api/v2/pokemon?limit='+quantidade,{method:'GET'})
.then(response => response.json())
.then((allpokemon) => {

    var pokemons = [];

    allpokemon.results.map((val)=>{
        
        fetch(val.url,{method:'GET'})
        .then(response => response.json())
        .then((pokemonSingle)=>{
            console.log(pokemonSingle)
            pokemons.push({nome:pokemonSingle.name, imagem: pokemonSingle.sprites.front_default, abilidade: pokemonSingle.abilities, dex: pokemonSingle.game_indices[3].game_index, exp: pokemonSingle.base_experience})
           
            if(pokemons.length == quantidade){
                //console.log(pokemons)
                var pokemonBoxes = document.querySelector('.pokemon-boxes')
                pokemonBoxes.innerHTML= ""
                pokemons.map(function(val){
                   pokemonBoxes.innerHTML+= 
                   `<div class="pokemon-box">
                    <img src="${val.imagem}" alt="${val.nome}">
                    <p>Nome: ${val.nome}</p>
                    <p>NationalDex: ${val.dex}</p>
                   

                    </div>`
                    
                   /* <div class="pokemon-box">
                    <img src="" alt="">
                    <p></p>
                    </div>*/
                })
            }
        })
    })
  
}
)
}
