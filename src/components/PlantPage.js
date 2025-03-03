import React, {useState, useEffect} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
    .then(response => response.json())
    .then(data => setPlants(data))
    .catch(error => console.error(error))
  }, []);

  function updateState(obj){
    setPlants((prevstate) => [...prevstate, obj]);
  }

  function updateSearchState(item){
    setSearch(item);
  }

  let displayList = search.length == 0 ? plants : [...plants].filter((plant) => plant.name.includes(search));
  return (
    <main>
      <NewPlantForm onSubmitForm={updateState}/>
      <Search search = {search} onSearchChange = {updateSearchState}/>
      <PlantList displayList = {displayList}/>
    </main>
  );
}

export default PlantPage;
