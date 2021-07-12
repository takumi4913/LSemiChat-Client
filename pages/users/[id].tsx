import { OutputTextarea } from "../../components/form/formField";
import { useState, SyntheticEvent, MouseEvent } from "react";
import Layout from "../../components/layout/layout";
import { PrimaryButton } from "../../components/button";
import { editUserService, editUser } from "../../services/user";
import { useRouter } from "next/dist/client/router";
import { DEFAULT_IMAGE_PATH } from '../../constants/constant';
import { UserService} from "../../services/user";


interface UserProps{
  image: string,
  name: string,
}
const USERS: Array<UserProps> = [
  {
    image: "",
    name: "akubi",
  }
]
export default function UserDetail() {
  const router = useRouter()
  const [formProfile] = useState("aa")
  const [users, setUsers] = useState(USERS)
  const [errorStack, setErrorStack] = useState([])
  const handleSubmit = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    evt.preventDefault()

    const neweditUser: editUser = {
      name: "",
      mail: "",
      profile: "",
      password: "",
    }
    const edituser = () => {
      const edituser = UserService.getInstance().getAll()
      setUsers(edituser)
    }
    const res = editUserService.getInstance().create(neweditUser)
    res.then(data => {
      if (data.status && data.status !== 200) {
        setErrorStack([data.message])
      }
      router.replace("/users/edit")
    })
  }

  return (
    <Layout requiredAuth={true}>
      <div>
        {
          users.map(user => (
            <div>
             <img src={user.image} className="avatar avatar-150 round border" onError={(evt: SyntheticEvent<HTMLImageElement, Event>) => evt.target.src=DEFAULT_IMAGE_PATH} />
             <div className="profile-user-name">{user.name}</div>
            </div>
          ))
        }
      </div>
      <OutputTextarea
        name="profile"
        label="自己紹介"
        value={formProfile}
      />
      <PrimaryButton
        type="submit"
        label="編集"
        onClick={handleSubmit}
      />
    </Layout>
  )
}