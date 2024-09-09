import React, { useState, useRef, useEffect } from "react";
import Styles from "./Container.module.css";
import Table from "./Table";
import NewCard from "./ModalForms/NewCard";
import axios from "axios";
import DeleteForm from "./ModalForms/DeleteForm";

function Container() {
  const [data, setData] = useState([]);
  const [showCard, setCard] = useState(false);
  const originalData = useRef(null);
  const [bankdata, setBankData] = useState([]);
  const dropdownValues = useRef(null);
  const [type, setType] = useState("");
  const [showDeleteForm, setDeleteForm] = useState(false);

  const deleteId = useRef(null);
  const getBanksData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/bank/getAllBanks`
    );
    let res = await response.json();
    //  originalData.current=[...res];
    setBankData([...res]);
    dropdownValues.current = [...res];
  };

  const getData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/creditCard/allCardsDetails`
    );
    let res = await response.json();
    //  originalData.current=[...res];
    setData([...res]);
    originalData.current = [...res];
    setType("Credit Card");
  };
  useEffect(() => {
    getData();
    getBanksData();
  }, []);
  const handleData = (view) => {
    if (view === "Credit Card") {
      setData([...originalData.current]);
      setType("Credit Card");
    }
    if (view === "Bank") {
      setData([...bankdata]);
      setType("Bank");
    }
  };
  const debounce = () => {
    let timerId;
    return (value) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        let searchValue = value.trim("");
        let updateddata = originalData.current.filter(
          (item) =>
            item.cardname.toUpperCase()?.includes(searchValue.toUpperCase()) ||
            item.bankname.toUpperCase()?.includes(searchValue.toUpperCase())
        );
        setData([...updateddata]);
      }, 300);
    };
  };

  let callDebounce = debounce();

  const deleteCard = async (id) => {
    setDeleteForm(true);
    deleteId.current = id;
  };

  return (
    <div className={Styles.Container}>
      {showCard && (
        <div className={Styles.dialogbox}>
          <NewCard />
        </div>
      )}
      {showDeleteForm && (
        <DeleteForm
          getData={getData}
          setDeleteForm={setDeleteForm}
          id={deleteId.current}
        />
      )}
      <div className={Styles.labels}>
        <div className={Styles.circle}></div>
        <div>
          <button
            onClick={() => handleData("Credit Card")}
            className={type === "Credit Card" ? "" : Styles.inactive}
          >
            Credit Cards
          </button>
        </div>
        <div>
          <button
            onClick={() => handleData("Bank")}
            className={type === "Bank" ? "" : Styles.inactive}
          >
            Bank
          </button>
        </div>
      </div>
      <hr></hr>

      <Table
        title={type}
        data={data}
        callDebounce={callDebounce}
        setData={setData}
        getData={getData}
        deleteCard={deleteCard}
        banks={dropdownValues.current}
      />
    </div>
  );
}

export default Container;
