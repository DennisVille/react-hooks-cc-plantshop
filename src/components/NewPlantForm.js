import React, {useState} from "react";

function NewPlantForm({onSubmitForm}) {
  const [formData, setFormData] = useState({name: "", image: "", price: 0});

  function handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({...formData, [name]: value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:6001/plants", )
    fetch("http://localhost:6001/plants",{
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(formData),
    } )
    .then((response) => response.json())
    .then((receivedObject) => {
      console.log(receivedObject);
      onSubmitForm(receivedObject)});
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit = {handleSubmit}>
        <input type="text" name="name" placeholder="Plant name" value = {formData.name} onChange = {handleChange}/>
        <input type="text" name="image" placeholder="Image URL" value = {formData.image} onChange = {handleChange}/>
        <input type="number" name="price" step="0.01" placeholder="Price" value = {formData.price} onChange = {handleChange}/>
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
