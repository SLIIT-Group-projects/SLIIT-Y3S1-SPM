import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBuyerCard() {
  const navigate = useNavigate();

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
    const maxSize = 2 * 1024 * 1024; // 2 MB limit for image file

    if (file && file.size <= maxSize) {
      setImg(file);
    } else {
      alert("Please select an image file smaller than 2 MB.");
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
      image: imageBase64,
      b_title,
      b_description,
      buyer_id,
      buyer_name,
      buying_rate: Number(buying_rate),
      buying_quantity: Number(buying_quantity),
    };

    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Send product data to the server with token in headers
    axios
      .post("http://localhost:8070/yeildCard/add", newBuyerCard, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to the request header
        },
      })
      .then(() => {
        alert("Card Added");
        navigate("/yeildCard/");
      })
      .catch((err) => {
        alert("Failed to add card. " + err.response?.data?.message || err.message);
      });
  };

  return (
    <div className="yeild-addCard-form-section container">
      <div className="text-center pti-text-h1 pti-text-dark pti-bolder">
        Add Crop Post
      </div>
      <form onSubmit={sendData}>
        <div className="yeild-addCard-form-box">
          <div>
            <div>
              <div className="yeild-addCard-form-label">Card ID</div>
              <div>
                <input
                  type="text"
                  className="add-product-input form-control"
                  onChange={(e) => setID(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Image</div>
              <div>
                <label htmlFor="uploadImage">
                  <div className="uploadBox">
                    <input
                      type="file"
                      className="add-product-upload add-product-input"
                      id="img"
                      onChange={handleUploadImage}
                    />
                  </div>
                </label>
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Title</div>
              <div>
                <input
                  type="text"
                  className="add-product-input form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Description</div>
              <div>
                <input
                  type="text"
                  className="add-product-input form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">
                Buying Quantity (Kg)
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  className="add-product-input form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">
                Buying Rate (per kilo)
              </div>
              <div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="add-product-input form-control"
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Buyer ID</div>
              <div>
                <input
                  type="text"
                  className="add-product-input form-control"
                  onChange={(e) => setBuyerId(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="yeild-addCard-form-label">Buyer Name</div>
              <div>
                <input
                  type="text"
                  className="add-product-input form-control"
                  onChange={(e) => setBuyerName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="yeild-addCard-form-btn pti-bolder pti-text-h3"
              >
                Add Card
              </button>
            </div>
          </div>
          <div>
            <div className="yeild-addCard-form-img"></div>
          </div>
        </div>
      </form>
      <br />
    </div>
  );
}

export default AddBuyerCard;