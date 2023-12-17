import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import logo from "../../public/bizzsense.jpg";

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Inventory", href: "/inventory", current: false },
  { name: "Purchase Details", href: "/purchase-details", current: false },
  { name: "Sales", href: "/sales", current: false },
  { name: "Manage Suppliers", href: "/manage-store", current: false },
];

const userNavigation = [{ name: "Sign out", href: "./login" }];


const Dropdown=()=>{

  const authContext = useContext(AuthContext);

return (
  <Menu as="div" className="relative">
    <Menu.Button>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-white py-2 pr-5  absolute top-0 right-20">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
      <Menu.Item className="px-2">
        {({ active }) => (
          <button
            className={`${active && 'bg-gray-300'} rounded-md flex justify-start`}
            onClick={() => authContext.signout()}
          > 
              Sign Out
          </button>
        )}
      </Menu.Item>
    </Menu.Items>
    </Transition>
  </Menu>
)
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const authContext = useContext(AuthContext);
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="min-h-full bg-[#1F2329]">
        <div className="flex justify-between items-center gap-2 px-10">
          <img
            className="h-12 w-58"
            src={logo} 
            alt="Inventory Management System"
          />
          <Dropdown />
        </div>

      </div>
    </>
  );
}
