import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAPI } from "../features/productSlice";

const EditProduct = ({ product, closeModal }) => {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateProductAPI({
        id: product.id,
        updatedData: {
          title,
          price: parseFloat(price),
          category,
        },
      })
    );
    closeModal();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleUpdate} className="space-y-4">
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
          className="w-full bg-yellow-400 text-white py-2 rounded hover:bg-yellow-500"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
