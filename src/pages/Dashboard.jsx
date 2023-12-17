import React, { useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import AuthContext from "../AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Chatbot from "../components/chatbot";



function Dashboard() {
  const [saleAmount, setSaleAmount] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);


  const [line, setLine] = useState({
    options: {
      chart: {
        id: "line",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        title: {
          text: "Months",
        },
      },
      yaxis: {
        title: {
          text: "Purchase Amount(in Rs)",
        },
      },
    },
    series: [
      {
        name: "series",
        data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
      },
    ],
  });

  const [profit, setProfit] = useState({
    options: {
      chart: {
        id: "line",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        title: {
          text: "Months",
        },
      },
      yaxis: {
        title: {
          text: "Profit(in Rs)",
        },
      },
    },
    series: [
      {
        name: "series",
        data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
      },
    ],
  });

  const [productData, setProductData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        title: {
          text: "Products",
        },
        categories: [],
      },
      yaxis: {
        title: {
          text: "Quantity",
        },
      },
    },
    series: [
      {
        name: "Quantity",
        data: [],
      },
    ],
  });

  const [chart, setChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        title: {
          text: "Months", 
        },
      },
      yaxis: {
        title: {
          text: "Revenue(in Rs)", 
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            style: {
              colors: ["#000000"], // Set the color of the data labels to black
            },
          },
        },
      },
    },
    series: [
      {
        name: "series",
        data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
      },
    ],
  });

  // Update Chart Data
  const updateChartData = (salesData) => {
    setChart({
      ...chart,
      series: [
        {
          name: "Monthly Sales Amount",
          data: [...salesData],
        },
      ],
    });
  };

    // Update Line Data
    const updateLineData = (salesData) => {
      setLine({
        ...line,
        series: [
          {
            name: "Monthly Purchase Amount",
            data: [...salesData],
          },
        ],
      });
    };

    const updateProfitData = (salesData) => {
      setProfit({
        ...profit,
        series: [
          {
            name: "Monthly Purchase Amount",
            data: [...salesData],
          },
        ],
      });
    };
const updateProductGraph=(data)=>{
    const products = data[0].products;
    const quantities = data[0].quantity;

    // Update chart data with fetched data
    setProductData({
      options: {
        ...productData.options,
        xaxis: {
          categories: products,
        },
      },
      series: [
        {
          name: "Quantity",
          data: quantities,
        },
      ],
    });
  };
    

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchTotalSaleAmount();
    fetchTotalPurchaseAmount();
    fetchSuppliersData();
    fetchProductsData();
    fetchMonthlySalesData();
    fetchMonthlyPurchaseData();
    fetchStock();
    fetchProfit();
  }, []);

  // Fetching total sales amount
  const fetchTotalSaleAmount = () => {
    fetch(
      `https://bizminds-backend.onrender.com/api/sales/get/totalsaleamount/${authContext.user}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSaleAmount(data.Total_Sales_Amount)
    }).catch((err) => console.log(err));
  };

  // Fetching total purchase amount
  const fetchTotalPurchaseAmount = () => {
    fetch(
      `https://bizminds-backend.onrender.com/api/purchase/get/totalpurchaseamount/${authContext.user}`
    )
      .then((response) => response.json())
      .then((datas) => setPurchaseAmount(datas.TotalAmount))
      .catch((err) => console.log(err));
  };

  // Fetching all stores data
  const fetchSuppliersData = () => {
    fetch(`https://bizminds-backend.onrender.com/api/suppliers/${0}`)
      .then((response) => response.json())
      .then((datas) => setStores(datas))
      .catch((err) => console.log(err));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`https://bizminds-backend.onrender.com/api/product/getAllProducts`)
      .then((response) => response.json())
      .then((datas) => setProducts(datas))
      .catch((err) => console.log(err));
  };

  // Fetching Monthly Sales
  const fetchMonthlySalesData = () => {
    fetch(`https://bizminds-backend.onrender.com/api/sales/${authContext.user}/12months_sales`)
      .then((response) => response.json())
      .then((salesData) => {
        const twelveMonthsArray = Array.from({ length: 12 }, (_, i) => {
          const foundMonth = salesData.find(data => data._id.month === i + 1);
          return foundMonth ? foundMonth.totalSalesAmount : 0;
        });
        updateChartData(twelveMonthsArray)
      })
      .catch((err) => console.log(err));
  };

  // Fetching Monthly Purchases
  const fetchMonthlyPurchaseData = () => {
    fetch(`https://bizminds-backend.onrender.com/api/purchase/monthwise/${authContext.user}`)
      .then((response) => response.json())
      .then((salesData) => {
        updateLineData(salesData);
      })
      .catch((err) => console.log(err));
  };

  const fetchStock=()=>{
    fetch(`https://bizminds-backend.onrender.com/api/stocks/inventory/${authContext.user}`)
    .then((response) => response.json())
    .then((stockData) => {
      console.log(stockData)
      updateProductGraph(stockData);
    })
    .catch((err) => console.log(err));
  }

  const fetchProfit=()=>{
    fetch(`https://insights-bizminds.onrender.com/monthwiseProfit?merchantId=${authContext.user}`)
    .then((response) => response.json())
    .then((profitData) => {
      console.log(profitData)
      updateProfitData(profitData);
    })
    .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4  p-4 ">
        <article className="flex flex-col gap-4 rounded-lg border  border-gray-100 bg-white p-6  ">
          {/* <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div> */}

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Sales Amount
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                ₹{saleAmount}
              </span>

              {/* <span className="text-xs text-gray-500"> from ₹240.94 </span> */}
            </p>
          </div>
        </article>

        <article className="flex flex-col  gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
          {/* <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div> */}

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Purchase Amount
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                {" "}
                ₹{purchaseAmount}{" "}
              </span>

              {/* <span className="text-xs text-gray-500"> from ₹404.32 </span> */}
            </p>
          </div>
        </article>
        <article className="flex flex-col   gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
          {/* <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div> */}

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Products
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                {" "}
                {products.length}{" "}
              </span>

              {/* <span className="text-xs text-gray-500"> from ₹404.32 </span> */}
            </p>
          </div>
        </article>
        <article className="flex flex-col   gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
          {/* <div className="inline-flex gap-2 self-end rounded bg-red-100 p-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>

            <span className="text-xs font-medium"> 67.81% </span>
          </div> */}

          <div>
            <strong className="block text-sm font-medium text-gray-500">
              Total Suppliers
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                {" "}
                {stores.length}{" "}
              </span>

              {/* <span className="text-xs text-gray-500"> from 0 </span> */}
            </p>
          </div>
        </article>
        <div className="flex bg-white rounded-lg py-8 col-span-full justify-between">
          <div>
            <Chart
              options={chart.options}
              series={chart.series}
              type="bar"
              width="550"
            />
          </div>
          <div>
            <Chart
              options={line.options}
              series={line.series}
              type="line" 
              width="550"
            />
          </div>
        </div>
        <div className="flex bg-white rounded-lg py-8 col-span-full justify-between">
          <div>
            <Chart
              options={profit.options}
              series={profit.series}
              type="line" 
              width="550"
            />
          </div>
          <div>
            <Chart
              options={productData.options}
              series={productData.series}
              type="bar"
              height={350}
              width={500}
            />
          </div>
        </div>
          <Chatbot />
      </div>
    </>
  );
}

export default Dashboard;
