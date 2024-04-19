import { useEffect, useRef, useState } from 'react'
import { uniqBy } from 'lodash'

import useUser from '../../hooks/use-user'
import Logo from './logo'
import Contact from './contact'
import api from '../../libs/api'

export default function Chat() {
  const [ws, setWs] = useState(null)
  const [onlinePeople, setOnlinePeople] = useState({})
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [offlinePeople, setOffilePeople] = useState({})
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const divUnderMessage = useRef()

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
    } else if ('text' in messageData) {
      // setMessages(prevState => ([...prevState, { text: messageData.text, isOur: false }]))
      // if (messageData.sender === selectedUserId && recipient === id)
      // if (messageData.sender === selectedUserId)
      setMessages((prevState) => [...prevState, { ...messageData }])
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
  const handleMessages = async () => {
    try {
      const { data } = await api.get(`users/${selectedUserId}/messages`)
      setMessages(data)
    } catch (error) {
      alert(error.response.data)
    }
  }
  const sendMessage = (ev, file = null) => {
    if (ev) ev.preventDefault()

    ws.send(
      JSON.stringify({
        recipient: selectedUserId,
        text: newMessage,
        file,
      })
    )
    setNewMessage('')
    if (!file) {
      setMessages((prevState) => [
        ...prevState,
        {
          text: newMessage,
          sender: id,
          recipient: selectedUserId,
          _id: Date.now(),
        },
      ])
    } else handleMessages()
  }
  const sendFile = (ev) => {
    const reader = new FileReader()
    reader.readAsDataURL(ev.target.files[0])
    reader.onload = () => {
      sendMessage(null, {
        name: ev.target.files[0].name,
        data: reader.result,
      })
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
  useEffect(() => {
    if (selectedUserId) handleMessages()
  }, [selectedUserId]) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const div = divUnderMessage.current
    if (div) div.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const onlinePeopleExcludeLogged = { ...onlinePeople }
  delete onlinePeopleExcludeLogged[id]
  const messageWithoutDupes = uniqBy(messages, '_id')

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

      <div className="w-2/3 flex flex-col p-2 bg-blue-50">
        <div className="flex-grow">
          {!selectedUserId && (
            <div className="flex items-center justify-center h-full text-gray-500">
              &larr; Select a person from the sidebar
            </div>
          )}
          {!!selectedUserId && (
            <div className="h-full relative">
              <div className="absolute top-0 left-0 right-0 bottom-2 overflow-y-auto scrollbar-none">
                {messageWithoutDupes.map((item) => (
                  <div
                    key={item._id}
                    className={`${
                      item.sender === id ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block p-2 my-2 text-sm rounded-md ${
                        item.sender === id
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-500'
                      }`}
                    >
                      {item.text}
                      {item.file && (
                        <a
                          href={`${import.meta.env.VITE_SERVER_URL}/uploads/${
                            item.file
                          }`}
                          target="_blank"
                          className="flex items-center gap-1 border-b"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-4 h-4 fill-current"
                          >
                            <path d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" />
                          </svg>
                          {item.file}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={divUnderMessage} />
              </div>
            </div>
          )}
        </div>
        {!!selectedUserId && (
          <form className="flex gap-2" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Type your message"
              value={newMessage}
              onChange={(ev) => setNewMessage(ev.target.value)}
              className="bg-white p-2 border rounded-sm flex-grow"
            />

            <label className="bg-gray-200 p-2 text-gray-500 border rounded-sm cursor-pointer">
              <input type="file" className="hidden" onChange={sendFile} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
              >
                <path d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z" />
              </svg>
            </label>

            <button
              type="submit"
              className="bg-blue-500 p-2 text-white border rounded-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 stroke-2 stroke-white fill-none"
              >
                <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
