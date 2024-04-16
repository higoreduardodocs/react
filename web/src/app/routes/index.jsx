import useUser from '../../hooks/use-user'
import Chat from '../components/chat'
import Form from '../components/form'

export default function Routes() {
  const { username } = useUser()
  if (username) return <Chat />
  return <Form />
}
