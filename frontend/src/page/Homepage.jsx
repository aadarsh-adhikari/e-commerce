import React, { useState } from 'react';
import Layout from '../components/layout';
import { useAuth } from '../components/auth/Auth';
const Homepage = () => {
const [auth, setAuth] =useAuth()
  return (
    <Layout>
      <h1>Welcome to MEN WEAR</h1>
      <pre>{JSON.stringify(auth ,null ,3)}</pre>
    </Layout>
  );
}

export default Homepage;
