import React, { useContext, useState } from "react";
import AppContext from "../context/Appcontext";
import { Authcontext } from "../context/Authcontext";

function Form() {
  const { dispatch } = useContext(AppContext);
  const [title, setTitle] = useState(""); //same name as in db of all const
  const [subHead, setSub] = useState("");
  const [writeUp, setContent] = useState("");
  const [error, setError] = useState(null);
  const { user } = useContext(Authcontext);

  const hadleOnSubmit = async (event) => {
    event.preventDefault(); // to stop page refresh from submit form
    const notes = { title, subHead, writeUp };
    if (!user) {
      setError("Please Login");
      return; // won't run ahead
    }

    const response = await fetch("/api/notes", {
      // fetch return promises so we have to wait for response using await
      method: "POST",
      body: JSON.stringify(notes),
      headers: {
        "content-type": "application/json", // to inform the server tht info is json type , same content to be writen
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      alert("Fill up all the Details");
    }
    if (response.ok) {
      setSub("");
      setTitle("");
      setContent("");
      setError(null);
      //empty for UI purpose
      dispatch({ type: "CREATE", payload: json });
    }
  };

  return (
    <form
      onSubmit={hadleOnSubmit}
      className="d-flex flex-column m-5 p-4 border rounded border-warning"
    >
      <h2>Add a Note</h2>
      <input
        className="my-4 form-control"
        style={{width: "50vh"}}
        placeholder="Title"
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        value={title}
        type="text"
      ></input>

      <input
        className="mb-4 form-control "
        placeholder="Sub-Heading"
        onChange={(event) => {
          setSub(event.target.value);
        }}
        value={subHead}
        type="text"
      ></input>

      <textarea
        className="mb-4 form-control"
        style={{height: "20vh"}}
        placeholder="Enter your Note..."
        onChange={(event) => {
          setContent(event.target.value);
        }}
        value={writeUp}
        type="text"
      ></textarea>
      <button className="btn btn-warning">Save</button>
      {error && <div>{error}</div>}
    </form>
  );
}

export default Form;
