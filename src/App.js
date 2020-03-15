import React from 'react';
import Layout from './core/Layout';
import { Helmet } from 'react-helmet';

const App = () => {
  const head = () => (
    <Helmet>
      <meta charSet='utf-8' />
      <title>MERN Stack</title>
      <link rel='canonical' href='https://nandagopal.dev' />
    </Helmet>
  );

  return (
    <Layout>
      {head()}
      <div className='col-md-6 offset-md-3 text-center'>
        <h1 className='p-5'>Authentication Boilerplate [MERN]</h1>
        <hr />
        <p className='lead'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          doloremque quo labore nesciunt nam placeat nobis, quas enim officia at
          incidunt, aliquam cumque exercitationem aut iste fuga. Fugiat, impedit
          aliquid?
        </p>
      </div>
    </Layout>
  );
};

export default App;
