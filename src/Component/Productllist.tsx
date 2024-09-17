// src/Component/ProductList.tsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Component/redux/Store/store";
import { fetchProducts, setPage } from "../Component/redux/Store/productsSlice";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.items);
  const status = useSelector((state: RootState) => state.products.status);
  const error = useSelector((state: RootState) => state.products.error);
  const currentPage = useSelector(
    (state: RootState) => state.products.currentPage
  );
  const pageSize = useSelector((state: RootState) => state.products.pageSize);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Calculate start and end index for current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // Slice the products array to get products for the current page
  const displayProducts =
    products?.[0]?.aaData?.slice(startIndex, endIndex) || [];

  const handlePageChange = (page: number) => {
    if (
      page > 0 &&
      page <= Math.ceil((products?.[0]?.aaData?.length || 0) / pageSize)
    ) {
      dispatch(setPage(page));
    }
  };

  const totalPages = Math.ceil((products?.[0]?.aaData?.length || 0) / pageSize);

  // Generate page numbers for pagination
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (status === "loading") {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-3">
      <h1 className="font-serif text-center text-2xl font-bold mb-6">
        Product List
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {displayProducts.map((product) => {
          // Extract the buyPrice from the first child if available
          const buyPrice = product.childs?.[0]?.buyPrice || "N/A";

          return (
            <div
              key={product.id}
              className="max-w-sm w-60 bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={product.photo}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700">Price: ${buyPrice}</p>
                <p className="text-gray-500">Stock: {product.stock}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-4 items-center">
        <button
          className="px-4 py-2 border bg-black text-white font-serif rounded-l"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`px-4 py-2 ${
              currentPage === page
                ? "bg-black text-white"
                : "bg-white text-black font-serif border"
            } mx-1 rounded`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="px-4 py-2 border bg-black text-white font-serif rounded-r"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
