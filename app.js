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
            pokemons.push({nome:val.name, imagem: pokemonSingle.sprites.front_default})
            if(pokemons.length == quantidade){
                //console.log(pokemons)
                var pokemonBoxes = document.querySelector('.pokemon-boxes')
                pokemonBoxes.innerHTML= ""
                pokemons.map(function(val){
                   pokemonBoxes.innerHTML+= 
                   `<div class="pokemon-box">
                    <img src="${val.imagem}" alt="${val.nome}">
                    <p>${val.nome}</p>
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
