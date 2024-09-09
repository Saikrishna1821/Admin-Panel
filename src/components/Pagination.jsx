import React from "react";
import Styles from "./Pagination.module.css";
import leftIcon from "../assets/left.png";
import rightIcon from "../assets/right (2).png"
function Pagination({ totalPages, handlePage, currentPage }) {
  let pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <>
      <div className={Styles.btns}>
      {currentPage > 1 ? <button onClick={()=>handlePage(1)}><img src={leftIcon} /></button> : ""}
        {pageNumbers.map((item, index) => {
          return (
           
              <button className={currentPage==item && Styles.activebtn}  onClick={() => handlePage(item)}>
                {item}
              </button>
      
          );
        })}
        {currentPage <pageNumbers.length ? <button onClick={()=>handlePage(pageNumbers.length)}><img src={rightIcon} /></button> : ""}

      </div>
    </>
  );
}

export default Pagination;
