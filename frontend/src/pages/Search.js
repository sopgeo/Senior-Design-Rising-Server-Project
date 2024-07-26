/* * * * * * * * * *
 *     Imports     *
 * * * * * * * * * */
import React from "react";
import CsFooter from "../components/CsFooter";
import GenericHeader from "../components/GenericHeader";
import "../css/Search.css";
import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Path from "../components/Path";
import Select from "react-select";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

/* * * * * * * * * *
 *     Search      *
 * * * * * * * * * */
function Search() {
  // Sets up variables we're using
  const [timer, setTimer] = useState("");
  const [user, setUser] = useState(
    localStorage.getItem("user") != null &&
      JSON.parse(localStorage.getItem("user")).hasOwnProperty("type")
      ? JSON.parse(localStorage.getItem("user")).type
      : null
  );
  const [search, setSearch] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [allKeyWords, setAllKeyWords] = useState([]);
  const [keyWords, setKeyWords] = useState([]);
  const [projects, setProjects] = useState([]);
  const [terms, setTerms] = useState([]);
  const [first, setFirst] = useState(true);

  /* * * * * * * * * *
   * API Req + Basic *
   * * * * * * * * * */
  function getProjects(query, semester, year, keys) {
    //console.log(keys);
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
    if (keys.length > 0) {
      bodyJSON["tags"] = keys;
    }
    let bodyJSONStr = JSON.stringify(bodyJSON);
    //console.log(bodyJSONStr);

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
        //throw new Error("Failed to fetch projects" + response);
        setProjects([]);
      }

      const json = await response.json();

      if (response.ok) {
        setProjects(json);
        //console.log(json);
      }
    };

    fetchProjects();
  }

  function getAllKeyWords() {
    const fetchTags = async () => {
      const response = await fetch(Path.buildPath("api/tag/tags", true));
      const json = await response.json();
      if (response.ok) {
        let kwl = [];
        json.forEach((val) => {
          let temp = {};
          temp["value"] = val.name;
          temp["label"] = val.name;
          kwl.push(temp);
        });
        //console.log(kwl);
        //console.log(json);
        setAllKeyWords(kwl);
      }
    };

    fetchTags();
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
        <div className="DropDownContainer">
          {getTerms()}
          {getKeyWords()}
          {getSearchBar()}
        </div>
        <br />
      </>
    );
  }

  function listTerms() {
    let date = new Date();
    let termsArr = [];

    for (let i = 0; i <= date.getFullYear() - 2016; i++) {
      let tempSpring = {};
      tempSpring["value"] = "Spring " + (i + 2016).toString();
      tempSpring["label"] = "Spring " + (i + 2016).toString();
      termsArr.push(tempSpring);

      let tempSummer = {};
      tempSummer["value"] = "Summer " + (i + 2016).toString();
      tempSummer["label"] = "Summer " + (i + 2016).toString();
      termsArr.push(tempSummer);

      let tempFall = {};
      tempFall["value"] = "Fall " + (i + 2016).toString();
      tempFall["label"] = "Fall " + (i + 2016).toString();
      termsArr.push(tempFall);
    }

    let temp = {};
    temp["value"] = "";
    temp["label"] = "All";
    termsArr.push(temp);

    termsArr.reverse();

    setTerms(termsArr);
  }

  function getTerms() {
    return (
      <>
        <div className="TermTitle">
          <h3>Term: </h3>
        </div>
        <div className="TermBox">
          <Select
            defaultValue={{ value: "", label: "All" }}
            onChange={giveTerm}
            options={terms}
          />
        </div>
      </>
    );
  }

  function getKeyWords() {
    return (
      <>
        <div className="KeyWordsTitle">
          <h3>Key Words: </h3>
        </div>

        <div className="KeyWordsBox">
          <Select
            defaultValue={keyWords}
            onChange={giveKeyWords}
            options={allKeyWords}
            isMulti="true"
          />
        </div>
      </>
    );
  }

  function getSearchBar() {
    return (
      <>
        <div className="SearchTitle">
          <h3>Search: </h3>
        </div>
        <div className="SearchBox">
          <input
            type="text"
            name="Search"
            placeholder="Search..."
            onChange={(e) => giveSearch(e.target.value)}
          />
        </div>
      </>
    );
  }

  /* * * * * * * * * *
   * Search Function *
   * * * * * * * * * */
  function giveTerm(term) {
    let termArr = term.value.split(" ");
    setSemester(termArr[0]);
    setYear(termArr[1]);
    setFirst(false);
    getProjects(search, termArr[0], termArr[1], keyWords);
  }

  function giveSearch(searchQuery) {
    setSearch(searchQuery);
    if (timer != "") {
      clearTimeout(timer);
    }
    /* This time delay was chosen via testing so peck typing does
    not overload the api limits, increase if too many api calls */
    setTimer(
      setTimeout(() => {
        setFirst(false);
        getProjects(searchQuery, semester, year, keyWords);
      }, 750)
    );
    clearTimeout(timer);
  }

  function giveKeyWords(selected) {
    let keyWordsArr = [];
    selected.forEach((word) => {
      keyWordsArr.push(word.value);
    });
    setKeyWords(keyWordsArr);
    setFirst(false);
    getProjects(search, semester, year, keyWordsArr);
  }

  /* * * * * * * * * *
   *  Results Table  *
   * * * * * * * * * */
  const columns = getColumnsPermissions();

  function getColumnsPermissions() {
    if (user == "admin" || user == "coordinator") {
      return [
        {
          header: "Title",
          cell: ({ row }) => (
            <>
              {row.original.files.length > 0
                ? "\u{1F4C4} " + row.original.name
                : row.original.name}{" "}
            </>
          ),
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
        {
          header: "Actions",
          cell: ({ row }) => (
            <img
              className="delete-icon"
              src={require("../images/delete-button.png")}
              width="22px"
              height="22px"
              onClick={() => deleteProject(row.original.project_id)}
              style={{ cursor: "pointer" }}
            />
          ),
        },
      ];
    } else {
      return [
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
    }
  }

  const deleteProject = async (project_id) => {
    try {
      const token = JSON.parse(localStorage.getItem('user')).token
      const response = await fetch(
        Path.buildPath("api/project/deleteProject", true),
        {
          method: "POST",
          body: JSON.stringify({ project_id: project_id }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      if (response.ok) {
        await fetch(Path.buildPath("api/file/deleteFile", true), {
          method: "POST",
          body: JSON.stringify({ project_id: project_id }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        let index = projects.findIndex(
          (proj) => proj.project_id === project_id
        );
        if (index == 0) {
          setProjects(projects.slice(1, projects.length));
        } else {
          setProjects(
            projects
              .slice(0, index)
              .concat(projects.slice(index + 1, projects.length))
          );
        }
      }
    } catch (error) {
      console.log("failure to delete project with project_id " + project_id);
    }
  };

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
    //console.log(first);
    if (projects.length != 0) {
      return (
        <div align="center">
          <table id="tanstackTable" align="center">
            {getHeader()}
            {getBody()}
          </table>
        </div>
      );
    } else if (first) {
      return <Skeleton count={15}/>;
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
            <tr key={row.original.project_id + "_" + row.original.group_id}>
              {/* For all cells... */}
              {row.getVisibleCells().map((cell) => {
                if (cell.column.id == "Actions") {
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                } else {
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
                      onClick={() => rowClick(row.original.project_id)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                }
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
              {"| <"}
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
              {"> |"}
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
    listTerms();
    getAllKeyWords();
    getProjects(search, semester, year, keyWords);
  }, []);

  /* * * * * * * * * *
   *   Design Page   *
   * * * * * * * * * */
  return (
    <>
      <GenericHeader background={true} user={getUser()} />
      {getTitle()}
      <div className="PageBody">
        {getDropDowns()}
        {getTable()}
        {getButtons()}
      </div>
      <CsFooter />
    </>
  );
}
export default Search;
