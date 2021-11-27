const snacks = require('./db.json');
let globalId = 4

module.exports = {
    getSnacks: (req, res) => res.status(200).send(snacks),
    deleteSnack: (req, res) => {
        let index = snacks.findIndex(elem => elem.id === +req.params.id)
        snacks.splice(index, 1)
        res.status(200).send(snacks)
    },
     createSnack: (req, res) => {
         let { snackName, quantity } = req.body
         let newSnack = {
             id: globalId, 
             snackName, 
             quantity
             
         }
         snacks.push(newSnack)
         res.status(200).send(snacks)
         globalId++
     },

    updateSnack: (req, res) => {
        let { id } = req.params
        // console.log(id)
        let {type} = req.body
        // console.log(type)
        let index = snacks.findIndex(elem => +elem.id === +id)
        // console.log(index)
         if (type === 'plus'){
            snacks[index].quantity = parseInt(snacks[index].quantity) + 1
            res.status(200).send(snacks)
        } else if (type === 'minus') {
            snacks[index].quantity -= 1
            res.status(200).send(snacks)
        } else {
            res.sendStatus(400)
        }
    }


}