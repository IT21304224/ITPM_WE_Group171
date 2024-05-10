import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast, Toaster } from "react-hot-toast";

function ProductContent() {
  const [productcode, setProductcode] = useState("");
  const [productname, setProductname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [suppliercode, setSuppliercode] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [supplierlist, setSupplierlist] = useState([]);
  const [productlist, setProductlist] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !productcode ||
      !productname ||
      !description ||
      !photo ||
      !quantity ||
      !suppliercode ||
      !price ||
      !date
    ) {
      toast.error("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("productcode", productcode);
    formData.append("productname", productname);
    formData.append("description", description);
    if (photo) formData.append("photo", photo);
    formData.append("quantity", quantity);
    formData.append("suppliercode", suppliercode);
    formData.append("price", price);
    formData.append("date", date);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    try {
      const apiUrl = updateMode
        ? `http://localhost:3001/product/${selectedProduct._id}`
        : "http://localhost:3001/product";

      const response = await axios[updateMode ? "put" : "post"](
        apiUrl,
        formData,
        config
      )
        .then((result) => {
          toast.success(result.data);
          setProductcode("");
          setProductname("");
          description("");
          photo("");
          setQuantity("");
          setSuppliercode("");
          setPrice("");
          setDate("");
          getData();
          setUpdateMode(false);
          setSelectedProduct(null);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  const openModalForUpdate = (product) => {
    setProductcode(product.productcode);
    setProductname(product.productname);
    setDescription(product.description);
    setPhoto(product.photo);
    setQuantity(product.quantity);
    setSuppliercode(product.suppliercode);
    setPrice(product.price);
    const dateValue = new Date(product.date).toISOString().split("T")[0];
    setDate(dateValue);
    setUpdateMode(true); // Set update mode
    setSelectedProduct(product); // Set selected supplier for update
  };

  const openModalForDelete = (product) => {
    setSelectedProduct(product);
  };

  const handleDelete = async (id) => {
    try {
      const data = await axios.delete("http://localhost:3001/product/" + id);
      toast.success(data.data);
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  const clearData = () => {
    setProductcode("");
    setProductname("");
    setDescription("");
    setPhoto("");
    setQuantity("");
    setSuppliercode("");
    setPrice("");
    setDate("");
  };

  const getData = async () => {
    try {
      let apiUrl = "http://localhost:3001/product";
      if (searchQuery.trim() !== "") {
        apiUrl += `/search?productname=${searchQuery}`;
      }
      const data = await axios.get(apiUrl);
      setProductlist(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getDataSupplier = async () => {
    try {
      const data = await axios.get("http://localhost:3001/supplier/active");
      setSupplierlist(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
    getDataSupplier();
  }, [searchQuery]);

  const downloadPdf = () => {
    const doc = new jsPDF();

    const now = new Date();
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const generatedDate = now.toLocaleDateString("en-US", dateOptions);
    const generatedTime = now.toLocaleTimeString("en-US", timeOptions);

    // Titles
    doc.setFontSize(26);
    doc.text("Fashion Elegance", 14, 20);
    doc.setFontSize(12);
    doc.text("Product List Report", 14, 26);
    doc.setFontSize(10);
    doc.text(
      `Generated Date & Time: ${generatedDate} ${generatedTime}`,
      14,
      32
    );

    // Adding a page border
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setLineWidth(0.5);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10); // Draw a rectangle

    // Table setup
    const tableColumn = [
      "Product Code",
      "Supplier Code",
      "Product Name",
      "Added Date",
      "Quantity",
      "Unit Price",
    ];
    const tableRows = [];

    productlist.forEach((item) => {
      const date = formatDate(item.date);
      // Determine if the price and total price are whole numbers or not
      const isPriceWholeNumber = item.price % 1 === 0;

      // Format price with up to 3 decimal places and commas, omitting .000 for whole numbers
      const formattedPrice = isPriceWholeNumber
        ? item.price.toLocaleString("en-US")
        : parseFloat(item.price.toFixed(3)).toLocaleString("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 3,
          });

      const productDetails = [
        item.productcode,
        item.suppliercode,
        item.productname,
        date,
        item.quantity,
        `LKR ${formattedPrice}`,
      ];
      tableRows.push(productDetails);
    });

    // Table styling options
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 38,
      theme: "grid",
      headStyles: { fillColor: [27, 130, 133] }, // Customize head row color
      styles: { cellPadding: 2, fontSize: 8, cellWidth: "wrap" }, // General cell styling
      columnStyles: {
        0: { cellWidth: "auto" },
        1: { cellWidth: "auto" },
        2: { cellWidth: "auto" },
        3: { cellWidth: "auto" },
        4: { cellWidth: "auto" },
        5: { cellWidth: "auto" },
        6: { cellWidth: "auto" },
      },
    });

    doc.save("product_list.pdf");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Product</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/product-dashboard">Dashboard</a>
                  </li>
                  <li className="breadcrumb-item active">Product</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-12">
                {/* Default box */}
                <div className="card card-secondary">
                  <div className="card-header">
                    <h3 className="card-title">Product Details</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-tool"
                        data-card-widget="collapse"
                        title="Collapse"
                      >
                        <i className="fas fa-minus" />
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-2">
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="Search Product by Name"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <div className="col-4"></div>
                      <div className="col-6">
                        <div className="float-right">
                          <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={downloadPdf}
                            style={{ marginRight: "15px" }}
                          >
                            Download Report
                          </button>
                          <button
                            type="button"
                            class="btn btn-outline-secondary btn-sm"
                            data-toggle="modal"
                            data-target="#modal-add"
                          >
                            Add Product
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="card-body table-responsive p-0"
                      style={{ height: 400 }}
                    >
                      <table className="table table-head-fixed text-nowrap">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th className="text-center">Product Code</th>
                            <th className="text-center">Material Supplier</th>
                            <th className="text-center">Product Name</th>
                            <th className="text-center">Added Date</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-right">Unit Price</th>
                            <th className="text-center">Edit</th>
                            <th className="text-center">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productlist.map((item, index) => {
                            // Determine if the price and total price are whole numbers or not
                            const isPriceWholeNumber = item.price % 1 === 0;

                            // Format price with up to 3 decimal places and commas, omitting .000 for whole numbers
                            const formattedPrice = isPriceWholeNumber
                              ? item.price.toLocaleString("en-US")
                              : parseFloat(
                                  item.price.toFixed(3)
                                ).toLocaleString("en-US", {
                                  minimumFractionDigits: 1,
                                  maximumFractionDigits: 3,
                                });

                            // Use the formatDate utility function for displaying the date
                            const displayDate = formatDate(item.date);

                            return (
                              <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td className="text-center">
                                  {item.productcode}
                                </td>
                                <td className="text-center">
                                  {item.suppliercode}
                                </td>
                                <td className="text-center">
                                  {item.productname}
                                </td>
                                <td className="text-center">{displayDate}</td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-right">
                                  LKR {formattedPrice}
                                </td>
                                <td className="text-center">
                                  <button
                                    type="button"
                                    className="btn btn-light mr-1"
                                    data-toggle="modal"
                                    data-target="#modal-add"
                                    onClick={() => openModalForUpdate(item)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      className="bi bi-pencil-square"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                      <path
                                        fillRule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                      />
                                    </svg>
                                  </button>
                                </td>
                                <td className="text-center">
                                  <button
                                    type="button"
                                    className="btn btn-light mr-1"
                                    data-toggle="modal"
                                    data-target="#modal-delete"
                                    onClick={() => openModalForDelete(item)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      className="bi bi-trash-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                    </svg>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* /.card-body */}
                  {/* /.card-footer*/}
                </div>
                {/* /.card */}
              </div>
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
      {/* /.content-wrapper */}

      {/* Add Product */}
      {/* /.modal */}
      <div className="modal fade" id="modal-add">
        <div
          className="modal-dialog"
          style={{
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - (50px * 2))",
            marginTop: "40px",
            marginBottom: "50px",
          }}
        >
          <div className="modal-content dark-mode">
            <div className="modal-header">
              <h4 className="modal-title">Add Product</h4>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  className="form-control bg-secondary"
                  id="productName"
                  placeholder="Enter Product Name"
                  value={productname}
                  onChange={(e) => setProductname(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productDesciption">Product Description</label>
                <textarea
                  type="text"
                  className="form-control bg-secondary"
                  id="productDesciption"
                  placeholder="Enter Product Desciption"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="row">
                {" "}
                {/* Wrap form groups in a row */}
                <div className="col-md-6">
                  {" "}
                  {/* First column */}
                  <div className="form-group">
                    <label htmlFor="productCode">Product Code</label>
                    <input
                      type="text"
                      className="form-control bg-secondary"
                      id="productCode"
                      placeholder="Enter Product Code"
                      value={productcode}
                      onChange={(e) => setProductcode(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="productQuantity">Quantity</label>
                    <input
                      type="text"
                      className="form-control bg-secondary"
                      id="productQuantity"
                      placeholder="Enter Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="supplierCode">Supplier Code</label>
                    <select
                      className="form-control bg-secondary"
                      value={suppliercode}
                      onChange={(e) => setSuppliercode(e.target.value)}
                    >
                      <option value="" disabled selected>
                        - Select One -
                      </option>
                      {supplierlist.map((item) => (
                        <option
                          key={item.suppliercode}
                          value={item.suppliercode}
                        >
                          {item.suppliercode}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="productPrice"> Unit Price</label>
                    <input
                      type="text"
                      className="form-control bg-secondary"
                      id="productPrice"
                      placeholder="Enter Unit Price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  {" "}
                  {/* Third column */}
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      className="form-control bg-secondary"
                      id="birthdate"
                      name="birthdate"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  {" "}
                  {/* Third column */}
                  <div className="form-group">
                    <label>Image</label>
                    <input
                      type="file"
                      className="form-control bg-secondary"
                      id="photo"
                      name="photo"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      style={{ padding: "3.5px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-footer align-right"
              style={{
                padding: "10px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                className="btn btn-outline-danger"
                data-dismiss="modal"
                onClick={clearData}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={handleSubmit}
              >
                Add & Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="modal-delete">
        <div
          className="modal-dialog"
          style={{
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - (50px * 2))",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          <div className="modal-content dark-mode">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this Product?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete.bind(this, selectedProduct?._id)}
                data-dismiss="modal"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* /.modal */}
    </div>
  );
}

export default ProductContent;
