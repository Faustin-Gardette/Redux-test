import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "./Redux/userSlice";

const UpdateUser = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users.users);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();

  useEffect(() => {
    const user = users.find((u) => u.id === id);
    setName(user.name);
    setEmail(user.email);
    setAge(user.age);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/update/" + id, { name, email, age })
      .then((res) => {
        dispatch(updateUser({ id, name, email, age }));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create">
      <form onSubmit={handleUpdate}>
        <h2>Modif</h2>
        <div>
          <label htmlFor="">Nom</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="">Age</label>
          <input
            type="text"
            onChange={(e) => setAge(e.target.value)}
            value={age}
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default UpdateUser;
