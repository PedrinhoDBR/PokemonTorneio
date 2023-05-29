const link = 'https://pokeapi.co/api/v2/pokemon/'
var inputElement = document.getElementById('combo');
inputElement.addEventListener('change', function(event) {
    const selectedOption = event.target.value;
        const valid = setar(selectedOption)
        if (valid){
            // event.preventDefault(); 
            form.submit();
            afterrequest()
        }
  });
inputElement.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const selectedOption = event.target.value;
        setar(selectedOption)
        if (valid){
            // event.preventDefault(); 
            form.submit();
            afterrequest()
        }
    }
});




let Lista = ListaPokes.split("|");
Lista.pop()

function setar(poke){
    if (Lista.includes(poke)){
        request(poke);
        return true;
    }else{
        console.log("Poke não existe")
    }
}

function request(nome){
    fetch(link+nome)
        .then(response => response.json())
        .then(data => {
            populardivs(data)
    })
    .catch(error => {
        // Tratar erros
        console.error(error);
      });
}

function afterrequest(){
    inputElement.value = ''

}

function populardivs(data){
    const item = document.createElement('div');
    item.classList.add('item')
    const pokemon = document.createElement('div');
    pokemon.classList.add('pokemon')
    // const span = document.createElement('span');
    // span.innerText = data['name']
    const imagem = document.createElement('img');
    imagem.setAttribute('id','imagem') 
    imagem.src = data.sprites['other']['official-artwork']['front_default']

    const dados = document.createElement('div');
    dados.classList.add('dados')

    const info = document.createElement('div');
    info.classList.add('infos')
    const nom = document.createElement('h1');
    nom.innerText = data['name']
    info.appendChild(nom);
    let a = data.types.length
    data.types.forEach(container =>{
        a -= 1
        if (a == 1){
            console.log('aaa')
            let types2 = document.createElement('h2');
            types2.innerText = (container.type.name)
            types2.classList.add('estilo');
            info.appendChild(types2);
            types2.setAttribute('id',container.type.name)   
        }else{
            console.log('aaa')
            let types = document.createElement('h2');
            types.innerText = (container.type.name)
            types.classList.add('estilo');
            types.setAttribute('id',container.type.name)   
            info.appendChild(types);
        }
  
    })


    const atacks = document.createElement('div')
    data['abilities'].forEach(element => {
        const each = document.createElement('h3')
        each.innerText = element.ability.name
        atacks.appendChild(each)
    });

    dados.appendChild(info)
    dados.appendChild(atacks)
    pokemon.appendChild(imagem)
    item.appendChild(pokemon)
    item.appendChild(dados)
    document.getElementById('equipe').appendChild(item)
}


const form = document.getElementById('escolhapokemon');


// Evento de tecla pressionada (keydown)

var nomes = []
nomes = Invent.split(',')
nomes.forEach(container =>{
    request(container)
})