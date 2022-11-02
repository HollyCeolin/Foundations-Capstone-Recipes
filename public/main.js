
const baseURL = `http://localhost:5000/api/recipe`

const recipeCallback = ({ data: recipe }) => displayRecipe(recipe)
const errCallback = err => console.log(err.response.data)

const recipeContainer = document.getElementById('recipe-container')


const getAllRecipes = () => axios.get(baseURL).then(recipeCallback).catch(errCallback)
const createRecipe = body => axios.post(baseURL, body).then(recipeCallback).catch(errCallback)
const deleteRecipe = id => axios.delete(`${baseURL}/${id}`).then(recipeCallback).catch(errCallback)


const createList = (arr) => {
    let listElement = document.createElement('ol')
    arr.forEach(recipeStepsText => {
        let listItem = document.createElement('li')
        listItem.textContent = recipeStepsText
        listElement.appendChild(listItem)
    })
    return listElement.outerHTML
}

const displayRecipe = (recipeArr) => {
    recipeContainer.innerHTML = ""
    recipeArr.forEach(recipe => {
      let {recipeName, mealType, id, directions, ingredients}= recipe 
      let recipeCard = document.createElement('ul')
      recipeCard.innerHTML = `
            <h1 id="title">
                ${recipeName}
            </h1>    
            <li id= "recipe-id">    
            Recipe ID: ${id}
                <br>
            </li>    
            <li id="meal">
                ${mealType} 
            </li>
            <li id="ing">
                Ingredients
                ${createList(ingredients)}               
            </li>
            <li id="dir">
                Directions
                ${createList(directions)}
            </li> <br><br>
            <button id="deleteBtn" onclick = "deleteRecipe(${id})">Delete</button>      
      ` 
    recipeContainer.appendChild(recipeCard)  
    });
}

const formatRecipe = (event) => {
    event.preventDefault()
    let name = document.getElementById('add-recipe-name')
    let type = document.getElementById('add-meal-type')
    let steps = document.getElementById('add-directions')
    let ingredientList = document.getElementById('add-ingredients')

    let recipeObj = {
        recipeName: name.value,
        mealType: type.value,
        directions: steps.value.split(";"),
        ingredients: ingredientList.value.split(";")
    }
    createRecipe(recipeObj)
    
}
document.getElementById('add-recipe').addEventListener('submit', formatRecipe)


getAllRecipes()