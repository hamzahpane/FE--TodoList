import Border from "../components/Border";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1 p-3 ml-52 ">
        <Border />
      </div>
    </div>
  );
};

export default Home;
