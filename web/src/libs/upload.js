import axios from 'axios'

const upload = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  // const cloudId = import.meta.env.VITE_CLOUDINARY_CLOUD_ID;
  const cloudPreset = import.meta.env.VITE_CLOUDINARY_CLOUD_PRESET
  const cloudUrl = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL
  const cloudinaryUrl = `${cloudUrl}/${cloudName}/auto/upload`

  const formData = new FormData()
  formData.append('file', file)
  // formData.append("cloud_name", cloudName);
  // formData.append("public_id", cloudId);
  formData.append('upload_preset', cloudPreset)

  try {
    const { data } = await axios.post(cloudinaryUrl, formData)
    const { url } = data
    return url
  } catch (error) {
    console.log(error)
  }
}

export default upload
