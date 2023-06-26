const inventario = require('../models/inventario')
const torneio = require('../models/torneios')

const POSTEntrarTorneio = {
  async POSTEntrarTorneio (req,res,sess){
    const id = req.body
    const torneioescolhido = await torneio.findByPk(id.id)
    const nome = sess.nome
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
}
}

module.exports = POSTEntrarTorneio