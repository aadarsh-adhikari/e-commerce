import React from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../components/auth/Auth";
const Admindashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="flex">
        <AdminMenu />
        <div>
          <p>Admin Name: {auth.user.name}</p>
          <p>Admin Email: {auth.user.email}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Admindashboard;
