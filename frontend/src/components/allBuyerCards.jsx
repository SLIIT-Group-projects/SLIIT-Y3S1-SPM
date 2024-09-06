import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

// Modal component to display image popup
const ImageModal = ({ isModalOpen, selectedImage, closeModal }) => {
  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div
        className="modal-content"
        onClick={(e) => {
          // Prevents the modal from closing when clicking inside the content
          e.stopPropagation();
        }}
      >
        <img src={selectedImage} alt="yeild" className="modal-image" />
        <button className="modal-close-button" onClick={closeModal}>
          &times;
        </button>
      </div>
    </div>
  );
};

const AllBuyerCards = () => {
  const [yeilds, setYeilds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResult, setNoResult] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const ComponentsRef = useRef();

  // Fetch products from the API
  useEffect(() => {
    const fetchBuyerCards = async () => {
      try {
        const res = await axios.get("http://localhost:8070/yeildCard/");
        setYeilds(res.data);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchBuyerCards();
  }, []);

  // Handle product deletion
  const handleDelete = async (buyer_card_ID) => {
    try {
      await axios.delete(`http://localhost:8070/yeildCard/delete/${buyer_card_ID}`);
      setYeilds(yeilds.filter((yeild) => yeild._id !== buyer_card_ID));
      alert("yeild deleted successfully");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Error deleting yeild");
    }
  };

  // // Handle report download
  // const handlePrint = useReactToPrint({
  //   content: () => ComponentsRef.current,
  //   documentTitle: "Product Report",
  //   onAfterPrint: () => alert("Product Report successfully downloaded!"),
  // });

  // Handle product search
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredYeilds = yeilds.filter(
      (yeild) =>
        yeild.b_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        yeild.b_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        yeild.buyer_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setYeilds(filteredYeilds);
    setNoResult(filteredYeilds.length === 0);
  };

  // Open modal to display image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  return (
    <div ref={ComponentsRef} className="">

      {/* Search Bar */}
      <div className="">
        <form
          className=""
          onSubmit={handleSearch}
        >
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className=""
            type="search"
            placeholder="Search products"
            aria-label="Search"
          />
          <button
            className=""
            type="submit"
          >
            Search
          </button>
        </form>
      </div>

      <div className="">
        <div className="">PRODUCTS</div>
        <div className="">
          <button className="">
            <Link className="" to="/yeildCard/add">
              Add a Card
            </Link>
          </button>
          <button
            className=""
            // onClick={handlePrint}
          >
            Download Report
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div ref={ComponentsRef}>
        <table border={0} className="">
          <thead>
            <tr className="">
              <th className="">card ID</th>
              <th>card Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>buyer id</th>
              <th>buyer name</th>
              <th>Rate</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {noResult ? (
              <tr>
                <td colSpan="10" className="">
                  No products found
                </td>
              </tr>
            ) : (
              yeilds.map((yeild) => (
                <tr key={yeild._id} className="">
                  <td className="">
                    {yeild.buyer_card_ID}
                  </td>
                  <td onClick={() => openModal(yeild.image)} style={{ cursor: "pointer" }}>
                    <img
                      src={yeild.image}
                      width={"200px"}
                      height={"180px"}
                      alt="Product"
                    />
                  </td>
                  <td>{yeild.b_title}</td>
                  <td>{yeild.b_description}</td>
                  <td>{yeild.buying_quantity}</td>
                  <td>{yeild.buyer_id}</td>
                  <td>{yeild.buyer_name}</td>
                  <td>{yeild.buying_rate}</td>
                  <td>
                    <Link to={`/yeildCard/${yeild._id}`}>
                      <button className="">
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </Link>
                  </td>
                  <td className="">
                    <button
                      className=""
                      onClick={() => handleDelete(yeild._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Include ImageModal component */}
      <ImageModal
        isModalOpen={isModalOpen}
        selectedImage={selectedImage}
        closeModal={closeModal}
      />
    </div>
  );
}

export default AllBuyerCards;
