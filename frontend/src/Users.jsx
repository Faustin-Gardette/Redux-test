import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "./Redux/userSlice";

const Users = () => {
  //     State.users(users du store).users(users de userSlice)
  const users = useSelector((state) => state.users.users);

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteuser/" + id)
      .then((res) => {
        dispatch(deleteUser({ id }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="users">
      <Link to="/create">
        <button>Ajouter</button>
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link to={`/edit/${user.id}`}>
                    <button>Modif</button>
                  </Link>
                  <button onClick={() => handleDelete(user.id)}>Supp</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
