import React, { useEffect, useRef, useState } from "react";
import Styles from "./Table.module.css";
import NewCard from "./ModalForms/NewCard";
import Pagination from "./Pagination";

function Table({ title, data, callDebounce, getData, deleteCard, banks }) {
  const [showCard, setShowCard] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cardData, setCardData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let rowsPerPage = 8;
  let totalPages = Math.ceil(data.length / rowsPerPage);
  let dataPerPage = data.slice(
    currentPage * rowsPerPage - rowsPerPage,
    rowsPerPage * currentPage
  );
  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSearch = (e) => {
    callDebounce(e.target.value);
  };
  const handleEdit = (row) => {
    setIsEditing(true);
    setCardData(row);
    setShowCard(true);
  };
  const handleCard = () => {
    setIsEditing(false);
    setShowCard(!showCard);
    setCardData([]);
  };

  return (
    <div>
      {showCard && (
        <div className={Styles.popup}>
          <NewCard
            title={isEditing ? "Edit" : "Add"}
            cardData={cardData}
            handleCard={handleCard}
            getData={getData}
            options={banks}
          />
        </div>
      )}
      <div className={Styles.labels}>
        <div className={Styles.title}>{title}</div>
        {title === "Credit Card" && (
          <div>
            <input type="text" placeholder="Search" onChange={handleSearch} />
            <button onClick={() => setShowCard(true)}>Add Card</button>
          </div>
        )}
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Bank</th>
            {title === "Credit Card" && <th>Name</th>}
            <th>Created At</th>
            {title === "Credit Card" && (
              <>
                <th>Enabled</th> <th>Actions</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {dataPerPage.map((row, index) => {
            return (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.bankname}</td>
                {title === "Credit Card" && <td>{row.cardname}</td>}
                <td>{new Date(row.createdAt).toLocaleDateString("en-GB")}</td>

                {title === "Credit Card" && (
                  <>
                    <td><input type="checkbox" checked={row.enabled} readOnly/></td>{" "}
                    <td>
                      <button onClick={() => handleEdit(row)}>Edit</button>
                      <button onClick={() => deleteCard(row.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className={Styles.nodata}>No Data Found !!</div>
      )}
      <Pagination
        totalPages={totalPages}
        handlePage={handlePage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Table;
