import React from 'react'
import Layout from '../../components/layout/layout'
import Usermenu from '../../components/layout/Usermenu'
const Orders = () => {
  return (
    <Layout title='Dashboard - Orders'>
        <div className="flex">
          <Usermenu/>
           <div>
           <p>Order</p>
           </div>
        </div>
    </Layout>
  )
}

export default Orders
