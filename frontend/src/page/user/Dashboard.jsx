import React from "react";
import Layout from "../../components/layout/layout";
import Usermenu from "../../components/layout/Usermenu";
import { useAuth } from "../../components/auth/Auth";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
        <div className='flex'>
         <Usermenu/>
         <div>
         <p> User: {auth.user.name}</p>
         <p> email: {auth.user.email}</p>

         </div>
        </div>
        </Layout>
  );
};

export default Dashboard;
