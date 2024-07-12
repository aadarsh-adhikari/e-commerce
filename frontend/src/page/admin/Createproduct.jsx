import React from 'react'
import Layout from '../../components/layout/layout'
import AdminMenu from '../../components/layout/AdminMenu'
const Createproduct = () => {
  return (
    <Layout  title='Dashboard - Create Product'>
     <div className='flex'>
      <AdminMenu />
      <div>
        <p> Create Product</p>
      </div>
     </div>
    </Layout>
  )
}

export default Createproduct
