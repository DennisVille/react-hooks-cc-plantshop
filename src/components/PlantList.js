import React from "react";
import PlantCard from "./PlantCard";

function PlantList({displayList, onPriceChange, deletePlant}) {
  if(!displayList) return <p>loading...</p>;
  let plantsList = displayList.map(plant =>
    <PlantCard key = {plant.id} plant = {plant} onPriceChange = {onPriceChange} deletePlant = {deletePlant}/>
  )
  return (
    <ul className="cards">{plantsList}</ul>
  );
}

export default PlantList;
