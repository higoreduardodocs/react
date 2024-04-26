import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import upload from '../../libs/upload'
import api from '../../libs/api'
import './gigs-add.style.scss'

const GigsAdd = () => {
  const navigate = useNavigate()
  const [gig, setGig] = useState({
    category: '',
    title: '',
    shortTitle: '',
    description: '',
    shortDescription: '',
    price: '',
    deliveryTime: '',
    revisionNumber: '',
    cover: '',
    images: [],
  })
  const [coverFile, setCoverFile] = useState(null)
  const [imagesFile, setImagesFile] = useState([])
  const [features, setFeatures] = useState([])
  const [uploading, setUploading] = useState(false)

  const handleChangeGig = (e) => {
    setGig((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }
  const handleUpload = async () => {
    setUploading(true)

    try {
      const coverUrl = await upload(coverFile)
      const imagesUrl = await Promise.all(
        [...imagesFile].map(async (item) => {
          const url = await upload(item)
          return url
        })
      )
      setUploading(false)
      setGig((prevState) => ({
        ...prevState,
        cover: coverUrl,
        images: [...imagesUrl],
      }))
    } catch (error) {
      console.log(error)
    }
  }
  const handleFeatured = (e) => {
    e.preventDefault()
    setFeatures([...features, e.target[0].value])
    e.target[0].value = ''
  }
  const removeFeature = (index) => {
    setFeatures((prevState) => prevState.filter((_, i) => i !== index))
  }
  const clearFields = () => {
    let _gig = {}
    Object.keys(gig).map((key) => {
      _gig[key] = ''
    })
    setGig({ ..._gig, images: [] })
    setCoverFile(null)
    setImagesFile([])
    setFeatures([])
  }
  const handleSubmit = async () => {
    try {
      await api.post('/gigs', { ...gig, features: features })
      clearFields()
      navigate('/my-gigs')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>

        <div className="sections">
          <div className="info">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="e.g. I will do something I'm really good at"
              value={gig.title}
              onChange={handleChangeGig}
            />

            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              value={gig.category}
              onChange={handleChangeGig}
            >
              <option value="">Uncategoryzed</option>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>

            <label htmlFor="coverFile">Cover Image</label>
            <input
              type="file"
              id="coverFile"
              onChange={(e) => setCoverFile(e.target.files[0])}
            />

            <label htmlFor="images">Upload Images</label>
            <input
              type="file"
              multiple
              id="images"
              onChange={(e) => setImagesFile(e.target.files)}
            />

            <button type="button" onClick={handleUpload} disabled={uploading}>
              {uploading ? 'Uploading' : 'Upload'}
            </button>

            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              placeholder="Brief descriptions to introduce your service to customers"
              cols="0"
              rows="16"
              value={gig.description}
              onChange={handleChangeGig}
            ></textarea>

            <button type="button" onClick={handleSubmit}>
              Create
            </button>
          </div>
          <div className="details">
            <label htmlFor="shortTitle">Service Title</label>
            <input
              type="text"
              name="shortTitle"
              id="shortTitle"
              placeholder="e.g. One-page web design"
              value={gig.shortTitle}
              onChange={handleChangeGig}
            />

            <label htmlFor="shortDescription">Short Description</label>
            <textarea
              name="shortDescription"
              id="shortDescription"
              placeholder="Short description of your service"
              cols="30"
              rows="10"
              value={gig.shortDescription}
              onChange={handleChangeGig}
            ></textarea>

            <label htmlFor="deliveryTime">Delivery Time (e.g. 3 days)</label>
            <input
              type="number"
              name="deliveryTime"
              id="deliveryTime"
              value={gig.deliveryTime}
              onChange={handleChangeGig}
            />

            <label htmlFor="revisionNumber">Revision Number</label>
            <input
              type="number"
              name="revisionNumber"
              id="revisionNumber"
              value={gig.revisionNumber}
              onChange={handleChangeGig}
            />

            <label>Add Features</label>
            <form className="add" onSubmit={handleFeatured}>
              <input
                type="text"
                placeholder="e.g. page design, file uploading, hosting..."
              />
              <button type="submit">add</button>
            </form>
            {features?.length > 0 && (
              <div className="addedFeatures">
                {features.map((item, i) => (
                  <div className="item" key={i}>
                    <button type="button" onClick={() => removeFeature(i)}>
                      <span>{item}</span>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={gig.price}
              onChange={handleChangeGig}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GigsAdd
