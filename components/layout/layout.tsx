import { faCog, faComments, faHome, faPhone, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { User, UserService } from '../../services/user'
import Navigation from '../navigation'
import SideBar from '../sidebar'

interface LayoutProps {
  children: React.ReactNode,
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const [user, setUser] = useState({})

  useEffect(() => {
    const res = UserService.getInstance().getSelf()
    res.then(data => {
      if (data.status && data.status !== 200) {
        if (data.status === 401) {
          router.push("/login")
        }
        return
      }
      setUser({
        id: data.id,
        userId: data.user_id,
        name: data.name,
        image: data.image,
        mail: data.mail,
        profile: data.profile,
      })
    })
  }, [])
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* navigation */}
      <Navigation
        user={user}
      />

      {/* container */}
      <div className="container">
        <SideBar/>
        <div className="content-wrapper">
          <div className="content">{ children }</div>
        </div>
      </div>
    </>
  )
}