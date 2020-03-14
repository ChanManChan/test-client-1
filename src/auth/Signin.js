import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { authenticate, isAuth } from './helpers';
import GoogleLogin from './Google';
import FacebookLogin from './Facebook';

const Signin = ({ history }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    buttonText: 'Submit'
  });

  const { email, password, buttonText } = values;

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  // this 'informParent' function, we can pass as props to Google.js(<GoogleLogin />) so that it will be available in the Google component
  const informParent = response => {
    authenticate(response, () => {
      isAuth() && isAuth().role === 'admin'
        ? history.push('/admin')
        : history.push('/private');
    });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, buttonText: 'Submitting' });
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password }
    })
      .then(response => {
        console.log('SIGNIN SUCCESS:- ', response);
        setValues({
          ...values,
          buttonText: 'Submitted'
        });
        // save the response (user, token) in localStorage/cookie
        // user information in localStorage and token in cookie

        authenticate(response, () => {
          setTimeout(() => {
            setValues({
              ...values,
              name: '',
              email: '',
              password: '',
              buttonText: 'Submit'
            });
          }, 500);
          isAuth() && isAuth().role === 'admin'
            ? history.push('/admin')
            : history.push('/private');
        });
      })
      .catch(error => {
        console.log('SIGNIN ERROR:- ', error.response.data);
        setValues({ ...values, buttonText: 'Submit' });
        toast.error(error.response.data.error);
      });
  };

  const signinForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={handleChange('email')}
          type='email'
          className='form-control'
          value={email}
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
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
      {/* {JSON.stringify(isAuth())} */}
      <div className='col-md-6 offset-md-3'>
        <ToastContainer />
        {isAuth() ? <Redirect to='/' /> : null}
        {/* {JSON.stringify({ name, email, password })} */}
        <h1 className='p-5 text-center'>Signin</h1>
        <GoogleLogin informParent={informParent} />
        <FacebookLogin informParent={informParent} />
        {signinForm()}
        <br />
        <Link
          to='/auth/password/forgot'
          className='btn btn-sm btn-outline-danger'
        >
          Forgot Password
        </Link>
      </div>
    </Layout>
  );
};

export default Signin;
