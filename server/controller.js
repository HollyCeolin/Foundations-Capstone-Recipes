const recipes = require('./db.json')
let globalId = 8
const path = require('path')

module.exports ={
    getHTML: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html' ))
    },

    getCSS: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/styles.css'))
    },

    getJS: (req, res) => {
        res.sendFile(path.join(__dirname, '../public/main.js'))
    },

    getRecipes:(req, res) => {
        res.status(200).send(recipes)
    },

    deleteRecipe: (req, res) => {
            let index = recipes.findIndex(elem => elem.id === +req.params.id)
            recipes.splice(index, 1)
            res.status(200).send(recipes)
        },


    createRecipe: (req, res) => {
        let {recipeName, mealType, ingredients, directions} = req.body
        let newRecipe = {
            id:globalId,
            recipeName,
            mealType,
            ingredients,
            directions,
            
        }
        recipes.push(newRecipe)
        globalId++
        res.status(200).send(recipes)
    },

    // updateRecipe: (req, res) => {
    //     let {id,recipeName,mealType} = req.body
    //     let index = recipes.findIndex(elem => elem.id === +req.params.id)
    //     let updatedRecipe= {
    //         id,
    //         recipeName,
    //         mealType
    //     }
    //     recipes.splice(index, 1)
    //     recipes.push(updatedRecipe)
    //     res.status(200).send(recipes)
    // }
}
