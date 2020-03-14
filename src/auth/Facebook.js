import React from 'react';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

const Facebook = ({ informParent = f => f }) => {
  const responseFacebook = respose => {
    console.log(respose);
    /*
      RESPONSE:-

       {
        "name": "Nandagopal",
        "id": "685330805339895",
        "accessToken":"EAAHQULuWv9MBAH5EKrXydPJpvjpTdjAlgJl6Yl7yQ232jlctYnIw4OgG7diSmAmBogVzfEAZAV7JBu6ZCfRoWrLnhqhMxbYAhIYyOoVjo1Myq99QCJfZCaJ8w6lGggaGvlC9bMXeLiYCKjjIe7BTZCeLoT7wrwyZAuE4ZCiFvYDlTOolw70Kg4dMAvYcZBwNHXgZCRm7XQ6MMgZDZD",
        "userID": "685330805339895",
        "expiresIn": 6302,
        "signedRequest": "SvQHmnw3rvTThuJ7sCHfoliaDtg3xZewnQIrzVrso_E.eyJ1c2VyX2lkIjoiNjg1MzMwODA1MzM5ODk1IiwiY29kZSI6IkFRQTZHdmVsWEtLSmt2VHY1VUI1OW85M2dsUkNrNGZMQy1CZnZ4LWhsWUZUTDYteGV0RlFhd1hQd08zR3RVWkNNV3ZkNUNTZklxN2xwdTFWNm1DbElwbk9FSGlBTGJsQ1JJdDR1RWcycHFUZEVsVTl6VllIeXdHaGRmUjN5WGVnY1pVc1ZYR3FqNG96ZnZGWFFoaUJQcGR0VGlyMkxYLXZ0Q3FLeGozMzdOd0c3OWd1cTZLcFVIZ1VMZ1V2TXh2SllQQ3ZyU2FCeFBHRWRRcEhPa1QwWGdfaDZVZ1RrTEJ1dFg0eG9NczloYnp4a0tXb1FOdU9EZUYxVF91eE5mTTN4dHNsQWljaFQyREl0NnRwN3U3Y1ZNcEFtVHg4VkZHSmtLbVVYU1RBd1ZDclpsWnNHaW1uQUZpRkFuQTA2akEtZnJIazhOa25fSEtnVnI1ckxCbHRKY3NYIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE1ODQxODQ0OTh9",
        "graphDomain": "facebook",
        "data_access_expiration_time": 1591960498
      }

      We need to send this information to our backend and from our backend we'll make request to facebook to get the users profile (name, email ...everything, just like we did with google earlier) but unfortunately this time we dont have library like 'google-auth-library' like we used earlier in our server, so we have to manually make request from our node.js API to facebook with this information ('accessToken' and 'userID' so that we can get valid users profile)
*/
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/facebook-login`,
      data: { userID: respose.userID, accessToken: respose.accessToken }
    })
      .then(respose => {
        console.log('FACEBOOK LOGIN SUCCESS:- ', respose);
        //inform parent component
        // this response can be sent to that helper method ('authenticate') that will save the user in the localStorage and token in the cookie and redirect to the page based on their role, whether they are admin or just a normal user.
        informParent(respose);
      })
      .catch(error => {
        console.log('FACEBOOK LOGIN ERROR:- ', error.respose);
      });
  };
  return (
    <div className='pb-3'>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className='btn btn-primary btn-lg btn-block mb-3'
          >
            <i class='fab fa-facebook pr-2'></i> Login with Facebook
          </button>
        )}
      />
    </div>
  );
};

export default Facebook;
