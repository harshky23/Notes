import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context/Appcontext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Authcontext } from "../context/Authcontext";
import { AiOutlineDelete } from "react-icons/ai";

function NotesCard(props) {
  const { dispatch } = useContext(AppContext);
  const { title, subheading, update, id } = props;
  const { user } = useContext(Authcontext);

  const click = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/notes/" + id, {
      method: "DELETE", // will delete tht specific id data
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_NOTES", payload: json }); //will return the delted json only , in context we filter
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between m-4 rounded" style={{backgroundColor:"#eae8e4" ,width:"200%"}}>
        <div className="m-3 ">
          <Link className="link text-dark"to={`/${id}`}>
            <h2>{title}</h2>
            <h5>{subheading}</h5>
            <p>
              {formatDistanceToNow(new Date(update), { addSuffix: true })}
            </p>
          </Link>
        </div>
        <AiOutlineDelete className="me-1 text-danger" style={{width:"26px" , height:"auto" , cursor:"pointer"}} onClick={click} />
      </div>
    </>
  );
}

export default NotesCard;
