/* * * * * * * * * *
 *     Imports     *
 * * * * * * * * * */
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
import Path from "../components/Path";

/* * * * * * * * * *
 *     Search      *
 * * * * * * * * * */
function Search() {
  // Sets up variables we're using
  const [timer, setTimer] = useState("");
  const [user, setUser] = useState("public");
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [keyWords, setKeyWords] = useState([]);
  const [projects, setProjects] = useState([]);

  /* * * * * * * * * *
   * API Req + Basic *
   * * * * * * * * * */
  function getProjects(query, semester, year, keyWords) {
    let bodyJSON = {};
    if (query != "") {
      bodyJSON["query"] = query;
    }
    if (semester != "") {
      bodyJSON["semester"] = semester;
    }
    if (year != "") {
      bodyJSON["year"] = year;
    }
    let bodyJSONStr = JSON.stringify(bodyJSON);

    const fetchProjects = async () => {
      const response = await fetch(
        Path.buildPath("api/project/searchProjects", true),
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
  }

  function getUser() {
    return user;
  }

  function getTitle() {
    return (
      <>
        <br />
        <h1 className="Title">Project Lookup</h1>
        <br />
      </>
    );
  }

  /* * * * * * * * * *
   *Search Components*
   * * * * * * * * * */
  function getDropDowns() {
    return (
      <>
        <div className="GridContainer">
          {getTerms()}
          {getKeyWords()}
          {getSearchBar()}
        </div>
        <br />
      </>
    );
  }

  function getTerms() {
    let arr = new Array();
    let date = new Date();
    for (let i = 0; i <= date.getFullYear() - 2016; i++) {
      arr = arr.concat([
        "Spring " + (i + 2016).toString(),
        "Summer " + (i + 2016).toString(),
        "Fall " + (i + 2016).toString(),
      ]);
    }

    arr = arr.concat(" ");
    arr = arr.reverse();

    return (
      <div className="TermBox">
        <h3>Term: </h3>
        <select
          name="Term"
          id="Term"
          onChange={(e) => giveTerm(e.target.value)}
        >
          {arr.map((term) => {
            return (
              <option value={term} key={term}>
                {term}
              </option>
            );
          })}
        </select>
      </div>
    );
  }

  function getKeyWords() {
    return (
      <div className="KeyWordsBox">
        <h3>Key Words: </h3>
        <select name="KeyWords" id="KeyWords">
          <option value="Unity">Unity</option>
          <option value="MERN">MERN</option>
          <option value="Web">Web</option>
          <option value="Simulation">Simulation</option>
        </select>
      </div>
    );
  }

  function getSearchBar() {
    return (
      <div className="SearchTextBox">
        <h3>Search: </h3>
        <input
          type="text"
          name="Search"
          placeholder="Search..."
          onChange={(e) => giveSearch(e.target.value)}
        />
      </div>
    );
  }

  /* * * * * * * * * *
   * Search Function *
   * * * * * * * * * */
  function giveTerm(term) {
    let termArr = term.split(" ");
    setSemester(termArr[0]);
    setYear(termArr[1]);
    getProjects(search, termArr[0], termArr[1]);
  }

  function giveSearch(searchQuery) {
    setSearch(searchQuery);
    if (timer != "") {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        getProjects(searchQuery, semester, year);
      }, 750)
    );
    clearTimeout(timer);
  }

  /* * * * * * * * * *
   *  Results Table  *
   * * * * * * * * * */
  const columns = [
    {
      accessorKey: "name",
      header: "Title",
    },
    {
      header: "Term",
      cell: ({ row }) => (
        <>{row.original.end_semester + " " + row.original.end_year} </>
      ),
    },
    {
      accessorKey: "sponsor",
      header: "Sponsor",
    },
    {
      accessorKey: "tags",
      header: "Key Words",
      cell: ({ row }) => {
        try {
          let keys = "";
          for (let i = 0; i < row.original.tags.length; i++) {
            keys = keys.concat(row.original.tags[i].name + ", ");
          }
          keys = keys.slice(0, keys.length - 2);
          return keys;
        } catch {
          return "";
        }
      },
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

  function getTable() {
    if (projects.length != 0) {
      return (
        <div align="center">
          <table id="tanstackTable" align="center">
            {getHeader()}
            {getBody()}
          </table>
        </div>
      );
    } else {
      return <p align="center">Sorry, that query returned no results</p>;
    }
  }

  function getHeader() {
    return (
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
    );
  }

  function getBody() {
    return (
      <tbody>
        {/* For all rows... */}
        {table.getRowModel().rows.map((row) => {
          return (
            <tr
              key={row.original.project_id + "_" + row.original.group_id}
              onClick={() => rowClick(row.original.project_id)}
            >
              {/* For all cells... */}
              {row.getVisibleCells().map((cell) => {
                return (
                  <td
                    key={
                      cell.getValue() +
                      "_" +
                      row.original.name +
                      "_" +
                      row.original.group_id +
                      "_" +
                      cell.column.id
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }

  function rowClick(project) {
    window.open("/project?id=" + project);
  }

  /* * * * * * * * * *
   *   Nav Buttons   *
   * * * * * * * * * */
  function getButtons() {
    return (
      <>
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
      </>
    );
  }

  /* * * * * * * * * *
   *   Update Data   *
   * * * * * * * * * */
  useEffect(() => {
    getProjects(search, semester, year);
  }, []);

  /* * * * * * * * * *
   *   Design Page   *
   * * * * * * * * * */
  return (
    <>
      <GenericHeader background={true} user={getUser()} />
      {getTitle()}
      {getDropDowns()}
      {getTable()}
      {getButtons()}
      <CsFooter />
    </>
  );
}
export default Search;