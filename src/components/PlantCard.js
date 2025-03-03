import React, {useState} from "react";

function PlantCard({plant, onPriceChange, deletePlant}) {
  const [inStock, setInStock] = useState(true);
  const [price, setPrice] = useState(plant.price);

  function handleClick(e) {
    e.preventDefault();
    setInStock(!inStock);
  }

  function updatePriceChange(e) {
    e.preventDefault();
    const updateData = {price: price};
    fetch(` http://localhost:6001/plants/${plant.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(updateData),
    })
    .then (response => response.json())
    .then (data => {
      console.log("price updated successfully:", data);
      onPriceChange(data.id, price);
    })
    .catch(error => console.error("Error:", error));

  }

  function handlePriceChange(e){
    setPrice(e.target.value);
    //onPriceChange(updatedPlant.id, updatedPlant.price);
  }

  function handleDeletePlant(e){
    e.preventDefault();
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/JSON",
      },
    })
    .then(response =>{
      if(!response.ok) throw new Error("Delete Failed");
      return response.json();
    })
    .then(data => console.log(plant.name," deleted successfully", data))
    .catch(error => console.error ("Error:", error));
    deletePlant(plant.id);
  }


  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4> 
      {/*<p>Price: {plant.price}</p> */ }
      <p>
        price: 
        <span className="price"> 
          <input type = "text" value = {price} name = {plant.name} onChange = {handlePriceChange}></input>
        </span>
        <button className="updateButton" onClick={updatePriceChange}>update price</button>
      </p>
      <div>
        {inStock ? (
          <button className="primary" onClick = {handleClick}>In Stock</button>
        ) : (
          <button onClick={handleClick}>Out of Stock</button>
        )}
        <button className="updateButton" onClick={handleDeletePlant}>Remove Plant</button>
      </div>
    </li>
  );
}

export default PlantCard;
