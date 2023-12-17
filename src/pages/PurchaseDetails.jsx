import React, { useState, useEffect, useContext } from "react";
import AddPurchaseDetails from "../components/AddPurchaseDetails";
import AuthContext from "../AuthContext";

function PurchaseDetails() {
  const [showPurchaseModal, setPurchaseModal] = useState(false);
  const [purchase, setAllPurchaseData] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [updatePage, setUpdatePage] = useState(true);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchPurchaseData();
    fetchProductsData();
  }, [updatePage]);

  // Fetching Data of All Purchase items
  const fetchPurchaseData = () => {
    fetch(`https://bizminds-backend.onrender.com/api/purchase/get/purchase_data/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setAllPurchaseData(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`https://insights-bizminds.onrender.com/api/stocks/inventory/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].products);
        setAllProducts(data[0].products);
      })
      .catch((err) => console.log(err));
  };

  // Modal for Sale Add
  const addSaleModalSetting = () => {
    setPurchaseModal(!showPurchaseModal);
  };

  
  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        {showPurchaseModal && (
          <AddPurchaseDetails
            addSaleModalSetting={addSaleModalSetting}
            products={products}
            handlePageUpdate={handlePageUpdate}
            authContext = {authContext}
          />
        )}
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Purchase Details</span>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addSaleModalSetting}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Add Purchase
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Product Name
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Supplier ID
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Cost Per Unit
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Quantity Purchased
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Purchase Date
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Total Purchase Amount
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {purchase && purchase.map((element, index) => {
                return (
                  <tr key={element._id}>
                  <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.product_id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      Rice
                    </td>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {element.supplier_id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.cost_price_per_unit}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {element.units_purchased}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {new Date(element.date_purchased).toLocaleDateString() ==
                      new Date().toLocaleDateString()
                        ? "Today"
                        : element.date_purchased}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      Rs {element.total_cost_price}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PurchaseDetails;
