import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./redux/Store/store";
import { fetchBlogs } from "./redux/Store/blogSilce";

const Blogs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const blogs = useSelector((state: RootState) => state.blogs.items);
  const status = useSelector((state: RootState) => state.blogs.status);
  const error = useSelector((state: RootState) => state.blogs.error);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (status === "loading") {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-center text-gray-500">Error: {error}</p>;
  }

  return (
    <div className="p-3 bg-white">
      <div className="flex justify-center gap-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="  blog-post border p-4 rounded shadow-md"
          >
            <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
            <div className="blog-body" />
            <p className="font-serif">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur veniam incidunt iusto quis similique, quisquam
              repellendus.
            </p>
            <p className="mt-1 font-serif"> {blog.posted}</p>
            <p className="mt-1 font-semibold">{blog.by}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
