import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./redux/Store/store";
import { fetchInform } from "./redux/Store/infromasiSlice";

const Informasi = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { item, status, error } = useSelector(
    (state: RootState) => state.infrom
  );

  useEffect(() => {
    dispatch(fetchInform());
  }, [dispatch]);

  if (status === "loading") {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-center text-gray-500">Error: {error}</p>;
  }

  if (!item) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  return (
    <div className="p-4 bg-white">
      <div className="max-w-sm mx-auto">
        <div className="border p-4 rounded shadow-md">
          <h2 className="text-lg font-bold mb-2">{item.page_title}</h2>
          <img
            src={`${item.basePathImage}/${item.page_img}`}
            alt={item.page_title}
            className="mb-2 w-full h-auto rounded"
          />
          <p className="font-serif">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur veniam incidunt iusto quis similique, quisquam
            repellendus.
          </p>
          <p className="mt-2 font-semibold">{item.page_status}</p>
        </div>
      </div>
    </div>
  );
};

export default Informasi;
