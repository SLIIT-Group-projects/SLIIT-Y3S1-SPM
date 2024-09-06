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