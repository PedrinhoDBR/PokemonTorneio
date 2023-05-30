(async()=>{
    const database = require('./DataBase/db')
    const torneio = require('./models/torneios')
    const pokemons = require('./models/pokemonsCombo')
    const user = require('./models/user')
    const inventario = require('./models/inventario')
    await database.sync()

    const pokemon = await pokemons.findAll({
    })
    if (pokemon == ""){
        
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
                teste(element.name,RegiaoTipo)
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
const torneiojs = require('./public/Scripts/torneio');
// const { json } = require('express/lib/response');

async function teste(nome,tipo){
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
            res.redirect('back');
        }
    }else{
        const newuser = await userlogin.create({
            nome: nome,
            senha: senha
        })
        req.session.ContaUsuario = newuser
        res.redirect('back');
    }
    }else{
        console.log("ja logado")
        res.redirect('back');
    }
    // console.log(req.session.ContaUsuario)
})

app.get('/',async(req,res)=>{
    res.render('index');
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
        const id = req.body 
        const torneioescolhido = await torneio.findByPk(id.id)
        const nome = req.session.ContaUsuario.nome
        if (torneioescolhido.jogador1 == nome || torneioescolhido.jogador2 == nome){
            res.redirect('/torneio/'+id.id)
        }else if (torneioescolhido.jogador1 == null){
            torneioescolhido.set({
                jogador1: nome
            })
            await inventario.create({
                IdTorneio: torneioescolhido.id,
                IdUser: sess.id
            })
            await torneioescolhido.save();
            res.redirect('/torneio/'+id.id)
        }else if (torneioescolhido.jogador2 == null){
            torneioescolhido.set({
                jogador2: nome
            })
            await inventario.create({
                IdTorneio: torneioescolhido.id,
                IdUser: sess.id
            })
            await torneioescolhido.save();
            res.redirect('/torneio/'+id.id)
        }else{
            console.log("Torneio cheio")
            res.redirect('back');
        }
    }else{
        res.render('/')
    }

})

app.get('/torneio/:torneioId',async(req,res)=>{  //modo de jogador
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
});

var i = 0
app.post('/torneios',async(req,res)=>{
    const {nome,region} = req.body

    const torn = await torneio.findOne({where: {
        nome:nome
        }
    })
    if (!torn){
        if (typeof(region)== 'string' ){
            const arr = [region]
            await torneio.create({
                nome: nome,
                regioes: arr
            })
        }else{
            await torneio.create({
                nome: nome,
                regioes: region
            })
        }
    }else{
        console.log("torneio ja existente")
    }
    res.redirect('back');

})

app.post('/postpokemon',async(req,res)=>{
    const {mode,torneio,nomes} = req.body
    const sess = checkuser(req)
    if (sess){
        if (mode == 'INS'){
            const inventarioPoke = await inventario.findOne({where: { [Op.and]: [{ IdTorneio:torneio},{ IdUser:sess.id}]}})
            if (inventarioPoke.pokemons == null ||inventarioPoke.pokemons == ""){
                const arr = [nomes]
                const js =  JSON.stringify(arr)
                inventarioPoke.set({
                    pokemons: js
                })
                await inventarioPoke.save()
            }else{
                const arr = JSON.parse(inventarioPoke.pokemons)
                arr.push(nomes)
                const js =  JSON.stringify(arr)
                inventarioPoke.set({
                    pokemons: js
                })
                await inventarioPoke.save()

            }
            res.redirect('back');
        }   
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