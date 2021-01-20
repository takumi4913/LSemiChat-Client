import { faCog, faComments, faHome, faPhone, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { SyntheticEvent } from 'react'
import { DEFAULT_IMAGE_PATH } from '../constants/constant'

interface NavigationProps {
  // TODO: 仮置きなので、別の場所で再定義
  user: any
}

export default function Navigation(props: NavigationProps) {
  return (
    <div className="nav-wrapper">
      <div className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link href="/dashboard">
              <a className="nav-link"><FontAwesomeIcon icon={faHome} /></a>
            </Link>
          </li>
          {
            Object.keys(props.user).length > 0
              ? <li className="nav-item">
                <Link href={`/users/${props.user.id}`}>
                  <a className="nav-link">
                    <img src={props.user.image} className="avatar avatar-36 round" onError={(evt: SyntheticEvent<HTMLImageElement, Event>) => evt.target.src = DEFAULT_IMAGE_PATH}/>
                  </a>
                </Link>
              </li>
              : <></>
          }
          <li className="nav-item">
            <Link href="/rooms">
              <a className="nav-link"><FontAwesomeIcon icon={faComments} /></a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/501">
              <a className="nav-link"><FontAwesomeIcon icon={faPhone} /></a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/rooms/search">
              <a className="nav-link"><FontAwesomeIcon icon={faSearch} /></a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/501">
              <a className="nav-link"><FontAwesomeIcon icon={faCog} /></a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}