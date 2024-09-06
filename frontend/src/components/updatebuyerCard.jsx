import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

function UpdateProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [yeild, setYeild] = useState({
    buyer_card_ID: "",
    image: "",
    b_title: "",
    b_description: "",
    buyer_id: "",
    buyer_name: "",
    buying_rate: "",
    buying_quantity: "",
  });
  const [img, setImg] = useState(null);

  const imageBase64 = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  useEffect(() => {
    // Fetch product data by ID
    const fetchProductData = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8070/yeildCard/get/${id}`
        );
        setYeild(response.data.yeild);
      } catch (error) {
        console.error("Error fetching product data:", error);
        alert("An error occurred while fetching product data");
      }
    };
    fetchProductData();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setYeild({
      ...yeild,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert image file to base64 if a new file is selected
      if (img) {
        yeild.image = await imageBase64(img);
      }
      await Axios.put(`http://localhost:8070/yeildCard/update/${id}`, yeild);
      alert("Product updated successfully");
      navigate("/yeildCard/");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product");
    }
  };

  return (
    <div className="container">
      <div className="text-center pti-text-h2 pti-bold pb-4">
        UPDATE 
      </div>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="d-flex justify-content-center gap-4">
          {/* Product ID */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label className="form-label pti-text-dark pti-bold">
              Product ID:
            </label>
            <input
              type="text"
              name="buyer_card_ID"
              className="add-product-input form-control"
              value={yeild.buyer_card_ID}
              onChange={handleInputChange}
              readOnly
            />
          </div>
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label className="form-label pti-text-dark pti-bold">
              Product Image:
            </label>
            <input type="file" onChange={(e) => setImg(e.target.files[0])} />
          </div>
        </div>

        {/* Second row */}
        <div className="d-flex justify-content-center gap-4">
          {/* Product Name */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label className="form-label pti-text-dark pti-bold">
              Title:
            </label>
            <input
              type="text"
              name="b_title"
              className="add-product-input form-control"
              value={yeild.b_title}
              onChange={handleInputChange}
            />
          </div>
          {/* Quantity */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label className="form-label pti-text-dark pti-bold">
              Quantity:
            </label>
            <input
              type="number"
              name="buying_quantity"
              className="add-product-input form-control"
              value={yeild.buying_quantity}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* Product Description */}
        <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
          <label className="form-label pti-text-dark pti-bold">
            Description:
          </label>
          <input
            type="text"
            name="b_description"
            className="add-product-input form-control"
            value={yeild.b_description}
            onChange={handleInputChange}
          />
        </div>
        {/* Third row */}
        <div className="d-flex justify-content-center gap-4">
          {/* weight */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label className="form-label pti-text-dark pti-bold">
             buyer id:
            </label>
            <input
              type="text"
              name="buyer_id"
              className="add-product-input form-control"
              value={yeild.buyer_id}
              onChange={handleInputChange}
            />
          </div>
          {/* Unit Price */}
          <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label className="form-label pti-text-dark pti-bold">
            buyer_name:
            </label>
            <input
              type="text"
              name="buyer_name"
              className="add-product-input form-control"
              value={yeild.buyer_name}
              onChange={handleInputChange}
            />
          </div>
           {/* Unit Price */}
           <div className="mb-3 flex-grow-1 d-flex flex-column align-items-start">
            <label className="form-label pti-text-dark pti-bold">
            buying_rate:
            </label>
            <input
              type="number"
              name="buying_rate"
              className="add-product-input form-control"
              value={yeild.buying_rate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Submit and reset buttons */}
        <div className="d-flex justify-content-center gap-2 pt-4">
          <button
            type="submit"
            className="add-product-btn pti-bold btn btn-primary pti-rounded-small"
          >
            Update
          </button>
          <button
            type="reset"
            className="add-product-btn bg-black text-light pti-bold pti-rounded-small"
          >
            Cancel
          </button>
        </div>
      </form>
      <br />
    </div>
  );
}

export default UpdateProducts;
