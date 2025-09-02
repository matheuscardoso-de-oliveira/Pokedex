var quantidade = document.getElementById('quantidade')
var texto = " ";
var pokemonBoxes = document.querySelector('.pokemon-boxes')

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

                    texto+= `</p> 
                    </div> 
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

function pesquisar(){
    var searchBox = document.getElementById('sPoke').value

    var pokesQ = 1003
    if(!searchBox){
        pokemonBoxes.innerHTML=     ''
        pokemonBoxes.innerHTML+= 'Nada foi digitado'
        return;
       }
    fetch('https://pokeapi.co/api/v2/pokemon?limit='+pokesQ,{method:'GET'})
    .then(response => response.json())
    .then((allpokemon) => {
    
        var pokemons = [];
        var texto = " ";
    
        allpokemon.results.map((val)=>{
            
            fetch(val.url,{method:'GET'})
            .then(response => response.json())
            .then((pokemonSingle)=>{
               // console.log(pokemonSingle)
                pokemons.push({nome:pokemonSingle.name, imagem: pokemonSingle.sprites.front_default, abilidade: pokemonSingle.abilities,  exp: pokemonSingle.base_experience})
               
                if(pokemons.length == pokesQ){

                    //console.log(pokemons)
                    var pokemonBoxes = document.querySelector('.pokemon-boxes')
                    pokemonBoxes.innerHTML= ""
                    pokemons.map(function(val){
                     
                        if(val.nome.includes(searchBox.toLowerCase())){
                        texto = `<div class="pokemon-box">
                        <img src="${val.imagem}" alt="${val.nome}">
                        <div class="items">
                        <p>Nome: ${val.nome}</p>
                        
                        <p>Habilidades: 
                        `
                       val.abilidade.map((abi)=>{
                       texto += `${abi.ability.name} `
                       })
    
                        texto+= `</p> 
                        </div> 
                        </div>`
                        pokemonBoxes.innerHTML+= texto
                        texto = ""
                       /* <div class="pokemon-box">
                        <img src="" alt="">
                        <p></p>
                        </div>*/
                        }
                    })
                
                }
            })
        })
      
    }
    )
    }
    function reset(){
        catchAll(151)
    }
    