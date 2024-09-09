import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Styles from "./DeleteForm.module.css";

function DeleteForm({ getData, setDeleteForm ,id}) {
  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(
        `http://localhost:8080/creditCard/deleteCard/${id}`
      );
      setDeleteForm(null);
      getData();

    } catch (err) {
      console.log(err);
    }
  };
  return ReactDOM.createPortal(
    <div className={Styles.overlay}>
        <div className={Styles.container}>
            <h4 className={Styles.label}>Confirm delete ?</h4>
            <div className={Styles.btns}>
                <button onClick={()=>handleDelete(id)}>Yes</button>
                <button onClick={()=>setDeleteForm(null)}>No</button>
            </div>
            </div></div>,
    document.getElementById("delete-form")
  );
}

export default DeleteForm;
