import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { isAuth, getCookie, signout, updateUser } from '../auth/helpers';

const Private = ({ history }) => {
  useEffect(() => {
    toast.success(`Hey ${isAuth().name}, Welcome back!`);
    loadProfile();
  }, []);

  const loadProfile = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
      headers: {
        // requireSignin middleware is applied in the backend therefore we need to send the token as well
        Authorization: `Bearer ${getCookie('token')}`
      }
    })
      .then(response => {
        console.log('PRIVATE PROFILE UPDATE :- ', response);
        const { role, name, email } = response.data;
        setValues({ ...values, role, name, email });
      })
      .catch(error => {
        console.log(
          'PRIVATE PROFILE UPDATE ERROR :- ',
          error.response.data.error
        );
        // below handling unauthorized error (if the token is expired)
        if (error.response.status === 401) {
          signout(() => {
            history.push('/');
          });
        }
      });
  };

  const [values, setValues] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit'
  });

  const { role, name, email, password, buttonText } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_API}/user/update`,
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      },
      data: { name, password }
    })
      .then(response => {
        console.log('PRIVATE PROFILE UPDATE SUCCESS:- ', response);
        updateUser(response, () => {
          setValues({
            ...values,
            buttonText: 'Submitted'
          });
          toast.success('Profile updated successfully');
          setTimeout(() => {
            setValues({
              ...values,
              buttonText: 'Submit'
            });
          }, 100);
        });
      })
      .catch(error => {
        console.log(
          'PRIVATE PROFILE UPDATE ERROR:- ',
          error.response.data.error
        );
        setValues({ ...values, buttonText: 'Submit' });
        toast.error(error.response.data.error);
      });
  };

  const updateForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Role</label>
        <input
          type='text'
          className='form-control'
          defaultValue={role}
          disabled
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          value={name}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          className='form-control'
          defaultValue={email}
          disabled
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <br />
        <small className='text-danger'>
          Must enter password each time before updating profile
        </small>
        <input
          onChange={handleChange('password')}
          type='password'
          className='form-control'
          value={password}
        />
      </div>
      <div>
        <button className='btn btn-primary' onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className='col-md-6 offset-md-3'>
        <ToastContainer />
        <h1 className='pt-5 text-center'>Private</h1>
        <p className='lead text-center'>Profile Update</p>
        {updateForm()}
      </div>
    </Layout>
  );
};

export default Private;
