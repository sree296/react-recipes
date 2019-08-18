import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import Recipe from './Recipe';
import './App.css';

const App = () => {
  const APP_ID = '27793588';
  const APP_KEY = '57381aae87de4d20631bec091d7c8517';
  const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;
 
  const [counter, setCounter] = useState(0);

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);
  
  const getRecipes = async() => {
    const response= await fetch(exampleReq);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);

  }
  const updateSearch = e => {
    setSearch(e.target.value)
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  };
  return(
    <div className="App">
      <h1 className="main-title">Recipes</h1>
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
      {recipes.map( recipe => (
        <Recipe 
          key = {recipe.recipe.label}
          title={recipe.recipe.label}
          calories = {recipe.recipe.calories}
          image = {recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}
export default App;
