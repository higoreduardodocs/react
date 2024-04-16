import { useEffect, useState } from 'react'

import useUser from '../../hooks/use-user'
import Logo from './logo'
import Contact from './contact'
import api from '../../libs/api'

export default function Chat() {
  const [ws, setWs] = useState(null)
  const [onlinePeople, setOnlinePeople] = useState({})
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [offlinePeople, setOffilePeople] = useState({})

  const { id, setId, username, setUsername } = useUser()

  const getWsConnect = () => {
    const ws = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL) // 'ws://localhost:3001'
    setWs(ws)
    ws.addEventListener('message', handleMessage)
    ws.addEventListener('close', () => {
      setTimeout(() => {
        getWsConnect()
      }, 1000)
    })
  }
  const handleMessage = (ev) => {
    const messageData = JSON.parse(ev.data)
    if ('online' in messageData) {
      showOnlinePeople(messageData.online)
    }
  }
  const showOnlinePeople = (messageData) => {
    const people = {}
    messageData.forEach(({ userId, username }) => {
      people[userId] = username
    })
    setOnlinePeople(people)
  }
  const handlePeople = async () => {
    try {
      const { data } = await api.get('/users/people')
      const offile = data
        .filter((item) => item._id !== id)
        .filter((item) => !Object.keys(onlinePeople).includes(item._id))
      const offlinePeople = {}
      offile.forEach((item) => {
        offlinePeople[item._id] = item.username
      })
      setOffilePeople(offlinePeople)
    } catch (error) {
      alert(error.response.data)
    }
  }
  const logout = async () => {
    try {
      await api.get('/users/logout')
      setWs(null)
      setId(null)
      setUsername(null)
    } catch (error) {
      alert(error.response.data)
    }
  }
  useEffect(() => {
    getWsConnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    handlePeople()
  }, [onlinePeople]) // eslint-disable-line react-hooks/exhaustive-deps

  const onlinePeopleExcludeLogged = { ...onlinePeople }
  delete onlinePeopleExcludeLogged[id]

  return (
    <section className="flex h-screen">
      <div className="w-1/3 flex flex-col bg-white">
        <div className="flex-grow">
          <Logo />
          {Object.keys(onlinePeopleExcludeLogged).map((item) => (
            <Contact
              key={item}
              userId={item}
              username={onlinePeopleExcludeLogged[item]}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              isOnline={true}
            />
          ))}
          {Object.keys(offlinePeople).map((item) => (
            <Contact
              key={item}
              userId={item}
              username={offlinePeople[item]}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              isOnline={false}
            />
          ))}
        </div>

        <div className="flex flex-col items-center justify-center pb-2 gap-2">
          <p className="flex items-center gap-2 justify-center text-sm text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current"
            >
              <path d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" />
            </svg>

            {username}
          </p>

          <button
            onClick={logout}
            className="px-3 py-2 bg-blue-400 text-sm text-gray-800 border rounded-sm"
          >
            Loggout
          </button>
        </div>
      </div>

      <div className="w-2/3 flex flex-col p-2 bg-blue-50">Message</div>
    </section>
  )
}
