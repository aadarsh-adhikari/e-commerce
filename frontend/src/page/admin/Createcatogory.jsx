import React from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
const Createcatogory = () => {
  return (
    <Layout  title='Dashboard - Create Catogory'>
      <div className="flex">
        <AdminMenu />
        <div>
          <p>Create category</p>
        </div>
      </div>
    </Layout>
  );
};

export default Createcatogory;
