Application developed in React and Firebase

> :fire: Development

```
cd web && yarn && yarn dev

```

> :gear: Environment Variables

- Firebase API Key: VITE_FIREBASE_APIKEY `web`
- Firebase Auth Domain: VITE_FIREBASE_AUTHDOMAIN `web`
- Firebase Project ID: VITE_FIREBASE_PROJECTID `web`
- Firebase Storage Bucket: VITE_FIREBASE_STORAGEBUCKET `web`
- Firebase Messaging Sender ID: VITE_FIREBASE_MESSAGINGSENDERID `web`
- Firebase APP ID: VITE_FIREBASE_APPID `web`

> :thought_balloon: `Lama Dev`

![Cover](./assets/cover.png)

> :dart: Documentation

<details>
<summary>:scroll: Roles</summary>

#### Collections:

- users { uid, displayName, email, photoURL }
- chats { combineUid: { messages[{ uid, senderUid, text, image, date }] } }
- userChats { uid: { combineId: { userInfo: { uid, username, image }, lastMessage, date } } }

![Collections](./assets/collections.png)

</details>
