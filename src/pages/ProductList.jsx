import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts , deleteProductAPI } from "../features/productSlice";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [showModal, setShowModal] = useState(false); // modal state
const [editModal, setEditModal] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product List</h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Product
        </button>
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border px-4 py-2">{p.id}</td>
              <td className="border px-4 py-2">{p.title}</td>
              <td className="border px-4 py-2">${p.price}</td>
              <td className="border px-4 py-2">{p.category}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
  onClick={() => {
    setSelectedProduct(p);
    setEditModal(true);
  }}
  className="px-2 py-1 bg-yellow-400 text-white rounded"
>
  Edit
</button>

{/* Edit Modal */}
{editModal && selectedProduct && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
      <button
        onClick={() => setEditModal(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        ✕
      </button>
      <EditProduct
        product={selectedProduct}
        closeModal={() => setEditModal(false)}
      />
    </div>
  </div>
)}
               <button
  onClick={() => dispatch(deleteProductAPI(p.id))}
  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
>
  Delete
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-4">Total Records: {products.length}</p>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <AddProduct closeModal={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
