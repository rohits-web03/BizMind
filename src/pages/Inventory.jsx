import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../AuthContext";

function Inventory() {
  const [products, setAllProducts] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchProductsData();
  }, []);

  const fetchProductsData = () => {
    fetch(`https://bizminds-backend.onrender.com/api/stocks/inventory/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        // Flatten the nested arrays into a single array of objects with product and quantity
        const flattenedProducts = data.flatMap((entry) => {
          const productQuantity = entry.products.map((product, index) => ({
            product,
            quantity: entry.quantity[index],
          }));
          return productQuantity;
        });
        setAllProducts(flattenedProducts);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-10">
      <table className="w-[50%] divide-y-2 bg-gray-200 text-sm">
        <thead>
          <tr>
            <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">
              Product Sold
            </th>
            <th className="whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900">
              Quantity
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {products && products.map((productData, index) => {
            return (
              <tr key={index}>
                <td className="whitespace-nowrap px-4 py-2  text-gray-900 text-center">
                  {productData.product}
                </td>
                <td className="whitespace-nowrap px-4 py-2  text-gray-900 text-center">
                  {productData.quantity}
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
