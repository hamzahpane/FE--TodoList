const Footer = () => {
  return (
    <footer className="bg-gray-800 justify-center text-white py-4">
      <div className="container justify-center items-center px-4">
        <div className="text-center ">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
