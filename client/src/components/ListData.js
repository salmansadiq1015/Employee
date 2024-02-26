import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { format } from "date-fns";
import Loader from "./Loader";

export default function ListData({ employees, loading }) {
  const columns = [
    { field: "id", headerName: "Employee ID", flex: 0.2 },
    {
      field: "avatar",
      headerName: "Employee Avatar",
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <img
              src={params?.row.avatar ? params?.row.avatar : "/profile.jpeg"}
              layout="fill"
              objectFit="contain"
              className="w-[2.5rem] h-[2.5rem] rounded-full border border-gray-400 shadow-md shadow-gray-300"
              alt="Icon"
            />
          </>
        );
      },
    },
    { field: "FullName", headerName: "Full Name", flex: 0.4 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "phone", headerName: "Phone Number", flex: 0.3 },
    { field: "city", headerName: "City", flex: 0.3 },
    { field: "country", headerName: "Country", flex: 0.3 },
    { field: "created_at", headerName: "Created_At", flex: 0.3 },
  ];

  const rows = [];

  if (employees && Array.isArray(employees)) {
    employees.forEach((emp, i) => {
      if (emp) {
        const formattedDate = format(new Date(emp?.createdAt), "dd-MM-yyyy");
        const empObject = {
          id: emp?.employeeID,
          avatar: emp?.profilePicture,
          FullName: emp?.firstName + " " + emp?.lastName,
          email: emp?.email,
          phone: emp?.phoneNumber,
          city: emp?.city,
          country: emp?.country,
          created_at: formattedDate,
        };

        rows.push(empObject);
      }
    });
  }

  return (
    <div className="w-full h-full overflow-x-auto ">
      {/* <table className="w-full c">
        <thead className="border-b  ">
          <tr className="py-2 px-2">
            <th className="text-[17px] text-gray-900 font-semibold text-start">
              Worker
            </th>
            <th className="text-[17px] text-gray-900 font-semibold text-start">
              Email
            </th>
            <th className="text-[17px] text-gray-900 font-semibold text-start">
              Phone
            </th>
            <th className="text-[17px] text-gray-900 font-semibold text-start">
              City
            </th>
            <th className="text-[17px] text-gray-900 font-semibold text-start">
              Country
            </th>
            <th className="text-[17px] text-gray-900 font-semibold text-end">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className=" flex flex-col gap-4 mt-[1rem]">
          {employees?.map((emp) => (
            <tr
              key={emp?.employeeID}
              className="border flex border-gray-300 shadow-md rounded-md w-full py-2 px-2"
            >
              <td className="text-[15px] font-medium text-gray-800 flex items-center gap-2">
                <img
                  src={
                    emp?.profilePicture ? emp?.profilePicture : "/profile.jpeg"
                  }
                  alt="Profile"
                  className="w-[3rem] h-[3rem] rounded-full border border-gray-400 object-fill shadow-md shadow-gray-300"
                />
                <div className="">
                  {emp?.firstName} {emp?.lastName}
                </div>
              </td>
              <td>{emp?.email}</td>{" "}
            </tr>
          ))}
        </tbody>
      </table> */}
      {/* Employee Data */}
      {loading ? (
        <div className="">
          <Loader />
        </div>
      ) : (
        <div className="w-full pb-[1rem] min-w-[700px] ">
          <Box
            m="40px 0 0 0"
            height="68vh"
            width="98%"
            boxShadow=".3rem .3rem .4rem rgba(0,0,0,.3)"
            filter="drop-shadow(0rem 0rem .6rem .1rem rgb(0, 149, 255))"
            overflow={"auto"}
            sx={{
              "& .MuiDataGrid-root": {
                border: `2px solid #555`,
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: "#fff",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "#000",
              },
              "& .MuiDataGrid-row": {
                color: "#000",
                borderBottom: `2px solid #000`,
              },
              "& .MuiTablePagination-root": {
                color: "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "rgb(0, 207, 138)",
                color: "#",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#fff",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "rgb(0, 207, 138)",
                color: "#000",
                borderBottom: "none",
              },
              "& .MuiCheckbox-root": {
                color: "#000",
              },
              "& .MuiCheckbox-root:nth-child(1)": {
                color: "#000",
              },
              "& .MuiDataGrid--toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid
              class="light:text-black dark:text-white "
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 6 },
                },
              }}
              pageSizeOptions={[5, 10, 20, 50]}
              checkboxSelection
            />
          </Box>
          {/* Mobile Format */}
        </div>
      )}
    </div>
  );
}
