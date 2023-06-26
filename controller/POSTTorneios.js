const torneio = require('../models/torneios')

const POSTTorneios = {
    async POSTTorneios(req,res){
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
    }
}



module.exports = POSTTorneios