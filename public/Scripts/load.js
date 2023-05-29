const url = 'https://pokeapi.co/api/v2/pokemon/';
const urlgif = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/'

const kantoList = Array.from({length: 151}, (_, index) => index + 1);

const johtoList = Array.from({length: 100}, (_, index) => index + 152);

const hoennList = Array.from({length: 135}, (_, index) => index + 252);

const sinnohList = Array.from({length: 107}, (_, index) => index + 387);

const unovaList = Array.from({length: 156}, (_, index) => index + 494);

const kalosList = Array.from({length: 72}, (_, index) => index + 650);

const alolaList = Array.from({length: 88}, (_, index) => index + 722);

const galarList = Array.from({length: 85}, (_, index) => index + 810);

const paldeaList = Array.from({length: 103}, (_, index) => index + 906);

let popregi = ['kanto']

const kantoID = 1;
const johtoID = 2;
const hoennID = 3;
const sinnohID = 4;
const unovaID = 5;
const kalosID = 6;
const alolaID = 7;
const galarID = 8;
const paldeaID = 9;

const headers = new Headers();
headers.append('Accept-Encoding', 'gzip');

function pop(lista,mode,regiao){
Promise.all(
  lista.map(id =>
    
    fetch(`${url}${id}`, { headers }).then(response =>
      response.arrayBuffer().then(buffer => {
        const decoded = new TextDecoder('utf-8').decode(
          new Uint8Array(buffer)
        );
        const data = JSON.parse(decoded);
        delete data.moves;
        delete data.game_indices;
        delete data.held_items;
        delete data.forms
        delete data.location_area_encounters
        return data;
      })
    )
  )

).then(pokemons => {

  const regi = document.createElement('div');
  regi.classList.add(regiao)
  regi.classList.add('regioes')
  const Regid = eval(regiao+'ID');
  regi.setAttribute('id',Regid)
  regi.style.display = 'none'
  for (let i = 0; i < pokemons.length; i++) {
    const retorno = mostrar(pokemons[i],regiao)
    regi.appendChild(retorno)
  }
  
  document.getElementById('allpokemons').appendChild(regi)
  if (mode == 'insert'){
   regiaochange(regiao)
  }
  OrdenarNum(regiao)
  EventoClick()
});
}

pop(kantoList,'insert','kanto');

function regiao(Tiporegiao){
  if (!popregi.includes(Tiporegiao)){
    const variavel = eval(Tiporegiao+'List');
    pop(variavel,'insert',Tiporegiao);
    popregi.push(Tiporegiao)
  }else{
    regiaochange(Tiporegiao)
  }
}

function regiaochange(Tiporegiao){
  const pokemons = document.querySelector('.'+Tiporegiao);
  const estilo = pokemons.style.display;
  let regiaostyle;
  if (estilo == 'none'){
      regiaostyle = 'grid'
  }else{
      regiaostyle = 'none'
      
  }
  pokemons.style.display = regiaostyle
}

function OrdenarNum(regiao){
  const divs = Array.from(document.querySelectorAll(".regioes"));
  divs.sort((a, b) => a.id - b.id);
  const container = document.querySelector("#allpokemons");
  divs.forEach(div => container.appendChild(div));
}

function mostrar(data,regiao,divregiao){

  const name = data.name;
  //div do pokemon
  const id = data.id;
  const pokemon = document.createElement('div');
  pokemon.classList.add('pokemon'); 
  
  pokemon.setAttribute('id',id)  //setando o id do pokemon como o id da classe
  
  const rotulo = document.createElement('span');
  rotulo.innerText = (name); 
  rotulo.classList.add('name')
  rotulo.setAttribute('id',name)

  //Tipos do pokemon(fogo,agua,etc)
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
  const GifNormal = document.createElement('img');
  const GifShiny = document.createElement('img');
  const imagemPokemon = document.createElement('img');
  const imagemShinyPokemon = document.createElement('img');

  //Gif pokemon(caso nao tenha gif coloca a imagem normal)
  if (id <= 920){
    imagens(GifNormal,urlgif+id+'.gif','GifNormal')
    imagens(GifShiny,urlgif+'shiny/'+id+'.gif','GifShiny')
  }else{
    imagens(GifNormal,data.sprites['other']['official-artwork']['front_default'],'GifNormal')
    if (data.sprites['front_shiny']){
      imagens(GifShiny,data.sprites['other']['official-artwork']['front_shiny'],'GifShiny')
    }else{
      imagens(GifShiny,data.sprites['other']['official-artwork']['front_default'],'GifShiny')
    }
  }
  if (data.sprites['other']['official-artwork']['front_shiny']){
    imagens(imagemShinyPokemon,data.sprites['other']['official-artwork']['front_shiny'],'ImagemShiny')
  }else{
    imagens(imagemShinyPokemon,data.sprites['front_default'],'ImagemShiny')
  }
  //Imagem pokemon
  //linkimg
  imagemPokemon.src = data.sprites['other']['official-artwork']['front_default']
  imagemPokemon.style.display = 'block';
  imagemPokemon.setAttribute('id','ImagemNormal')  

  //Adicionando a imagem e o rótulo ao <div> criado
  pokemon.appendChild(rotulo);
  pokemon.appendChild(imagemShinyPokemon);
  pokemon.appendChild(imagemPokemon);
  pokemon.appendChild(GifNormal);
  pokemon.appendChild(GifShiny);
  pokemon.appendChild(divtypes);
  
  return pokemon;
}

function imagens(div,link,id){
  div.src = link
  div.style.display = 'none';
  div.setAttribute('id',id)  
}

// function PopularRegioes(numero){
//   let RegiaoTipo;
//   if (numero < 152){
//       RegiaoTipo = 'kanto'
//       return RegiaoTipo
//   }else if(numero < 252){
//       RegiaoTipo = 'johto'
//       return RegiaoTipo
//   }else if(numero < 387){
//       RegiaoTipo = 'hoenn'
//       return RegiaoTipo
//   }else if(numero < 494){
//       RegiaoTipo = 'sinnoh'
//       return RegiaoTipo
//   }else if(numero < 650){
//       RegiaoTipo = 'unova'
//       return RegiaoTipo
//   }else if(numero < 722){
//       RegiaoTipo = 'kalos'
//       return RegiaoTipo
//   }else if(numero < 810){
//       RegiaoTipo = 'alola'
//       return RegiaoTipo 
//   }else if(numero < 906){
//       RegiaoTipo = 'galar'
//       return RegiaoTipo
//   }else if(numero < 1009){
//       RegiaoTipo = 'paldea'
//       return RegiaoTipo
//   }

// }