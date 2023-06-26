    let modoImg = true
let IsNormal = true
let TipoJunto = false
let mode = true
let checkedCount;

function Filtro(tipo){

    switch (tipo){
        case 'Tipos':
            FiltroTipos()
            break;
        case 'Gif':
            ImgType()
            break;
        case 'Shiny':
            PokeStyle()
            break;
        case 'Agrupar':
            Agrupar()
            break;
        case 'Ordenar':
            OrdenarAlf()
            break;

    }
}

function Mostrarfiltro(){
    console.log("mostrar")
    if(document.getElementById("MenuFiltro").classList.contains('Remover')){
        document.getElementById("MenuFiltro").classList.add('Mostrar');
        document.getElementById("MenuFiltro").classList.remove('Remover');
    }else{
        document.getElementById("MenuFiltro").classList.add('Remover');
        document.getElementById("MenuFiltro").classList.remove('Mostrar');

    }
}

function Redirecionar(tela){
    window.location.href = tela ;
}

function torneio(parm){
    console.log(parm)
    if (parm != ''){
        window.location.href = '/torneios'
    }else{
        logar()
    }
}

function logar(){
    var dialog = document.getElementById('dialogLogin')
    dialog.showModal();
  }

  
function fecharDialog() {
    var dialog = document.getElementById("meuDialogo");
    dialog.close();
}


function OrdenarAlf(){

    popregi.forEach(item =>{
        const regiao = document.querySelectorAll('.'+item);
        regiao.forEach(regiaoitem =>{
            if (mode){
                const divs = Array.from(regiaoitem.querySelectorAll('.name'));
                const textos = []
                divs.sort(divs.innerHTML)
                divs.forEach(divitem => {
                    textos.push(divitem.innerHTML)
                })
                textos.sort()
                const divs2 = Array.from(document.querySelectorAll('.pokemon'));
                //const a = divs2.parentElement
                textos.forEach(text =>{
                    divs2.forEach(divitem =>{
                        if (text  == divitem.children[0].innerHTML){
                            regiaoitem.appendChild(divitem)
                        }
                    })
                })
            }else{
                const divs = Array.from(regiaoitem.querySelectorAll('.pokemon'));
                divs.sort((a, b) => a.id - b.id);
                divs.forEach(div => regiaoitem.appendChild(div));
            }
        })
    })
    mode = !mode
}


function PesquisaNome(){
    var Texto = document.getElementById('searchInput').value
    const pokemons = document.querySelectorAll('.geral .regioes');
    pokemons.forEach(divGeral => {
        if (divGeral.style.display == 'grid'){
            const divsItems = divGeral.querySelectorAll('.pokemon');
            divsItems.forEach(divItem => {
                if (divItem.children[0].innerHTML.search(Texto) == -1){
                    divItem.style.display = 'none'
                }else{
                    divItem.style.display = 'block'
                }
            });
        }
    });
}


function limpar(){
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.name === 'pokemonType') {
        checkbox.checked = false;
      }
    });

}

function ImgType() {

    const imag = document.querySelectorAll('.pokemon');
    imag.forEach(container => {
        const ImageN = container.querySelector('#ImagemNormal');
        const ImageS = container.querySelector('#ImagemShiny');
        const GifN = container.querySelector('#GifNormal');
        const GifS = container.querySelector('#GifShiny');

        if (IsNormal){
            if (modoImg){
                ImageN.style.display = 'none'
                GifN.style.display = 'block'
            }else{
                ImageN.style.display = 'block'
                GifN.style.display = 'none'
            }
        }else{
            if (modoImg){
                ImageS.style.display = 'none'
                GifS.style.display = 'block'
            }else{
                ImageS.style.display = 'block'
                GifS.style.display = 'none'
            }
        }
    })
    modoImg = !modoImg
}

function PokeStyle(){

    const imag = document.querySelectorAll('.pokemon');
    imag.forEach(container => {
        const ImageN = container.querySelector('#ImagemNormal');
        const ImageS = container.querySelector('#ImagemShiny');
        const GifN = container.querySelector('#GifNormal');
        const GifS = container.querySelector('#GifShiny');
        if(modoImg){
            if(IsNormal){
                ImageN.style.display = 'none'
                ImageS.style.display = 'block'
            }else{
                ImageN.style.display = 'block'
                ImageS.style.display = 'none'
            }
        }else{
            if(IsNormal){
                GifN.style.display = 'none'
                GifS.style.display = 'block'
            }else{
                GifN.style.display = 'block'
                GifS.style.display = 'none'
            }
        }
    })
    IsNormal = !IsNormal
}

function FiltroTipos() {
    const filter = document.querySelectorAll('input[name="pokemonType"]');
    const pokemon = document.querySelectorAll('.pokemon');

    filter.forEach(input => {
        input.addEventListener('change', function() {
            const selectedTypes = Array.from(filter)
                .filter(input => input.checked)
                .map(input => input.value);
                
            pokemon.forEach(p => {
                const types = Array.from(p.querySelectorAll('.types h1'))
                    .map(t => t.textContent);
                if (TipoJunto){
                    if (selectedTypes.length === 0 || selectedTypes.some(type => types.includes(type))) {
                        p.style.display = 'block';
                    } else {
                        p.style.display = 'none';
                    }
                }else{
                    if (selectedTypes.length === 0 || selectedTypes.some(type => types.includes(type))) {
                        p.style.display = 'block';
                    } else {
                        p.style.display = 'none';
                    }
                }
            });
        });
    });
}

function EventoClick(){
    var pokemonDivs = document.querySelectorAll('.pokemon');
    pokemonDivs.forEach(function(div) {
    div.addEventListener('click', function() {
        var pokemonId = this.id;
        window.location.href = '/spec/' + pokemonId;
    });
    });
}
