const inventario = require('../models/inventario')

const POSTEntrarTorneio = {
  async POSTEntrarTorneio (id,sess,torneioescolhido,res){
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