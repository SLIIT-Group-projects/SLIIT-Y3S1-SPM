import React, { useState } from "react";

function PlantCount() {
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [area, setArea] = useState(null);

  // Function to calculate the area
  const calculateArea = (e) => {
    e.preventDefault(); // Prevent form submission
    const widthValue = parseFloat(width);
    const lengthValue = parseFloat(length);

    if (!isNaN(widthValue) && !isNaN(lengthValue)) {
      const calculatedArea = widthValue * lengthValue;
      setArea(calculatedArea);
    } else {
      alert("Please enter valid numbers for width and length");
    }
  };

  return (
    <>
      <div className="container ">
        <h1>Plant Count</h1>
        <form onSubmit={calculateArea}>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="width" className="col-sm-2 col-form-label">
              Enter the width
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="width"
                placeholder="width"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="length" className="col-sm-2 col-form-label">
              Enter the length
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="length"
                placeholder="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
          </div>
          <label htmlFor="plantSelect" className="my-1 mr-2">
            Choose the plant
          </label>
          <select className="custom-select my-1 mr-sm-2" id="plantSelect">
            <option defaultValue>Choose...</option>
            <option value="1">Carrot</option>
            <option value="2">Banana</option>
            <option value="3">Coconut</option>
          </select>
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">
                Calculate Area
              </button>
            </div>
          </div>
        </form>
        {area && (
          <div className="alert alert-success mt-3">
            The area of the land is: {area} square units
          </div>
        )}
      </div>
    </>
  );
}

export default PlantCount;
