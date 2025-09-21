import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductAPI } from "../features/productSlice";

const AddProduct = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);

  const handleAddProduct = (e) => {
    e.preventDefault();
    dispatch(
      addProductAPI({
        title,
        price: parseFloat(price),
        category,
      })
    );
    // Reset form
    setTitle("");
    setPrice("");
    setCategory("");
    // Close modal
    closeModal();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleAddProduct} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
