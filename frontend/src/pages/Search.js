import React from "react";
import CsFooter from "../components/CsFooter";
import GenericHeader from "../components/GenericHeader";
import "../css/Search.css";
import { useState, useEffect } from "react";
import ProjectDetails from "../components/ProjectDetails";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";

function Search() {
  const [user, setUser] = useState("public");
  const [projects, setProjects] = useState([
    {
      /*
      description:
        "Remote controlled robot that autonomously detects and fires at specific targets using Nerf guns.",
      end_semester: "Fall",
      end_year: 2017,
      group_id: 59,
      name: "12c: Lockheed Battlebot",
      project_id: 332,
      sponsor: "Lockheed Martin",
      sponsor_contact: null,
  */
    },
  ]);
  const columns = [
    {
      accessorKey: "name",
      header: "Title",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Term",
      cell: ({ row }) => (
        <p>{row.original.end_semester + " " + row.original.end_year}</p>
      ),
    },
    {
      accessorKey: "sponsor",
      header: "Sponsor",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "group_id",
      header: "Key Words",
      cell: (props) => <p>{props.getValue()}</p>,
    },
  ];

  const [pagination, setPagination] = useState({
    pageIndex: 1, //initial page index
    pageSize: 10, //default page size
  });

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 1, //custom initial page index
        pageSize: 15, //custom default page size
      },
    },
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch("http://localhost:5000/api/project");

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const json = await response.json();

      if (response.ok) {
        setProjects(json);
      }
    };

    fetchProjects();
  }, []);

  function getUser() {
    return user;
  }

  useEffect(() => {
    // May be needed to run functions in the return if they give loading issues
  }, []);

  return (
    <>
      <GenericHeader background={true} user={getUser()} />

      <div className="PageBody">
        <br />

        <h1 className="Title">Project Lookup</h1>
        <br />

        <div className="GridContainer">
          <div className="TermBox">
            <h3>Term: </h3>
            <select name="Term" id="Term">
              <option value="Spring_2023">Spring 2023</option>
              <option value="Summer_2023">Summer 2023</option>
              <option value="Fall_2023">Fall 2023</option>
              <option value="Spring_2024">Spring 2024</option>
            </select>
          </div>
          <div className="KeyWordsBox">
            <h3>Key Words: </h3>
            <select name="KeyWords" id="KeyWords">
              <option value="Unity">Unity</option>
              <option value="MERN">MERN</option>
              <option value="Web">Web</option>
              <option value="Simulation">Simulation</option>
            </select>
          </div>
          <div className="SearchTextBox">
            <h3>Search: </h3>
            <input type="text" name="Search" placeholder="Search..." />
          </div>

          <div className="SearchResults"></div>
        </div>

        <br />
        <br />
        <br />

        <table id="tanstackTable" align="center">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        id={header.id}
                        className={header.column.columnDef.header + "Col"}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>

        <br />
        <br />
        <br />
      </div>

      <CsFooter />
    </>
  );
}
export default Search;
