import React, {useState} from 'react';
import {useMutation} from "@apollo/react-hooks";
import {withRouter} from 'react-router-dom';

import './index.css';
import {SIGN_IN} from "../../queries";

const AdminPanel = (props) => {
  const [user, setUser] = useState({
    name: '',
    password: ''
  });

  const [signinUser] = useMutation(SIGN_IN);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setUser({...user, [name]: value})
  };

  const entering = async event => {
    event.preventDefault();
    const {data} = await signinUser({
      variables: {username: user.name, password: user.password}
    });
    if (data.signinUser.token) {
      await localStorage.setItem('token', data.signinUser.token);
      await props.refetch();
      await props.history.push("/admin");
    }
  };
  return (
    <>
      <h3 className="admin__h3">Войдите, что бы редактировать плейлисты</h3>
      <form className="signin_area" onSubmit={event => entering(event)}>
        <input type="text" placeholder="Имя" required name="name" onChange={event => handleChange(event)}/>
        <input type="password" placeholder="Пароль" required name="password" onChange={event => handleChange(event)}/>
        <button type="submit">Войти</button>
      </form>
    </>
  )
};

export default withRouter(AdminPanel);