fetch('https://pokeapi.co/api/v2/pokemon?limit=10',{method:'GET'})
.then(response => response.json())
.then((allpokemon) => {

    var pokemons = [];

    allpokemon.results.map((val)=>{
        fetch(val.url,{method:'GET'})
        .then(response => response.json())
        .then((pokemonSingle)=>{
            pokemons.push({nome:val.name, imagem: pokemonSingle.sprites.front_default})
            if(pokemons.length == 10){
                console.log(pokemons)
            }
            
        })



    })

}

)
