import { useRouter } from "next/dist/client/router";
import { useState, ChangeEvent, MouseEvent } from "react";
import { PrimaryButton } from "../components/button";
import { InputText, InputTextarea } from "../components/formField";
import Form from "../components/layout/form";
import Layout from "../components/layout/layout";
import { UserService, User } from "../services/user";

export default function SignUpForm() {
  const router = useRouter()
  const [formUserID, setFormUserID] = useState("")
  const [formName, setFormName] = useState("")
  const [formMail, setFormMail] = useState("")
  // const [formImage, setFormImage] = useState("")
  const [formProfile, setFormProfile] = useState("")
  const [formPassword, setFormPassword] = useState("")
  const [formConfirmPassword, setFormConfirmPassword] = useState("")
  const [errorStack, setErrorStack] = useState([])

  const handleSubmit = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    evt.preventDefault()

    setErrorStack(validation(formUserID, formName, formMail, formProfile, formPassword, formConfirmPassword))
    if (errorStack.length > 0) {
      return
    }

    const newUser: User = {
      id: "",
      userID: formUserID,
      name: formName ? formName : formUserID,
      mail: formMail,
      profile: formProfile,
      password: formPassword
    }

    const res = UserService.getInstance().create(newUser)
    res.then(data => {
      if (data.status && data.status !== 200) {
        setErrorStack([data.message])
      }
      router.replace("/login")
    })
  }

  return (
    <Layout>
      <Form method="POST" title="サインアップ" errorStack={errorStack}>
        <InputText
          type="text"
          name="userID"
          label="ユーザID(required)"
          value={formUserID}
          handleChange={(evt: ChangeEvent<HTMLInputElement>) => setFormUserID(evt.target.value)}
        />
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
        <InputText
          type="password"
          name="cPassword"
          label="確認用パスワード(require)"
          value={formConfirmPassword}
          handleChange={(evt: ChangeEvent<HTMLInputElement>) => setFormConfirmPassword(evt.target.value)}
        />
        <PrimaryButton
          type="submit"
          label="signup"
          onClick={handleSubmit}
        />
      </Form>
    </Layout>
  )
}

function validation(userId: string, name: string, mail: string, profile: string, password: string, confirmPassword: string): Array<string> {
  let errorStack: Array<string> = []
  if (!userId) errorStack.push("ユーザIDは必須です")
  if (!mail) errorStack.push("メールアドレスは必須です")
  if (!password) errorStack.push("パスワードは必須です")
  if (!confirmPassword) errorStack.push("確認用パスワードは必須です")
  if (password !== confirmPassword) errorStack.push("パスワードと確認用パスワードが一致しません")

  return errorStack
}