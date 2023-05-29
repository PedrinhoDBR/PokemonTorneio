const pokespecie = 'https://pokeapi.co/api/v2/pokemon-species/'
const urlgif = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/'
let variantes;
const varianteslista = []
const headers = new Headers();
headers.append('Accept-Encoding', 'gzip');


function LoadInfos(){
    Promise.all(
        varianteslista.map(id =>
          fetch(`${id}`, { headers }).then(response =>
            response.arrayBuffer().then(buffer => {
              const decoded = new TextDecoder('utf-8').decode(
                new Uint8Array(buffer)
              );
              const data = JSON.parse(decoded);
              return data;
            })
          )
        )
      ).then(pokemons => {
        pokemons.forEach(container =>{
            popular(container)
        })
      });
}

function popular(container){
    const pokemon = document.createElement('div');
    pokemon.classList.add('pokemon');

    const imagem = document.createElement('img');
    imagem.src = container.sprites['other']['official-artwork']['front_default']

    const rotulo = document.createElement('span');
    rotulo.innerText = container.name

    pokemon.appendChild(rotulo);
    pokemon.appendChild(imagem);
    document.getElementById('imagens').appendChild(pokemon)
}
const pokeid = window.location.pathname.split('/').pop();

function FirstLoad(){
    fetch(pokespecie+pokeid)
    .then(response => response.json())
    .then(data => {
        var i;
        var limite = data.varieties.length; 
        for (i = 0; i < limite; i++) {
            variantes = data.varieties[i]['pokemon']['url']
            varianteslista.push(variantes)
        }
        LoadInfos()
    })
    .catch(error => {
      // Tratar erros
      console.error(error);
    });
}

FirstLoad()




// const carousel = document.querySelector('.carrosel');
// const slidesContainer = carousel.querySelector('.slider');
// const slides = Array.from(slidesContainer.querySelectorAll('.pokemon'));
// const prevBtn = carousel.querySelector('.prev');
// const nextBtn = carousel.querySelector('.next');

// const slideWidth = 100;
// const visibleSlides = 6; // Número de slides visíveis

// let currentPosition = 0;

// function updateSlidesPosition() {
//   slidesContainer.style.transform = `translateX(-${currentPosition * slideWidth}px)`;
// }

// function slidePrev() {
//   currentPosition = Math.max(currentPosition - 1, 0);
//   updateSlidesPosition();
// }

// function slideNext() {
//   const maxPosition = slides.length - visibleSlides;
//   currentPosition = Math.min(currentPosition + 1, maxPosition);
//   updateSlidesPosition();
// }

// prevBtn.addEventListener('click', slidePrev);
// nextBtn.addEventListener('click', slideNext);

// // Ajusta a largura do container para exibir o número de slides visíveis
// slidesContainer.style.width = `${slideWidth * visibleSlides}px`;