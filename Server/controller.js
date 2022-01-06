//Handles logic of routes and data manipulation index.js

const snacks = require('./db.json');//pulls json data and saves in snacks variable
let globalId = 4

module.exports = {
    getSnacks: (req, res) => res.status(200).send(snacks),
    deleteSnack: (req, res) => {
        let index = snacks.findIndex(elem => elem.id === +req.params.id)
        snacks.splice(index, 1)//takes index as an argument
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
        let { id } = req.params//route to update
        
        let {type} = req.body//what the params is updating
        
        let index = snacks.findIndex(elem => +elem.id === +id)//converts ID string to number
        
        if (snacks[index].quantity === 25 && type === 'plus'){
            res.status(400).send('NO ROOM FOR OVER 25!!')
        } else if (snacks[index].quantity === 0 && type === 'minus'){
            res.status(400).alert('TIME TO REORDER & RESTOCK!!')
        } else
         if (type === 'plus'){
            snacks[index].quantity += 1
            res.status(200).send(snacks)
        } else if (type === 'minus') {
            snacks[index].quantity -= 1
            res.status(200).send(snacks)
        } else {
            res.sendStatus(400)
        }
    }
}