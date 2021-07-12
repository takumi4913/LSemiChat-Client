import Layout from '../../components/layout/layout'
import Form from "../../components/form/form";
import { useState, ChangeEvent, MouseEvent } from "react";
import { editUserService, editUser } from "../../services/user";
import { useRouter } from "next/dist/client/router";
import { PrimaryButton } from "../../components/button";
import { InputText, InputTextarea } from "../../components/form/formField";

export default function editUserDetail(){
    const [formName, setFormName] = useState("")
    const [formProfile, setFormProfile] = useState("")
    const [formPassword, setFormPassword] = useState("")
    const [formMail, setFormMail] = useState("")
    const [errorStack, setErrorStack] = useState([])
    const router = useRouter()
    const handleSubmit = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        evt.preventDefault()
    
        const neweditUser: editUser = {
          name: formName,
          mail: formMail,
          profile: formProfile,
          password: formPassword
        }
    
        const res = editUserService.getInstance().create(neweditUser)
        res.then(data => {
          if (data.status && data.status !== 200) {
            setErrorStack([data.message])
          }
          router.replace("/users/id")
        })
      }
    return(
        <Layout requiredAuth={true}>
          <InputText
          type="text"
          name="name"
          label="表示名"
          value={formName}
          handleChange={(evt: ChangeEvent<HTMLInputElement>) => setFormName(evt.target.value)}
        />
        <InputText
          type="text"
          name="mail"
          label="メールアドレス(require)"
          value={formMail}
          handleChange={(evt: ChangeEvent<HTMLInputElement>) => setFormMail(evt.target.value)}
        />
        <InputTextarea
          name="profile"
          label="自己紹介"
          value={formProfile}
          handleChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setFormProfile(evt.target.value)}
        />
        <InputText
          type="password"
          name="password"
          label="パスワード(require)"
          value={formPassword}
          handleChange={(evt: ChangeEvent<HTMLInputElement>) => setFormPassword(evt.target.value)}
        />
          <PrimaryButton
            type="submit"
            label="完了"
            onClick={handleSubmit}
          />
        </Layout>
        )
}