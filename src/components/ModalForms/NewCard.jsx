import React, { useState } from "react";
import Styles from "./Newcard.module.css";
import ReactDOM from "react-dom";
import axios from "axios";
function NewCard({ title, cardData, handleCard, getData,options}) {
  const [newcard, setNewCard] = useState({
    cardname: cardData.cardname ||'',
    bankname: cardData.bankname ||'',
    enabled: cardData.enabled || false,
    createdAt:cardData.createdAt ||'...'
  });

  const handleInput = (e) => {
    const { name,type,checked,value } = e.target;

    console.log('name',name,checked);
    setNewCard({
      ...newcard,
      [name]:type==='checkbox'?checked: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
   if(!cardData.id)
   {
    let sendData = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/creditCard/addNewCard`,
      newcard
    );
   }
   else {
    let updateData = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/creditCard/editCard/${cardData.id}`,
        newcard
      );

   }
    setNewCard({
      cardname: "",
      bankname: "",
      enabled: 0,
      createdAt:'...'
    });
    handleCard();
    getData();
   
  };

  return ReactDOM.createPortal(
    <div className={Styles.overlay}>
      <div className={Styles.card}>
        <div className={Styles.labels}>
          <h4>{title} Credit Card</h4>
          <button onClick={handleCard}>X</button>
        </div>
        <form onSubmit={handleSave}>
          <div className={Styles.labels}>
            <div>
              <label>Credit Card Name</label>
              <br></br>
              <input
                type="text"
                value={newcard.cardname}
                onChange={handleInput}
                name="cardname"
                required
              />
            </div>
            <div>
              <label>Bank Name</label>
              <br></br>
              <select
                value={newcard.bankname}
                onChange={handleInput}
                name="bankname" required
              >
                <option></option>
                {
                  options.map((item)=>{
                    return <option value={item.bankname}>{item.bankname?.toUpperCase()}</option>
                  })
                }
              </select>
            </div>
          </div>
          <div className={Styles.labels}>
            <div>
              <label>Enabled</label>
              <br></br>
              <input type="checkbox" checked={newcard.enabled} name='enabled' onChange={handleInput} />
            </div>

            <div>
              <label>Created At</label>
              <br></br>
              <h6>{newcard.createdAt==='...'?'...':new Date(newcard.createdAt).toLocaleDateString('en-GB')}</h6>
            </div>
          </div>

          <div className={Styles.labels}>
            <button onClick={handleCard}>
              Discard
            </button>
            <button type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default NewCard;
