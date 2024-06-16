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
  const columns = [
    {
      accessorKey: "name",
      header: "Title",
    },
    {
      header: "Term",
      cell: ({ row }) => (
        <>
          {row.original.end_semester.toString() +
            " " +
            row.original.end_year.toString()}{" "}
          {console.log(
            row.original.end_semester.toString() +
              " " +
              row.original.end_year.toString()
          )}
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
      cell: ({ row }) => <>{row.original.group_id.toString()}</>,
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

  function rowClick(project) {
    window.open("/project?id=" + project);

    console.log(table.getState().globalFilter);
  }

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
              <option value="Spring 2021">Spring 2021</option>
              <option value="Summer 2021">Summer 2021</option>
              <option value="Fall 2021">Fall 2021</option>
              <option value="Spring 2022">Spring 2022</option>
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
            <input
              type="text"
              name="Search"
              placeholder="Search..." /*value={search} onChange={(e) => setSearch(e.target.value)}*/
            />
          </div>

          <div className="SearchResults"></div>
        </div>

        <br />

        <table id="tanstackTable" align="center">
          <thead key="Header">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
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
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.original.group_id}
                  onClick={() => rowClick(row.original.project_id)}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.getValue() + "_" + row.original.group_id}
                        onClick={console.log(cell.getValue())}
                      >
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

        <div className="GridContainer">
          <div className="leftButtons">
            <button
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
          </div>

          <div className="rightButtons">
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
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
