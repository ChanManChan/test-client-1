import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login';

const Google = ({ informParent = f => f }) => {
  const responseGoogle = response => {
    // console.log(response);
    // only thing we need to send to our backend is response.tokenId
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/google-login`,
      data: { idToken: response.tokenId }
    })
      .then(response => {
        console.log('GOOGLE SIGNIN SUCCESS:- ', response);
        // inform parent component (signin component)
        /* Signin.js uses the helper method 'authenticate' that takes two arguments, the first one is the 'response' and based on it, it saves the user information in the cookie and localStorage and then we have the callback which will redirect the user based on their role...this is what we need to do*/
        /*
        CONSOLE LOG RESPONSE
          {{This response is coming from our server}}
          GOOGLE SIGNIN SUCCESS:-  
          {…}
          config: Object { url: "http://localhost:8000/api/google-login", method: "post", data: "{\"idToken\":\"eyJhbGciOiJSUzI1NiIsImtpZCI6ImNiNDA0MzgzODQ0YjQ2MzEyNzY5YmI5MjllY2VjNTdkMGFkOGUzYmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjc1MjQ4MDU1NTc4LWZ2ZjFvZXRzNWs0ZzE1ZWxjdDJodnY0ZzY2NmNncjY0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjc1MjQ4MDU1NTc4LWZ2ZjFvZXRzNWs0ZzE1ZWxjdDJodnY0ZzY2NmNncjY0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTExMTM1MTQ5NzU0MjUxODgyNTQ4IiwiZW1haWwiOiJuZ29wYWwyNTNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJKeXJkZFAxaVlxWHB1TmtvRF8zdHhnIiwibmFtZSI6IlN1bm9LdW5pIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdobFVKdHRSUERmUlpWNEREXy1rMDFleDlGb3UxNXJNQU9pQXp1NWp3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlN1bm9LdW5pIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE1ODQxNzA0MDYsImV4cCI6MTU4NDE3NDAwNiwianRpIjoiY2E4OGEzZWRjN2YyMmJkYzA3YjVlOGM5NzBmZmEzMWRjYmEzMTk5MiJ9.rplCVmpFjTkbzelugy7DImjJjsKlAWpQmrQQE0tuZJ5iwPdxqQcpbD570wILtMPeYZeqPVrLvaV_8m_xHnJd6JdRfXdPLUWgLbzWSdlFpSNx5_CvYp4Id93NhvMwdZU_CPDE5rCQsO-9czs4RpHnT4hXXSkKaeTgp19aLuAfFPJ0NHEnsbdg2b1DoTqF3hHQPSYR-sTxtovZnmz0QCQ3dv8YNEKzQNC1E_tnliAP67870jRvY75Yu6-Xi6g0aljuIBjC6iwvZDsNaE5anteAnRBXa20WkY3Ubkk2uK84IGuvYYbmcxgYt-LmBGHdNAF3RMiiLC5tFBqAvwVSKytOMA\"}", … }

          ***This user already existed in our database and therefore his information is already there but if the user wasn't there, new account would be created and we would get similar response (but before we do that lets inform the parent (Signin component) so that we have this information saved in the localStorage and cookie)***

          data: {…}
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTYzNzY0MDRiNmEwYjBkNmJiNjM2MzgiLCJpYXQiOjE1ODQxNzA0MDcsImV4cCI6MTU4NDc3NTIwN30.JjVjlA6M95-TDBjtUdVgJrmvDF_toD0eeVZhBOcIoow"
                user: {…}
                _id: "5e6376404b6a0b0d6bb63638"
                email: "ngopal253@gmail.com"
                name: "Nanda Gopal"
                role: "admin"
          <prototype>: Object { … }
          <prototype>: Object { … }
          headers: Object { "content-type": "application/json; charset=utf-8" }
          request: XMLHttpRequest { readyState: 4, timeout: 0, withCredentials: false, … }
          status: 200
          statusText: "OK"
          <prototype>: {…}
        */
        informParent(response);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR:- ', error.response);
      });
  };
  return (
    <dev className='pb-3'>
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className='btn btn-danger btn-lg btn-block mb-3'
          >
            <i class='fab fa-google pr-2'></i> Login with Google
          </button>
        )}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </dev>
  );
};

export default Google;
