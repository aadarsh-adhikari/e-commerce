import React from 'react'
import Layout from '../../components/layout/layout'
import AdminMenu from '../../components/layout/AdminMenu'
const Users = () => {
  return (
    <Layout title='Dashboard - Users'>
        <div className="flex">
          <AdminMenu/>
           <div>
           <p>All users</p>
           </div>
        </div>
    </Layout>
  )
}

export default Users
