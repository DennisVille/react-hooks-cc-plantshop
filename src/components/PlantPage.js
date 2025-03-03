import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  //state containing array of plants fetched from db.json
  const [plants, setPlants] = useState([]);
  //state containiing the value of the search input field
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then(response => response.json())
    .then(data => setPlants(data))
    .catch(error => console.error(error))
  }, []);

  //update plants state when a new plant is added
  function updateState(obj){
    setPlants((prevstate) => [...prevstate, obj]);
  }

  //update search state when there is an input in search input field
  function updateSearchState(item){
    setSearch(item);
  }
  
  //update plants state when price of a plant changes
  function updatePriceChange(id, newPrice){
    setPlants(prevState => prevState.map(plant =>
      plant.id === id ? {...plant, price: newPrice} : plant
    ));
  } 

  //update plants state when a plant is removed
  function deletePlant(id){
    setPlants(prevState => prevState.filter(plant => plant.id !== id));
  }

  //toggle between displaying all plants and filtered plants after a search 
  let displayList = search.length == 0 ? plants : [...plants].filter((plant) => plant.name.includes(search));


  return (
    <main>
      <NewPlantForm onSubmitForm={updateState}/>
      <Search search = {search} onSearchChange = {updateSearchState}/>
      <PlantList 
        displayList = {displayList} 
        onPriceChange = {updatePriceChange} 
        deletePlant = {deletePlant}
      />
    </main>
  );
}

export default PlantPage;
