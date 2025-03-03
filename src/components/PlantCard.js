import React, {useState} from "react";

function PlantCard({plant, onPriceChange, deletePlant}) {
  //state to use to conditionally render instock/outofstock buttons
  const [inStock, setInStock] = useState(true);

  //state containing the price of a plant
  //collects input when price is changed 
  const [price, setPrice] = useState(plant.price);

  //onclick handler to toggle between instock/outofstock and update instock state
  function handleClick(e) {
    e.preventDefault();
    setInStock(!inStock);
  }

  //onclick handler to update plants state on price change and persist changes to db.json
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

  //onchange handler to update price state on user input 
  function handlePriceChange(e){
    setPrice(e.target.value);
  }

 //onclick handler to delete plant, update state, and db.json
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
      <p>
        price: 
        <span className="price"> 
          {/*input field to display price and enable price change*/}
          <input type = "text" value = {price} name = {plant.name} onChange = {handlePriceChange}></input>
        </span>
        {/*button to enable updating the price changes*/}
        <button className="updateButton" onClick={updatePriceChange}>update price</button>
      </p>
      <div>
        {inStock ? (
          <button className="primary" onClick = {handleClick}>In Stock</button>
        ) : (
          <button onClick={handleClick}>Out of Stock</button>
        )}
        {/*button to remove a plant*/}
        <button className="updateButton" onClick={handleDeletePlant}>Remove Plant</button>
      </div>
    </li>
  );
}

export default PlantCard;
