const baseURLNew = 'https://pokeapi.co/api/v2/pokemon/';

const url2 = 'https://pokeapi.co/api/v2/pokemon-species/';
const gifnormal = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/'
const gifshyne = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/'

const imagemNormal = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
const imagemShyne =  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/'



let data;
let i =1;

let cont = 1;
var total = 1000//1009;

const GetPokemon = async(pokemon) => {
    const Response = await fetch(baseURLNew+pokemon+'?fields=name,types')
    const data = await Response.json();
    console.log(Response)
      if (data.sprites.versions['generation-v']['black-white']['animated']['front_default']) {
        //const spriteUrl = data.sprites.versions['generation-v']['black-white']['animated']['front_default'];
        //const spriteShiny = data.sprites.versions['generation-v']['black-white']['animated']['front_shiny'];
        const spriteGifNormal = gifnormal + cont + '.gif'
        const spriteGifShiny = gifshyne + cont + '.gif'
        const spriteNormal = imagemNormal + cont + '.png'
        const spriteShiny = imagemShyne + cont + '.png'
        mostrar(data,spriteGifNormal,spriteGifShiny,spriteNormal,spriteShiny);
      }else{
        const spriteNormal = imagemNormal + cont + '.png'
        const spriteShiny = imagemShyne + cont + '.png'
        mostrar(data,'','',spriteNormal,spriteShiny)
      }
    if (cont == total){
        EventoClick()
    }
    cont += 1
}

function PopularRegioes(){
    let RegiaoTipo;
    if (cont < 152){
        RegiaoTipo = 'kanto'
        return RegiaoTipo
    }else if(cont < 252){
        RegiaoTipo = 'johto'
        return RegiaoTipo
    }else if(cont <= 387){
        RegiaoTipo = 'hoenn'
        return RegiaoTipo
    }else if(cont <= 494){
        RegiaoTipo = 'sinnoh'
        return RegiaoTipo
    }else if(cont <= 650){
        RegiaoTipo = 'unova'
        return RegiaoTipo
    }else if(cont <= 722){
        RegiaoTipo = 'kalos'
        return RegiaoTipo
    }else if(cont <= 810){
        RegiaoTipo = 'alola'
        return RegiaoTipo 
    }else if(cont <= 899){
        RegiaoTipo = 'galar'
        return
    }else if(cont <= 1009){
        RegiaoTipo = 'paldea'
        return RegiaoTipo
    }
    
}

function mostrar(data,spriteUrl,spriteShiny,imagemnormal,imagemShyne){

    const name = data.name;
    const pokemon = document.createElement('div');
    pokemon.classList.add('pokemon'); //Adicionando a class pokemon ao div. Ex.: <div class = 'pokemon'></div>
    const reg = PopularRegioes()
    pokemon.classList.add(reg);
    pokemon.setAttribute('id',cont)                           //A classe pokemon está definida no arquivo app.css
    //pokemon.style.display = 'none'
    //Criando um elemento <span>
    const rotulo = document.createElement('span');
    rotulo.innerText = (name); //Colocando o número do pokemon ao no texto do <span> criado.


    const divtypes = document.createElement('div');
    divtypes.classList.add('types')
    let a = data.types.length

    data.types.forEach(container =>{
        a -= 1
        if (a == 1){
            let types2 = document.createElement('h1');
            types2.innerText = (container.type.name)
            types2.classList.add('estilo');
            divtypes.appendChild(types2);
            types2.setAttribute('id',container.type.name)   
        }else{
            let types = document.createElement('h1');
            types.innerText = (container.type.name)
            types.classList.add('estilo');
            types.setAttribute('id',container.type.name)   
            divtypes.appendChild(types);
        }

    })
    //Criando um elemento <img>
    const novaImg = document.createElement('img');
    novaImg.src =spriteUrl; //Atribuindo o endereço e o nome do arquivo de imagem no atributo src do <img> criado.
    novaImg.style.display = 'none';
    novaImg.setAttribute('id','GifNormal')  

    const shyne = document.createElement('img');
    shyne.src = spriteShiny; //Atribuindo o endereço e o nome do arquivo de imagem no atributo src do <img> criado.
    shyne.style.display = 'none';
    shyne.setAttribute('id','GifShyne') 

    const imagemPokemon = document.createElement('img');
    imagemPokemon.src = imagemnormal
    imagemPokemon.style.display = 'block';
    imagemPokemon.setAttribute('id','ImagemNormal')  

    const imagemShynePokemon = document.createElement('img');
    imagemShynePokemon.src = imagemShyne
    imagemShynePokemon.style.display = 'none';
    imagemShynePokemon.setAttribute('id','ImagemShyne')  

    //Adicionando a imagem e o rótulo ao <div> criado
    pokemon.appendChild(imagemPokemon);
    pokemon.appendChild(imagemShynePokemon);
    pokemon.appendChild(novaImg);
    pokemon.appendChild(shyne);
    pokemon.appendChild(rotulo);
    pokemon.appendChild(divtypes);
   

    //Adicionando o <div> à página
    document.body.appendChild(pokemon);
    document.getElementById('allpokemons').appendChild(pokemon)

}

const popular = async(pokemon2) => {
    const data = await GetPokemon(pokemon2);

}


while (i < total) { //max de 1010

    popular(i);
    i++;
}

function EventoClick(){
    // var pokemonDivs = document.querySelectorAll('.pokemon');

    // pokemonDivs.forEach(function(div) {
    // div.addEventListener('click', function() {
    //     // Extract the ID of the clicked div
    //     var pokemonId = this.id;
    //     // Redirect to the new page with the ID as a parameter
    //     window.location.href = 'spec.html?id=' + pokemonId;
    // });
    // });
}

