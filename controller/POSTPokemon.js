const inventario = require('../models/inventario')
const { Op } = require("sequelize");

const POSTPokemon = {
    async POSTPokemon(req,res,sess){
        const {mode,torneio,nomes} = req.body
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
    }
}


module.exports = POSTPokemon