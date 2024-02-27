import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import UploadModel from "../components/UploadModel";
import { IoSearchOutline } from "react-icons/io5";
import ListData from "../components/ListData";
import MapView from "../components/MapView";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [active, setActive] = useState("list");
  const [openModel, setOpenModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // <---------------Get Employee Data--------------->
  const getEmployeeData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.findofficers.com/hiring_test/get_all_employee`
      );
      if (data) {
        setEmployees(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  // <--------------Search User ------------->
  const filteredEmployees = employees.filter(
    (employee) =>
      (employee.firstName &&
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (employee.email &&
        employee.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (employee.city &&
        employee.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (employee.country &&
        employee.country.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (employee.phoneNumber &&
        employee.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className=" relative w-full min-h-screen py-8 px-3 sm:px-6">
      <div className="flex items-center gap-8 flex-wrap justify-between">
        <div className="">
          <div className="flex items-center justify-center transition-all border border-gray-300 filter drop-shadow-md shadow-gray-200 duration-150 overflow-hidden w-[10rem] h-[2.6rem] rounded-3xl bg-gray-100 shadow-md cursor-pointer ">
            <button
              className={`w-full h-full text-[13px] font-medium ${
                active === "list" ? "bg-teal-500 text-white" : "text-black "
              }`}
              onClick={() => setActive("list")}
            >
              List View
            </button>
            <button
              className={`w-full h-full text-[13px] font-medium ${
                active === "map" ? "bg-teal-500 text-white" : "text-black "
              }`}
              onClick={() => setActive("map")}
            >
              Map View
            </button>
          </div>
        </div>
        <div className="flex items-center justify-end w-full gap-1">
          <button
            className=" cursor-pointer text-[16px] rounded-md flex items-center gap-1 text-white h-[2.7rem] px-4 shadow-md hover:shadow-lg shadow-gray-200 hover:shadow-gray-300 transition duration-150 bg-teal-500 hover:bg-teal-600"
            onClick={() => setOpenModel(true)}
          >
            <FaPlus className="h-4 w-4 text-white" />
            Worker
          </button>
          {active === "list" && (
            <div className="relative w-[15rem] h-[2.7rem] ">
              <span className="absolute top-[.6rem] left-1">
                <IoSearchOutline className="h-6 w-6 text-gray-300" />
              </span>
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-full rounded-md shadow-sm border-2 border-gray-300 outline-none pl-7 text-gray-900 pr-2"
              />
            </div>
          )}
        </div>
      </div>
      {/* List & Map View */}
      <div className="w-full h-full mt-1">
        {active === "list" ? (
          <ListData
            employees={searchQuery ? filteredEmployees : employees}
            loading={loading}
          />
        ) : (
          <MapView employees={searchQuery ? filteredEmployees : employees} />
        )}
      </div>

      {/* Add Employee Data */}
      {openModel && (
        <div className="fixed top-0 left-0 z-[50] px-1 py-4 w-full h-full bg-black/50 flex items-center justify-center ">
          <UploadModel
            setOpenModel={setOpenModel}
            getEmployeeData={getEmployeeData}
          />
        </div>
      )}
    </div>
  );
}
