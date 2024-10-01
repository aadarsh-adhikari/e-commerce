import React from 'react'
import Layout from '../../components/layout/layout'
import Usermenu from '../../components/layout/Usermenu'
import { useAuth } from '../../components/auth/Auth'
const Profile = () => {
  const [auth] = useAuth()
  return (
  <Layout title='Dashboard - Profle'>
      <div className="flex">
          <Usermenu/>
           <div>
           <p>Profile</p>
           <div>
         <p> User: {auth.user.name}</p>
         <p> email: {auth.user.email}</p>

         </div>
           </div>
        </div>
  </Layout>
  )
}

export default Profile
