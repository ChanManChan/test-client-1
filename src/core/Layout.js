import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../auth/helpers';

const Layout = ({ children, match, history }) => {
  const isActive = path => {
    // history.location.pathname === path
    // {JSON.stringify(history)}
    // {JSON.stringify(match)}
    if (match.path === path) {
      return { color: '#000' };
    } else {
      return { color: '#fff' };
    }
  };
  const nav = () => (
    <ul
      className='nav nav-tabs bg-primary'
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <li className='nav-item'>
        <Link to='/' className='nav-link' style={isActive('/')}>
          Home
        </Link>
      </li>
      {!isAuth() ? (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <li className='nav-item'>
            <Link to='/signin' className='nav-link' style={isActive('/signin')}>
              Signin
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/signup' className='nav-link' style={isActive('/signup')}>
              Signup
            </Link>
          </li>
        </div>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {isAuth().role === 'admin' ? (
            <li className='nav-item'>
              <Link to='/admin' className='nav-link' style={isActive('/admin')}>
                {isAuth().name}
              </Link>
            </li>
          ) : (
            <li className='nav-item'>
              <Link
                to='/private'
                className='nav-link'
                style={isActive('/private')}
              >
                {isAuth().name}
              </Link>
            </li>
          )}
          <li className='nav-item'>
            <span
              className='nav-link'
              style={{ cursor: 'pointer', color: '#fff' }}
              onClick={() => {
                signout(() => {
                  history.push('/');
                });
              }}
            >
              Signout
            </span>
          </li>
        </div>
      )}
    </ul>
  );
  return (
    <Fragment>
      {nav()}
      <div className='container'>{children}</div>
    </Fragment>
  );
};
export default withRouter(Layout);
