import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../assets/Logofinal.png";
import { IoIosSearch } from "react-icons/io";
import { setSearchName } from "./redux/Store/productsSlice";
import { RootState, AppDispatch } from "./redux/Store/store";
import { fetchProducts } from "./redux/Store/productsSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const search_Name = useSelector(
    (state: RootState) => state.products.search_name
  );
  const [search, setSearch] = useState(search_Name);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(fetchProducts(search));
  }, [dispatch, search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchsSubmit = () => {
    dispatch(setSearchName(search));
    dispatch(fetchProducts(search));
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 border-b border-gray-200">
      <div className="p-5 flex items-center justify-between">
        {/* Logo dan Tautan Navigasi */}
        <div className="flex items-center space-x-10">
          <img src={Logo} alt="Logo" className="w-24 h-auto" />
          <ul className="hidden sm:flex space-x-6 font-serif">
            <li>
              <a href="#" className="text-gray-400 hover:text-black">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-black">
                Information
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-black">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Input pencarian dan ikon */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <input
              value={search}
              onChange={handleSearch}
              type="text"
              placeholder="Type here"
              className="border-none bg-white text-gray-400 px-2 py-1 focus:outline-none focus:ring-0"
            />
            <button
              onClick={handleSearchsSubmit}
              aria-label="Search"
              className="bg-gray-200 p-2 flex items-center justify-center"
            >
              <IoIosSearch size={18} color="gray" />
            </button>
          </div>
          <button className="sm:hidden text-black" onClick={toggleMenu}>
            <FaBars size={18} />
          </button>
        </div>
      </div>

      {/* Menu samping untuk tampilan mobile */}
      <div
        className={`fixed top-0 right-0 w-60 bg-white border border-gray-200 transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } h-full z-50`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <AiOutlineClose size={24} color="gray" />
          </button>
        </div>
        <ul className="flex flex-col items-start p-4 space-y-4 font-serif">
          <li>
            <a href="#" className="text-gray-400 hover:text-black">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-black">
              Brand
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-black">
              Information
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-400 hover:text-black">
              Blog
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
