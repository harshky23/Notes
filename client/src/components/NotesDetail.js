import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Authcontext } from "../context/Authcontext";

function NotesDetail() {
  const { id } = useParams();
  const [data, setData] = useState("");
  const {user} = useContext(Authcontext);
  

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch("/api/notes/" + id,
      { headers: {
        'Authorization': `Bearer ${user.token}`
      }
      });
      const json = await response.json();
      setData(json);
    };
    fetchAPI();
  }, [id,user]);
  return <div className="position-absolute top-50 start-50 translate-middle">{data.writeUp}</div>;
}

export default NotesDetail;
