import React, {useEffect, useContext } from "react";
import NotesCard from "../components/NotesCard";
import Form from "../components/Form";
import AppContext from "../context/Appcontext";
import { Authcontext } from "../context/Authcontext";

function Home() {
  // const [notes, setNotes] = useState(null);
  const {dispatch , notes} = useContext(AppContext);
  const {user} = useContext(Authcontext);

  useEffect(() => {
    const fetchAPI = async () => {
            const response = await fetch('/api/notes',{
              headers: {'Authorization': `Bearer ${user.token}`} //bearer for convention,header to validate the user's identity and access rights based on the provided token.
            });
            const json = await response.json();
            if(response.ok)
                {dispatch({type:'SET-NOTES' , payload:json})}
    };
    if(user){
    fetchAPI();
    }
  },[dispatch, user]);
  return (
    <div className="d-flex justify-content-between">
      <div>
      {notes && notes.map((value) => (<NotesCard key={value._id} id={value._id} title={value.title} subheading={value.subHead} update={value.updatedAt} />))}
      </div>
      <Form/>
    </div>
  );
}

export default Home;
