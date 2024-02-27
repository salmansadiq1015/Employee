import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { TbLoader3 } from "react-icons/tb";

export default function UploadModel({ setOpenModel, getEmployeeData }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://api.findofficers.com/hiring_test/add_employee`,
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          latitude,
          longitude,
          employeeID,
          city,
          country,
        }
      );
      if (data) {
        getEmployeeData();
        setLoading(false);
        toast.success("Employee added successfully!");
        setOpenModel(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className="py-6 px-2 sm:px-4 w-[36rem] rounded-lg shadow-md hover:shadow-xl bg-white ">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-teal-500">Add New Worker</h3>
        <span className="p-1 hover:border border-gray-300 hover:bg-gray-100 rounded-md cursor-pointer hover:shadow-md shadow-gray-300 ">
          <IoClose
            className="h-6 w-6 text-teal-500 hover:text-teal-600 cursor-pointer transition duration-150"
            onClick={() => setOpenModel(false)}
          />
        </span>
      </div>

      <form
        onSubmit={handleUpload}
        className="flex flex-col gap-4 mt-6 max-h-[460px] sm:max-h-[520px] overflow-y-auto pb-[1rem] sm:py-0"
      >
        <div className="flex flex-col gap-1 w-full">
          <span className="text-[16px] font-medium text-gray-950">
            Employee Id <span className="text-red-500">*</span>
          </span>
          <input
            type="text"
            placeholder="Employee Id"
            value={employeeID}
            required
            onChange={(e) => setEmployeeID(e.target.value)}
            className="w-full h-[2.7rem] px-3 border-2 border-gray-500 rounded-md shadow-md outline-none shadow-gray-300 filter drop-shadow-md text-black"
          />
        </div>
        {/* 1 */}
        <div className="left grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[16px] font-medium text-gray-950">
              First Name <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              required
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full h-[2.7rem] px-3 border-2 border-gray-500 rounded-md shadow-md outline-none shadow-gray-300 filter drop-shadow-md text-black"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[16px] font-medium text-gray-950">
              Last Name <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              required
              onChange={(e) => setLastName(e.target.value)}
              className="w-full h-[2.7rem] px-3 border-2 border-gray-500 rounded-md shadow-md outline-none shadow-gray-300 filter drop-shadow-md text-black"
            />
          </div>
        </div>
        {/* 2 */}
        <div className="left grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[16px] font-medium text-gray-950">
              Email <span className="text-red-500">*</span>
            </span>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[2.7rem] px-3 border-2 border-gray-500 rounded-md shadow-md outline-none shadow-gray-300 filter drop-shadow-md text-black"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[16px] font-medium text-gray-950">
              Phone Number <span className="text-red-500">*</span>
            </span>
            <input
              type="number"
              placeholder="Phone Number"
              value={phoneNumber}
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full h-[2.7rem] px-3 border-2 border-gray-500 rounded-md shadow-md outline-none shadow-gray-300 filter drop-shadow-md text-black"
            />
          </div>
        </div>
        {/* 3 */}
        <div className="left grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[16px] font-medium text-gray-950">
              Latitude <span className="text-red-500">*</span>
            </span>
            <input
              type="number"
              placeholder="Latitude"
              value={latitude}
              required
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full h-[2.7rem] px-3 border-2 border-gray-500 rounded-md shadow-md outline-none shadow-gray-300 filter drop-shadow-md text-black"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[16px] font-medium text-gray-950">
              Longitude <span className="text-red-500">*</span>
            </span>
            <input
              type="number"
              placeholder="Longitude"
              value={longitude}
              required
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full h-[2.7rem] px-3 border-2 border-gray-500 rounded-md shadow-md outline-none shadow-gray-300 filter drop-shadow-md text-black"
            />
          </div>
        </div>
        {/* 4 */}
        <div className="left grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[16px] font-medium text-gray-950">
              City <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              placeholder="City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-[2.7rem] px-3 border-2 border-gray-500 rounded-md shadow-md outline-none shadow-gray-300 filter drop-shadow-md text-black"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <span className="text-[16px] font-medium text-gray-950">
              Country <span className="text-red-500">*</span>
            </span>
            <input
              type="text"
              placeholder="Country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
              className="w-full h-[2.7rem] px-3 border-2 border-gray-500 rounded-md shadow-md outline-none shadow-gray-300 filter drop-shadow-md text-black"
            />
          </div>
        </div>
        {/*  */}
        <button className=" flex items-center justify-center gap-1 py-2 w-full h-[2.7rem]  rounded-3xl cursor-pointer shadow-md bg-teal-500 hover:bg-teal-600 text-white hover:shadow-xl hover:shadow-gray-300 transition duration-150 ">
          <FaPlus className="h-5 w-5 text-white" />
          Create{" "}
          {loading && <TbLoader3 className="h-5 w-5 text-white animate-spin" />}
        </button>
      </form>
    </div>
  );
}
