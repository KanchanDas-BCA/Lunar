import React, { useEffect, useState } from "react";
import customAxios from "../../utils/http";
import Loader from "../../utils/Loader";
import { Link, useNavigate } from "react-router-dom";
import handleCatchError from "../../utils/handleCatchError";
import FeeTopicTableRow from "./FeeTopicTableRow";
import FeeTopicCard from "./FeeTopicCard";
import InsertFeeTopic from "./InsertFeeTopic";

function GetFeeTopic() {
  const navigate = useNavigate();

  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);
  const [isBlockedFetched, setIsBlockedFetched] = useState(false); // Flag for blocked data fetching
  const [searchQuery, setSearchQuery] = useState("");
  const [filterColumn, setFilterColumn] = useState("default");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [isInsertModalOpen, setInsertModalOpen] = useState(false);

  // Toggle blocked data view
  const handleBlockList = () => {
    if (!isBlockedFetched && !showBlocked) {
      fetchBlockedData();
    } else {
      const updatedData = showBlocked
        ? originalData.filter((item) => item.IsActive) // Show active
        : originalData.filter((item) => !item.IsActive); // Show blocked
      setFilteredData(updatedData);
    }
    setShowBlocked(!showBlocked);
    setCurrentPage(1);
  };

  // Fetch fee topics data initially
  const fetchFeeTopic = async () => {
    try {
      setIsLoading(true);
      const response = await customAxios.get(`/FeeTopic/GetList`);
      const dt = await response.data;
      setOriginalData(dt);
      setFilteredData(dt);
    } catch (error) {
      handleCatchError(error, navigate);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch blocked fee topics data
  const fetchBlockedData = async () => {
    try {
      setIsLoading(true);
      const response = await customAxios.get(`/FeeTopic/GetList/true`);
      const dt = await response.data;
      setOriginalData(dt);
      setFilteredData(dt.filter((item) => !item.IsActive)); // Show blocked data immediately
      setIsBlockedFetched(true); // Mark blocked data as fetched
    } catch (error) {
      handleCatchError(error, navigate);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset all filters when blocked and unblocked data toggled
  useEffect(() => {
    setFilterColumn('default');
    setSortOrder('default');
    setSearchQuery('');
  }, [showBlocked]);

  useEffect(() => {
    document.title = "FeeTopic List";
    fetchFeeTopic();
  }, []);

  useEffect(() => {
    
    const updatedData = showBlocked
      ? originalData.filter((item) => !item.IsActive) // Show blocked
      : originalData.filter((item) => item.IsActive); // Show active

    setFilteredData(updatedData);
  }, [showBlocked, originalData]);

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const baseData = showBlocked
      ? originalData.filter((item) => !item.IsActive) // Show blocked
      : originalData.filter((item) => item.IsActive); // Show active

    const filtered = baseData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(query)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  // Handle column filter and sort
  const handleFilterAndSort = () => {
    let updatedData = [...filteredData];

    if (sortOrder === "default" && filterColumn === "default") {
      return;
    }

    if (filterColumn) {
      updatedData = filteredData.filter((item) =>
        item[filterColumn]
          ?.toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder && filterColumn) {
      updatedData.sort((a, b) => {
        const valueA = a[filterColumn]?.toString().toLowerCase();
        const valueB = b[filterColumn]?.toString().toLowerCase();

        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(updatedData);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleFilterAndSort();
  }, [filterColumn, sortOrder, searchQuery]);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <div className="flex justify-center min-[750px]:justify-end gap-8">
            <button
              onClick={() => setInsertModalOpen(true)}
              className="bg-green-700 text-white p-4 rounded-xl flex gap-2 items-center"
            >
              <i className="bx bx-plus-medical"></i>Insert
            </button>
            {isInsertModalOpen && (
              <InsertFeeTopic
                setInsertModalOpen={setInsertModalOpen}
                setOriginalData={setOriginalData}
              />
            )}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded-xl w-4 h-4 cursor-pointer"
                onChange={handleBlockList}
                checked={showBlocked}
              />
              <p>Show Blocked</p>
            </div>
          </div>

          <div className="text-3xl text-center">All Fee Topic List</div>

          <div className="flex justify-between items-center mt-4 gap-4 flex-wrap w-full">
            <input
              type="text"
              className="border p-2 rounded w-screen min-[440px]:w-auto"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />

            <select
              className="border p-2 rounded cursor-pointer"
              onChange={(e) => setFilterColumn(e.target.value)}
              value={filterColumn}
            >
              <option value="default" disabled>
                --Filter by Column--
              </option>
              <option value="TopicName">Topic Name</option>
            </select>

            <select
              className="border p-2 rounded cursor-pointer"
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value="default" disabled>
                --Sort Order--
              </option>
              <option
                value="asc"
                disabled={filterColumn === "default"}
                className={filterColumn === "default" ? "text-red-400" : ""}
              >
                Ascending
              </option>
              <option
                value="desc"
                disabled={filterColumn === "default"}
                className={filterColumn === "default" ? "text-red-400" : ""}
              >
                Descending
              </option>
            </select>
          </div>

          {/* Table view for larger displays FROM 750px */}
          <table className="min-w-full divide-y hidden min-[750px]:table divide-gray-200">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Topic</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRows.length === 0 ? (
                <tr>
                  <td className="text-3xl bg-red-200 py-20 text-center rounded-3xl" colSpan={5}>
                    No data available
                  </td>
                </tr>
              ) : (
                currentRows.map((data, index) => (
                  <FeeTopicTableRow
                    key={data.TopicId}
                    index={indexOfFirstRow + index}
                    data={data}
                    setOriginalData={setOriginalData}
                  />
                ))
              )}
            </tbody>
          </table>

          {/* Card view for mobile */}
          <div className="min-[750px]:hidden flex flex-col">
            {currentRows.length === 0 ? (
              <p className="text-3xl bg-red-200 py-20 text-center rounded-3xl">
                No data available
              </p>
            ) : (
              currentRows.map((data, index) => (
                <FeeTopicCard
                  key={data.TopicId}
                  index={indexOfFirstRow + index}
                  data={data}
                  setOriginalData={setOriginalData}
                />
              ))
            )}
          </div>

           {/* Pagination */}
           <div className="flex justify-between items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="p-2 border rounded disabled:bg-blue-300 bg-blue-600 disabled:hover:bg-blue-300 text-white hover:bg-blue-800 "
            >
              Previous
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`p-2 border rounded ${currentPage === idx + 1 ? "bg-blue-600 text-white" : "hover:bg-blue-800 hover:text-white"
                    }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="p-2 border rounded disabled:bg-blue-300 bg-blue-600 disabled:hover:bg-blue-300 text-white hover:bg-blue-800"
            >
              Next
            </button>
          </div>
        </div >
      )
      }
    </>
  );
}

export default GetFeeTopic
