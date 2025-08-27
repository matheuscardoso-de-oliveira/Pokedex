fetch('https://pokeapi.co/api/v2/pokemon?limit=10',{method:'GET'})
.then(response => response.json())
.then(allpokemon => console.log(allpokemon))