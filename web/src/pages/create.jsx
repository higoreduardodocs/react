import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from 'react-icons/md'
import { useState } from 'react'

import { categories } from '../utils/data'
import { storage } from '../config/firebase'
import { getAllFoodItems, saveItem } from '../utils/firebase'
import { useStateValue } from '../contexts/initial-state'
import { actionType } from '../contexts/reducer'
import Loader from '../components/loader'

const Create = () => {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useStateValue()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(null)
  const [imageAsset, setImageAsset] = useState(null)
  const [calories, setCalories] = useState('')
  const [price, setPrice] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [alertStatus, setAlertStatus] = useState(null)
  const [isMessage, setIsMessage] = useState(false)
  const [message, setMessage] = useState(null)

  const uploadImage = async (e) => {
    setIsLoading(true)
    const imageFile = e.target.files[0]
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      },
      (error) => {
        console.log(error)
        setIsLoading(false)
        setIsMessage(true)
        setMessage('Error while uploading: Try again 🙇')
        setAlertStatus('danger')

        clearMessage()
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAsset(downloadURL)
          setIsLoading(false)
          setIsMessage(true)
          setMessage('Image uploaded successfully 😊')
          setAlertStatus('success')

          clearMessage()
        })
      }
    )
  }
  const deleteImage = async () => {
    setIsLoading(true)
    const deleteRef = ref(storage, imageAsset)
    deleteObject(deleteRef).then(() => {
      setImageAsset(null)
      setIsLoading(false)
      setIsMessage(true)
      setMessage('Image deleted successfully 😊')
      setAlertStatus('success')

      clearMessage()
    })
  }
  const saveDetails = async () => {
    setIsLoading(true)
    try {
      if (!title || !category || !imageAsset || !calories || !price) {
        setIsMessage(true)
        setMessage('Required fields cant be empty')
        setAlertStatus('danger')

        clearMessage()
        return
      }

      const data = {
        id: Date.now(),
        title: title,
        imageURL: imageAsset,
        category: category,
        calories: calories,
        qty: 1,
        price: price,
      }
      saveItem(data)

      setIsLoading(false)
      setIsMessage(true)
      setMessage('Data uploaded successfully 😊')
      setAlertStatus('success')

      clearMessage()
      clearData()
      fetchData()
    } catch (err) {
      console.log(err)
      setIsLoading(false)
      setIsMessage(true)
      setMessage('Error while uploading data: Try again 🙇')
      setAlertStatus('danger')
      clearMessage()
    }
  }
  const clearMessage = () => {
    setTimeout(() => {
      setIsMessage(false)
      setMessage(null)
      setAlertStatus(null)
    }, 4000)
  }
  const clearData = () => {
    setTitle('')
    setCategory(null)
    setImageAsset(null)
    setCalories('')
    setPrice('')
  }
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      })
    })
  }

  return (
    <article className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] flex flex-col items-center justify-center gap-4 border border-gray-300 rounded-lg p-4">
        {isMessage && (
          <p
            className={`w-full p-2 rounded-lg font-semibold text-lg text-center ${
              alertStatus === 'danger'
                ? 'bg-red-400 text-red-800'
                : 'bg-emerald-400 text-emerald-800'
            }`}
          >
            {message}
          </p>
        )}

        <div className="w-full flex items-center gap-2 py-2 border-b border-gray-300">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            placeholder="Give me a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full text-lg text-textColor bg-transparent outline-none border-none placeholder:text-gray-400"
          />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-base p-2 border-b-2 border-gray-200 rounded-md outline-none cursor-pointer"
          >
            <option value="default" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  value={item.urlParamName}
                  className="text-base text-headingColor capitalize bg-white border-0 outline-none"
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="w-full h-225 flex items-center justify-center border-dotted border-2 border-x-gray-300 rounded-lg group">
          {isLoading ? (
            <Loader />
          ) : !imageAsset ? (
            <label className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-gray-700 cursor-pointer">
              <MdCloudUpload className="text-3xl " />
              <p>Click here to upload</p>
              <input
                type="file"
                name="upload"
                accept="image/*"
                onChange={uploadImage}
                className="hidden w-0 h-0"
              />
            </label>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={imageAsset}
                alt="Upload asset"
                className="h-full object-cover"
              />

              <button
                type="button"
                onClick={deleteImage}
                className="absolute bottom-3 right-3 text-xl p-3 bg-red-500 hover:shadow-md transition-all duration-500 ease-in-out outline-none rounded-full cursor-pointer"
              >
                <MdDelete className="text-white" />
              </button>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full flex items-center gap-2 py-2 border-b border-gray-300">
            <MdFoodBank className="text-xl text-gray-700" />
            <input
              type="text"
              placeholder="Calories"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
              className="w-full text-lg text-textColor bg-transparent outline-none border-none placeholder:text-gray-400"
            />
          </div>

          <div className="w-full flex items-center gap-2 py-2 border-b border-gray-300">
            <MdAttachMoney className="text-xl text-gray-700" />
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full text-lg text-textColor bg-transparent outline-none border-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={saveDetails}
          className="w-full md:w-auto font-semibold text-lg text-white px-12 py-2 mr-auto bg-emerald-500 rounded-lg border-none outline-none"
        >
          Save
        </button>
      </div>
    </article>
  )
}
export default Create
