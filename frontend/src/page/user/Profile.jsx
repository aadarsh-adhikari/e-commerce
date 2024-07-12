import React from 'react'
import Layout from '../../components/layout/layout'
import Usermenu from '../../components/layout/Usermenu'
const Profile = () => {
  return (
  <Layout title='Dashboard - Profle'>
      <div className="flex">
          <Usermenu/>
           <div>
           <p>Profile</p>
           </div>
        </div>
  </Layout>
  )
}

export default Profile
