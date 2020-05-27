import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = "64174c53";
  const APP_KEY = "3c86d2a0cc449364c05f865a98128e1d";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  
  useEffect(() => {
    getRecipes();
  }, [query]);
  
  const getRecipes = async () => {
    const response = await 
      fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className= "App">
      <div className="header">
        <h1>Healthy Eats</h1>
      </div>
      <form  onSubmit= {getSearch}
      className="search-form">
        <input className="search-bar" 
               type= "text" 
               value={search}
               onChange = {updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      {recipes.map(recipe => (
        <div className= "recipes">
        <Recipe 
          key = {recipe.recipe.label}
          title={recipe.recipe.label}
          calories = {recipe.recipe.calories}
          image = {recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}/>
          </div>
      ))}
    </div>
  )
}

export default App;
