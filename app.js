var quantidade = document.getElementById('quantidade')
quantidade.addEventListener('change', ()=>{
    catchAll(quantidade.value)
})
catchAll(151)
function catchAll(quantidade){
fetch('https://pokeapi.co/api/v2/pokemon?limit='+1000,{method:'GET'})
.then(response => response.json())
.then((allpokemon) => {

    var pokemons = [];
    var texto = " ";

    allpokemon.results.map((val)=>{
        
        fetch(val.url)
        .then(response => response.json())
        .then((pokemonSingle)=>{
           // console.log(pokemonSingle)
            pokemons.push({nome:pokemonSingle.name, imagem: pokemonSingle.sprites.front_default, abilidade: pokemonSingle.abilities,  exp: pokemonSingle.base_experience})
           
            if(pokemons.length == quantidade){
                //console.log(pokemons)
                var pokemonBoxes = document.querySelector('.pokemon-boxes')
                pokemonBoxes.innerHTML= ""
                pokemons.map(function(val){
                   
                   
                    texto = `<div class="pokemon-box">
                    <img src="${val.imagem}" alt="${val.nome}">
                    <div class="items">
                    <p>Nome: ${val.nome}</p>
                    <p>Habilidades: 
                    `
                   val.abilidade.map((abi)=>{
                   texto += `${abi.ability.name} `
                   })

                    texto+= ` </div> 
                    </div>`
                    pokemonBoxes.innerHTML+= texto
                    texto = ""
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
