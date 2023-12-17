import React, { useState, useEffect, useContext } from "react";
import AddStore from "../components/AddStore";
import AuthContext from "../AuthContext";
import location_icon from "../assets/location-icon.png";
import SupplierProfile from "../components/supplierProfile";

function Store() {
  const [search,setSearch]=useState('');
  const [page,setPage]=useState(1);
  const [showModal, setShowModal] = useState(false);
  const [Suppliers, setAllSuppliers] = useState([]);
  const [showProfile,setShowProfile]=useState(false);

  const authContext = useContext(AuthContext);

  const handleProfile=()=>{
    setShowProfile(!showProfile);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Fetching all Suppliers data
  const fetchData = () => {
    fetch(`https://bizminds-backend.onrender.com/api/suppliers/${0}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllSuppliers(data);
      });
  };

  const modalSetting = () => {
    setShowModal(!showModal);
  };

  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage < (Suppliers.length / 10 + 1) && selectedPage !== page) {
      setPage(selectedPage)
    }
  }

  const handleSearch = (user) => {
    if (search.trim().length === 0 || !keyPressed) {
      return true; // Return all users if the search query is empty or Enter is not pressed
    }
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="col-span-12 lg:col-span-10 flex justify-center ">
      <div className=" flex flex-col gap-5 w-11/12 border-2">
        <div className="flex justify-between">
          <span className="font-bold">Available Suppliers</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
            onClick={modalSetting}
          >
            Add Supplier
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Supplier ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Avg Rating</th>
            </tr>
          </thead>
          <tbody>
            {Suppliers && Suppliers.slice(page*10-10,page*10).map((Supplier)=>(
              <tr onClick={()=>handleProfile()} className="cursor-pointer" key={Supplier._id}>
              
                <td className="px-4 py-2">{Supplier.supplier_id}</td>
                <td className="px-4 py-2">{Supplier.name}</td>
                <td className="px-4 py-2">{Supplier.email}</td>
                <td className="px-4 py-2">{Supplier.phone}</td>
                <td className="px-4 py-2">{Supplier.rating[0]}</td>
              </tr>
            )
            )}
          </tbody>
        </table>
        {Suppliers.length > 0 && (
  <div className="p-2 mt-4 flex justify-center">
    <div
      onClick={() => selectPageHandler(page - 1)}
      className={`px-5 py-3 border cursor-pointer ${
        page > 1 ? "" : "opacity-0"
      }`}
    >
      ◀
    </div>

    {Suppliers.length > 0 &&
      [...Array(Math.ceil(Suppliers.filter((user) => handleSearch(user)).length / 10))].map(
        (_, i) => (
          <div
            key={i}
            className={`px-5 py-3 border cursor-pointer ${
              page === i + 1 ? "bg-gray-300" : ""
            }`}
            onClick={() => selectPageHandler(i + 1)}
          >
            {i + 1}
          </div>
        )
      )}

    <div
      onClick={() => selectPageHandler(page + 1)}
      className={`px-5 py-3 border cursor-pointer ${
        page < Suppliers.filter((user) => handleSearch(user)).length / 10
          ? ""
          : "opacity-0"
      }`}
    >
      ▶
    </div>
  </div>
)}

        {showModal && <AddStore />}
        {showProfile && <SupplierProfile handleProfile={handleProfile} />}
        {/* {Suppliers.map((element, index) => {
          return (
            <div
              className="bg-white w-50 h-fit flex flex-col gap-4 p-4 "
              key={element._id}
            >
              <div>
                <img
                  alt="store"
                  className="h-60 w-full object-cover"
                  src={element.image}
                />
              </div>
              <div className="flex flex-col gap-3 justify-between items-start">
                <span className="font-bold">{element.name}</span>
                <div className="flex">
                  <img
                    alt="location-icon"
                    className="h-6 w-6"
                    src={location_icon}
                  />
                  <span>{element.address + ", " + element.city}</span>
                </div>
              </div>
            </div>
          );
        })} */}
        
      </div>
    </div>
  );
}

export default Store;
