import { useRouter } from "next/dist/client/router";
import { useState, ChangeEvent, MouseEvent } from "react";
import { PrimaryButton } from "../components/button";
import { InputText } from "../components/form/formField";
import Form from "../components/form/form";
import Layout from "../components/layout/layout";
import { AuthInfo, AuthService } from "../services/auth";

export default function LoginForm() {
  const [formUserID, setFormUserID] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [errorStack, setErrorStack] = useState([])
  const router = useRouter()

  const handleSubmit = (evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    evt.preventDefault()
    setErrorStack(validation(formUserID, formPassword))
    if (errorStack.length > 0) {
      return
    }
    const authInfo: AuthInfo = {
      userId: formUserID,
      password: formPassword
    }
    const res = AuthService.getInstance().login(authInfo)
    res.then(data => {
      if (data.status && data.status !== 200) {
        setErrorStack([data.message])
        return
      }
      router.replace("/dashboard")
    })
  }

  return (
    <Layout requiredAuth={false}>
      <Form method="POST" title="ログイン" errorStack={errorStack}>
        <InputText
          type="text"
          name="userID"
          label="ユーザID(required)"
          value={formUserID}
          handleChange={(evt: ChangeEvent<HTMLInputElement>) => setFormUserID(evt.target.value)}
          />
        <InputText
          type="password"
          name="password"
          label="パスワード(required)"
          value={formPassword}
          handleChange={(evt: ChangeEvent<HTMLInputElement>) => setFormPassword(evt.target.value)}
        />
        <PrimaryButton
          type="submit"
          label="login"
          onClick={handleSubmit}
        />
      </Form>
    </Layout>
  )
}

function validation(userId: string, password: string): Array<string> {
  let errorStack: Array<string> = []
  if (!userId) errorStack.push("ユーザIDは必須です")
  if (!password) errorStack.push("パスワードは必須です")

  return errorStack
}