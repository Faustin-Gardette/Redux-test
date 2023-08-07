import axios from "axios";
import { useState } from "react";
import { addUser } from "./Redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/create", { name, email, age })
      .then((res) => {
        dispatch(addUser(res.data));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create">
      <form onSubmit={handleSubmit}>
        <h2>Add</h2>
        <div>
          <label htmlFor="">Nom</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="">Age</label>
          <input type="text" onChange={(e) => setAge(e.target.value)} />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default CreateUser;
