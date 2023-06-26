(async()=>{
    const database = require('./DataBase/db')
    const torneio = require('./models/torneios')
    const pokemons = require('./models/pokemonsCombo')
    const user = require('./models/user')
    const inventario = require('./models/inventario')
    await database.sync()

    const pokemon = await pokemons.findAll({
    })
    if (pokemon == " "){
        
        fetch('https://pokeapi.co/api/v2/pokemon?limit=1008')
        .then(response => response.json())
        .then(data => {
            
           data.results.forEach(element => {
                
                var index = data.results.indexOf(element)+1
                var RegiaoTipo;
                if (index < 152){
                    RegiaoTipo = 'kanto'
                }else if(index < 252){
                    RegiaoTipo = 'johto'
                }else if(index < 387){
                    RegiaoTipo = 'hoenn'

                }else if(index < 494){
                    RegiaoTipo = 'sinnoh'

                }else if(index < 650){
                    RegiaoTipo = 'unova'

                }else if(index < 722){
                    RegiaoTipo = 'kalos'

                }else if(index < 810){
                    RegiaoTipo = 'alola'
 
                }else if(index < 906){
                    RegiaoTipo = 'galar'

                }else if(index < 1100){
                    RegiaoTipo = 'paldea'
                }
                PokeADD(element.name,RegiaoTipo)
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
    })();

const { Op } = require("sequelize");
const torneio = require('./models/torneios')
const pokemons = require('./models/pokemonsCombo')
const userlogin = require('./models/user')
const inventario = require('./models/inventario')



// const { spawn } = require('child_process');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override')
const { resolve } = require('path');
const { type } = require('os');
const {POSTEntrarTorneio} = require('./controller/POSTEntrarorneio');
const { POSTTorneios } = require('./controller/POSTTorneios');
const { POSTPokemon } = require('./controller/POSTPokemon');
// const { json } = require('express/lib/response');

async function PokeADD(nome,tipo){
    await pokemons.create({
        nome: nome,
        regiao: tipo
    })
}


const app = express();



app.set('views', resolve('./views'))
app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({'extended':true}))
app.use(methodOverride('_method'))

app.use(session({secret: "mysecretkey"}))
var ContaUsuario;

app.get('/home',(req,res)=>{
    
    res.redirect('/');
})

// function checklogin(){
//     session.ContaUsuario
// }


app.post('/login',async(req,res)=>{
    if (!req.session.ContaUsuario){
    const {nome, senha} = req.body 
    const user = await userlogin.findOne({where: {
        nome:nome
        }
    })
    if(user){
        if (user.senha == senha){
            req.session.ContaUsuario = user
            res.redirect('/');
        }
    }else{
        const newuser = await userlogin.create({
            nome: nome,
            senha: senha
        })
        req.session.ContaUsuario = newuser
        res.redirect('/');
    }
    }else{
        console.log("ja logado")
        res.redirect('/');
    }

})

app.get('/',async(req,res)=>{
    const sess = checkuser(req)
    if (sess){
        const nome = sess.nome
        res.render('index',{nome});

    }else{
        const nome = '' 
        res.render('index',{nome});
    }
})

app.get('/torneios', async(req,res)=>{
    const sess = checkuser(req)
    if (sess){
        const torneios = await torneio.findAll({
            order:[['nome','ASC']],
        })
        
        res.render('ListaTorneios',{torneios});
    }else{
        res.redirect('back');
    }
})

app.get('/spec/:pokeid', async(req,res)=>{
    let pokeid = req.params.pokeid
    res.render('spec',{pokeid});
})

app.get('/Visualizartorneio/:torneioId',async(req,res)=>{ //modo de visualizar

})


app.post('/entrartorneio',async(req,res)=>{ //update do nome do user no torneio
    const sess = checkuser(req)
    if(sess){
        POSTEntrarTorneio(req,res,sess)
    }else{
        res.render('/')
    }

})

app.get('/torneio/:torneioId',async(req,res)=>{  //modo de jogador
    const sess = checkuser(req)
    if (sess){  
        let torneioId = req.params.torneioId
        const sess = checkuser(req)
        const inventarioPoke = await inventario.findOne({where: { [Op.and]: [{ IdTorneio:torneioId},{ IdUser:sess.id}]}})
        const torneioescolhido = await torneio.findByPk(torneioId)
        const a = torneioescolhido.regioes
        const pokemonsload = await pokemons.findAll({
            where: {[Op.or]: [{regiao: {[Op.in]: a}}]}
        })
        const nome = torneioescolhido   
        var username = sess.nome
        var pokes = JSON.parse(inventarioPoke.pokemons)
        res.render('torneio',{pokemonsload,nome,username,pokes});
    }else{
        res.render('/')
    }

});

var i = 0
app.post('/torneios',async(req,res)=>{
    const sess = checkuser(req)
    if(sess){
        POSTTorneios(req,res)
    }else{
        res.render('/')
    }
})

app.post('/postpokemon',async(req,res)=>{
    const sess = checkuser(req)
    if (sess){  
        POSTPokemon(req,res,sess)
    }else{
        res.redirect('/')
    }
})


app.listen(3000,function(){
    console.log('Ok');
})



function checkuser(req){
    const logado = req.session.ContaUsuario
    return logado;
}

app.get('/login', async(req,res)=>{
    res.render('login')
})