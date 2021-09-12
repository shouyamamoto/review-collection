import { VFC } from "react"
import { index as Label } from "../atom/label/index"
import { index as Input } from "../atom/input/index"

type Props = {
  inputUsername: string;
  handleChange: (value: string) => void;
}

export const InputName:VFC<Props> = ({ inputUsername, handleChange }) => {
  return (
    <>
      <Label>サービス内で使う名前を教えてください</Label>
      <Input
        inputUsername={inputUsername}
        handleChange={handleChange}
      />
    </>
  )
}
