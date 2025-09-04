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
           console.log(pokemonSingle)
            pokemons.push({nome:pokemonSingle.name, imagem: pokemonSingle.sprites.front_default, abilidade: pokemonSingle.abilities,  exp: pokemonSingle.base_experience})
           
            if(pokemons.length == quantidade){
                //console.log(pokemons)
                
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

    const pokesQ = 1003
    let found = 0
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
    // Pega o elemento do botão "Voltar ao topo" pelo seu ID
let mybutton = document.getElementById("back-to-top");

// Quando o usuário rolar a página para baixo 20px, mostre o botão
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// Quando o usuário clicar no botão, volte para o topo do documento
function scrollToTop() {
  document.body.scrollTop = 0; // Para navegadores Safari
  document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE e Opera
}
