import React from "react";
import PlantCard from "./PlantCard";

function PlantList({displayList}) {
  if(!displayList) return <p>loading...</p>;
  let plantsList = displayList.map(plant =><PlantCard key = {plant.id} plant = {plant}/>)
  return (
    <ul className="cards">{plantsList}</ul>
  );
}

export default PlantList;
