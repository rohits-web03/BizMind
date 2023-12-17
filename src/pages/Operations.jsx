import React, { useContext, useEffect, useState, Fragment } from 'react';
import AuthContext from "../AuthContext";
import { Menu, Transition} from '@headlessui/react'
import EditOperationDetails from '../components/EditOperations';
import AddOperationDetails from '../components/AddOperations';

const Dropdown=({editOps,deleteOps,handleStatus,handleMove})=>{
    const {merchant_id,operation_id,update}=handleMove;
    const handleChangeStatus=(destination)=>{
        fetch(`https://bizminds-backend.onrender.com/api/operations/move-operation/${merchant_id}/${operation_id}/${destination}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(data => alert(data["message"]))
            .catch(error => {
              alert("Process Failed");
              console.log("Error while changing status:", error);
            });
          
    }
  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      </Menu.Button>
      <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
      <Menu.Items className="flex flex-col absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        
        {["backlog","placed","delivered","cancelled"].map((status)=>{
            if(status!= handleStatus){
            return (
                <Menu.Item className="px-2 flex justify-start" key={status}>
                    {({ active }) => (
                        <button
                        className={`${active && 'bg-blue-500'} rounded-md`}
                        onClick={()=>{
                            handleChangeStatus(status)
                            setTimeout(()=>{update()},1000)
                        }}
                        >
                        Move to {status.charAt(0).toUpperCase()+status.slice(1)}
                        </button>
                    )}
                </Menu.Item>)
            }
        })}
        <Menu.Item className="px-2">
          {({ active }) => (
            <button
              className={`${active && 'bg-blue-500'} rounded-md flex justify-start`}
              onClick={()=>editOps()}
            > 
                Edit
            </button>
          )}
        </Menu.Item>
        <Menu.Item className="px-2">
          {({ active }) => (
            <button
              className={`${active && 'bg-blue-500'} rounded-md flex justify-start`}
              onClick={deleteOps}
            > 
                Delete
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
      </Transition>
    </Menu>
  )
}

const Card = ({ id,product, supplier, quantity, handleEdit, handleDelete, status, handleMove}) => (
  <div className="flex flex-col shadow rounded-lg p-4 m-4 bg-[#f7f7f8] h-[100%] relative text-md">
    <div className='flex justify-between gap-4 pl-4'>
        <div className='flex justify-start gap-3'>
            <p>{id}</p>
            <h3>{product}</h3>
        </div>
        <div className=''>
            <Dropdown editOps={handleEdit} deleteOps={handleDelete} handleStatus={status} handleMove={handleMove}/>
        </div>
    </div>
    <div className='flex flex-wrap justify-between gap-2 absolute bottom-0 w-[90%] p-4'>
      <p className=''>{supplier}</p>
      <p>{quantity}</p>
    </div>
  </div>
);

const Operations_Overview = () => {
  const [backlogItems, setBacklogItems] = useState([{product:'',supplier:'',quantity:'',date:''}]);
  const [placedItems, setPlacedItems] = useState([{product:'',supplier:'',quantity:'',date:''}]);
  const [deliveredItems, setDeliveredItems] = useState([{product:'',supplier:'',quantity:'',date:''}]);
  const [paymentInfo, setPaymentInfo] = useState([{product:'',supplier:'',quantity:'',date:''}]);
  const [inputField,setInputField]=useState({backlog:null,placed:null,delivered:null,payment:null});
  const [showInputModal,setShowInputModal]=useState(false);
  const [type,setType]=useState(null);
  const [Update,setUpdate]=useState(true);
  const [showEditModal,setShowEditModal]=useState(false);

  const handleInputModal=()=>{
    setShowInputModal(!showInputModal);
  }

  const handleEditModal=()=>{
    setShowEditModal(!showEditModal);
  }

  const authContext = useContext(AuthContext);

  useEffect(()=>{
    fetchOperations();
  },[Update]);

  const handlePageUpdate=()=>{
    console.log("Updating Page")
    setUpdate(!Update);
  }

  const fetchOperations=()=>{
        fetch(`https://bizminds-backend.onrender.com/api/operations/get/${authContext.user}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data["operations"][0]);
          setBacklogItems(data["operations"][0].backlog);
          setPlacedItems(data["operations"][0].placed);
          setDeliveredItems(data["operations"][0].delivered);
          setPaymentInfo(data["operations"][0].cancelled)
      }).catch((err) => console.log(err));
  };

  const handleEdit=()=>{
    handleEditModal();
  }

  const handleDelete=()=>{

  }

  return (
    <div className="overflow-hidden h-screen w-full">
      <h1 className="text-4xl text-center p-4 font-serif">Operations Overview</h1>
      <div className="flex sm:flex-wrap md:flex-nowrap h-[90%]">
        {showInputModal && <AddOperationDetails handleInputModal={handleInputModal} authContext={authContext} type={type} handleUpdate={handlePageUpdate} setType={setType}/>}
        <div className="w-full md:w-1/4 p-4 outline-1 outline flex flex-col m-4 relative bg-[#e2e0e0] rounded-xl h-[95%]">
            <div className='font-mono text-2xl flex flex-1 justify-start relative'>
                <h2>Backlog</h2>
                <button className="absolute top-0 right-0" onClick={() => {
                    setShowInputModal(true);
                    setType("backlog");
                    // handleAddCard('payment', { product: 'New Payment Info', supplier: '' ,price:''})
                }
                }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 border-black border rounded-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
          </div>
          <div className='mb-4 absolute top-12 w-[90%] h-[15%]'>
            {backlogItems.map((item, index) => {
                return (
                showEditModal && <EditOperationDetails handleEditModal={handleEditModal} authContext={authContext} operation_id={item.operation_id}  opObject={{product:item.product,supplier:item.supplier,quantity:item.quantity}} handleUpdate={handlePageUpdate}/>,
                <Card key={index} id={item.operation_id} product={item.product} supplier={item.supplier} quantity={item.quantity} handleEdit={handleEdit} handleDelete={handleDelete} status="backlog" handleMove={{merchant_id:authContext.user,operation_id:item.operation_id,update:handlePageUpdate}}/>)
            })}
          </div>
        </div>
        <div className="w-full md:w-1/4 p-4 outline-1 outline flex flex-col  m-4 relative bg-[#e2e0e0] rounded-xl h-[95%]">
          <div className='font-mono text-2xl flex flex-1 justify-start relative'>
            <h2>Placed</h2>
            <button className="absolute top-0 right-0" onClick={() => {
                setShowInputModal(true);
                setType("placed");
                // handleAddCard('payment', { product: 'New Payment Info', supplier: '' ,price:''})
            }
            }>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 border-black border rounded-full">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </button>
          </div>
          <div className='mb-4 absolute top-12 w-[90%] h-[15%]'>
          {placedItems.map((item, index) => (
            <Card key={index} id={item.operation_id} product={item.product} supplier={item.supplier} quantity={item.quantity} handleEdit={handleEdit} handleDelete={handleDelete} status="placed" handleMove={{merchant_id:authContext.user,operation_id:item.operation_id,update:handlePageUpdate}}/>
          ))}
          </div>
        </div>
        <div className="w-full md:w-1/4 p-4 outline-1 outline flex flex-col  m-4 relative bg-[#e2e0e0] rounded-xl h-[95%] ">
            <div className='font-mono text-2xl flex flex-1 justify-start relative'>
                <h2>Delivered</h2>
                <button className="absolute top-0 right-0" onClick={() => {
                    setShowInputModal(true);
                    setType("delivered");
                    // handleAddCard('payment', { product: 'New Payment Info', supplier: '' ,price:''})
                }
                }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 border-black border rounded-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
          </div>
          <div className='mb-4 absolute top-12 w-[90%] h-[15%]'>
          {deliveredItems.map((item, index) => (
            <Card key={index} id={item.operation_id} product={item.product} supplier={item.supplier} quantity={item.quantity} handleEdit={handleEdit} handleDelete={handleDelete} status="delivered" handleMove={{merchant_id:authContext.user,operation_id:item.operation_id,update:handlePageUpdate}}/>
          ))}
          </div>
        </div>
        <div className="w-full md:w-1/4 p-4 outline-1 outline flex flex-col  m-4 relative bg-[#e2e0e0] rounded-xl h-[95%]">
            <div className='font-mono text-2xl flex flex-1 justify-start relative'>
                <h2>Cancelled</h2>
                <button className="absolute top-0 right-0" onClick={() => {
                    setShowInputModal(true);
                    setType("cancelled");
                    // handleAddCard('payment', { product: 'New Payment Info', supplier: '' ,price:''})
                }
                }>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 border-black border rounded-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
          </div>
          <div className='mb-4 absolute top-12 w-[90%] h-[15%]'>
          {paymentInfo.map((item, index) => (
            <Card key={index} id={item.operation_id} product={item.product} supplier={item.supplier} quantity={item.quantity} handleEdit={handleEdit} handleDelete={handleDelete} status="cancelled" handleMove={{merchant_id:authContext.user,operation_id:item.operation_id,update:handlePageUpdate}}/>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operations_Overview;
