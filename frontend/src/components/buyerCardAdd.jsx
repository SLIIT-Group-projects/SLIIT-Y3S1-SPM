import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AddBuyerCard() {
//   const navigate = useNavigate();

  const [buyer_card_ID, setID] = useState("");
  const [img, setImg] = useState("");
  const [b_title, setName] = useState("");
  const [b_description, setDescription] = useState("");
  const [buyer_id, setBuyerId] = useState("");
  const [buyer_name, setBuyerName] = useState("");
  const [buying_rate, setRate] = useState("");
  const [buying_quantity, setQuantity] = useState("");

  const imagebase64 = async (file) => {
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 5 MB (adjust this value as needed)

    if (file && file.size <= maxSize) {
      setImg(file);
    } else {
      // Notify the user if the file exceeds the size limit
      alert("Please select an image file smaller than 2 MB.");
      // Clear the input field to allow the user to select a new file
      e.target.value = null;
    }
  };

  const sendData = async (e) => {
    e.preventDefault();

    // Convert image to base64 if available
    let imageBase64 = "";
    if (img) {
      imageBase64 = await imagebase64(img);
    }

    const newBuyerCard = {
      buyer_card_ID,
      image: imageBase64, // Include base64 image data in product data
      b_title,
      b_description,
      buyer_id,
      buyer_name,
      buying_rate: Number(buying_rate),
      buying_quantity: Number(buying_quantity),
    };

    // Send product data to the server
    axios
      .post("http://localhost:8070/yeildCard/add", newBuyerCard)
      .then(() => {
        alert("Card Added");
        // navigate("/inv/");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container">
      <div className="text-center pti-text-h2 pti-bold pb-4">Add Your Card</div>
      <form onSubmit={sendData}>
        <div className="d-flex justify-content-center gap-4 ">
          {/* id */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <div className="form-label pti-text-dark pti-bold">Card ID</div>
            <input
              type="text"
              className="add-product-input form-control"
              onChange={(e) => {
                setID(e.target.value);
              }}
            />
          </div>
          {/* image */}
          <div className=" pb-4 flex-grow-1">
            <div className="form-label pti-text-dark pti-bold">
              Yeild Image
            </div>
            <label htmlFor="uploadImage">
              <div className="uploadBox">
                <input type="file" className="add-product-upload" id="img" onChange={handleUploadImage} />
              </div>
            </label>
          </div>
        </div>
        {/* second row */}
        <div className="d-flex justify-content-center gap-4">
          {/* name */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label htmlFor="name" className="form-label pti-text-dark pti-bold">
              Product Name
            </label>
            <input
              type="text"
              className="add-product-input form-control"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          {/* quantity */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label
              htmlFor="quantity"
              className="form-label pti-text-dark pti-bold"
            >
              Quantity
            </label>
            <input
              type="number"
              min="0"
              className="add-product-input form-control"
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="mb-3 d-flex flex-column align-items-start">
          <label
            htmlFor="description"
            className="form-label pti-text-dark pti-bold"
          >
            Product Description
          </label>
          <input
            type="text"
            className="add-product-input form-control"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        {/* third row */}
        <div className="d-flex justify-content-center gap-4">
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label
              htmlFor="weight"
              className="form-label pti-text-dark pti-bold"
            >
              Buyer ID
            </label>
            <input
              type="text"
              min="0"
              className="add-product-input form-control"
              onChange={(e) => {
                setBuyerId(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label
              htmlFor="unit_price"
              className="form-label pti-text-dark pti-bold"
            >
              Buyer Name
            </label>
            <input
              type="text"
              min="0"
              step="0.01"
              className="add-product-input form-control"
              onChange={(e) => {
                setBuyerName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label
              htmlFor="unit_price"
              className="form-label pti-text-dark pti-bold"
            >
              Buying rate
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="add-product-input form-control"
              onChange={(e) => {
                setRate(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center gap-2 pt-4">
          <button
            type="submit"
            className="add-product-btn pti-bold btn btn-primary pti-rounded-small" >
            Submit
          </button>
          <button type="reset" className="add-product-btn bg-black text-light pti-bold pti-rounded-small">cancel</button>
          
        </div>
      </form>
      <br />
    </div>
  );
}

export default AddBuyerCard;
