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
  // Sets up variables we're using
  const [user, setUser] = useState("public");
  const [search, setSearch] = useState("Jake");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [keyWords, setKeyWords] = useState([]);
  const [projects, setProjects] = useState([
    {
      description:
        "Remote controlled robot that autonomously detects and fires at specific targets using Nerf guns.",
      end_semester: "Fall",
      end_year: 2017,
      group_id: 59,
      name: "12c: Lockheed Battlebot",
      project_id: 332,
      sponsor: "Lockheed Martin",
      sponsor_contact: null,
    },
  ]);

  // Sets up table
  const columns = [
    {
      accessorKey: "name",
      header: "Title",
    },
    {
      header: "Term",
      cell: ({ row }) => (
        <>
          {row.original.end_semester +
            " " +
            row.original.end_year}{" "}
        </>
      ),
    },
    {
      accessorKey: "sponsor",
      header: "Sponsor",
    },
    {
      accessorKey: "group_id",
      header: "Key Words",
      cell: ({ row }) => <>{row.original.group_id}</>,
    },
  ];
  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0, //custom initial page index
        pageSize: 15, //custom default page size
      },
    },
  });

  function getProjects() {
    let bodyJSON = {};
    if (search != "") {
      bodyJSON["query"] = search;
      //console.log(bodyJSON);
    }
    let bodyJSONStr = JSON.stringify(bodyJSON);
    //console.log(bodyJSONStr);

    const fetchProjects = async () => {
      const response = await fetch(
        "http://localhost:5000/api/project/searchProjects",
        {
          method: "POST",
          body: bodyJSONStr,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const json = await response.json();

      if (response.ok) {
        setProjects(json);
      }
    };

    fetchProjects();
    console.log("Ran");
  }

  // API request
  useEffect(() => {
    getProjects();
  }, []);

  // Search and filter setters
  function giveSearch(search) {
    setSearch(search);
    getProjects();
  }

  // Getters
  function getUser() {
    return user;
  }

  function getTable() {
    try {
      return (
        <table id="tanstackTable" align="center">
          {/* Table header */}
          <thead key="Header">
            {/* For all header rows... (we only have 1) */}
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {/* For all headers... */}
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        id={header.id}
                        key={header.column.columnDef.header}
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
  
          {/* Table body */}
          <tbody>
            {/* For all rows... */}
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.original.group_id}
                  onClick={() => rowClick(row.original.project_id)}
                >
                  {/* For all cells... */}
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.getValue() + "_" + row.original.group_id}>
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
      );
    } catch (error) {
      <p>Well that didn't work...</p>
    }
  }

  // Handles clicks (in a function because putting debug prints in here on click is really nice)
  function rowClick(project) {
    window.open("/project?id=" + project);
  }

  return (
    <>
      <GenericHeader background={true} user={getUser()} />

      <div className="PageBody">
        <br />

        {/* Title */}
        <h1 className="Title">Project Lookup</h1>
        <br />

        {/* Drop downs */}
        <div className="GridContainer">
          {/* Term */}
          <div className="TermBox">
            <h3>Term: </h3>
            <select name="Term" id="Term">
              <option value="Spring 2021">Spring 2021</option>
              <option value="Summer 2021">Summer 2021</option>
              <option value="Fall 2021">Fall 2021</option>
              <option value="Spring 2022">Spring 2022</option>
            </select>
          </div>

          {/* Key words */}
          <div className="KeyWordsBox">
            <h3>Key Words: </h3>
            <select name="KeyWords" id="KeyWords">
              <option value="Unity">Unity</option>
              <option value="MERN">MERN</option>
              <option value="Web">Web</option>
              <option value="Simulation">Simulation</option>
            </select>
          </div>

          {/* Search */}
          <div className="SearchTextBox">
            <h3>Search: </h3>
            <input
              type="text"
              name="Search"
              placeholder="Search..."
              onChange={(e) => giveSearch(e.target.value)}
            />
          </div>
        </div>
        <br />

        {/* Table */}
        <div align="center">{getTable()}</div>

        {/* Nav buttons */}
        <div className="GridContainer">
          <div className="leftButtons">
            {/* First */}
            <button
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            {/* Prev */}
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
          </div>
          {/* Next */}
          <div className="rightButtons">
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            {/* Last */}
            <button
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
      <CsFooter />
    </>
  );
}
export default Search;
