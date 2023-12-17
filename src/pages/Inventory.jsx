import React, { useState, useEffect, useContext } from "react";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import AuthContext from "../AuthContext";
import search_icon from "../assets/search-icon.png";

function Inventory() {

  const [products, setAllProducts] = useState([]);

  const authContext = useContext(AuthContext);
  console.log('====================================');
  console.log(authContext);
  console.log('====================================');

  useEffect(() => {
    fetchProductsData();
    // fetchSalesData();
  }, []);

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`https://bizminds-backend.onrender.com/api/stocks/inventory/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-10">
      <table className="w-[50%] divide-y-2 divide-gray-200 text-sm">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    Product Sold
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                    Quantity
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {products && products.map((element, index) => {
                  return (
                    <tr key={element._id}>
                      <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                        {element.products}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                        {element.quantity}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
        </table>
      </div>
  );
}

export default Inventory;
