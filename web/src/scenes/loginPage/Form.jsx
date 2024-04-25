import { useState } from 'react'
import { Formik } from 'formik'
import { useTheme, Box, TextField, Button, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import * as yup from 'yup'

import { setLogin } from 'src/state'
import FlexBetween from 'src/components/FlexBetween'

const registerSchema = yup.object().shape({
  firstName: yup.string().required('required'),
  lastName: yup.string().required('required'),
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
  location: yup.string().required('required'),
  occupation: yup.string().required('required'),
  picture: yup.string().required('required'),
})

const loginSchema = yup.object().shape({
  email: yup.string().email('invalid email').required('required'),
  password: yup.string().required('required'),
})

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: '',
}

const initialValuesLogin = {
  email: '',
  password: '',
}

const Form = () => {
  const { palette } = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [pageType, setPageType] = useState('login')
  const isLogin = pageType === 'login'

  const register = async (values, onSubmitProps) => {
    const formData = new FormData()
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append('picturePath', values.picture.name)

    // console.log(formData);
    // console.log(values);
    const savedUserResponse = await fetch(
      `${import.meta.env.VITE_APP_SERVER_URL}/auth/sign-up`,
      {
        method: 'POST',
        body: formData,
      }
    )
    const savedUser = await savedUserResponse.json()
    onSubmitProps.resetForm()

    if (savedUser) {
      setPageType('login')
    }
  }

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch(
      `${import.meta.env.VITE_APP_SERVER_URL}/auth/sign-in`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      }
    )
    const loggedIn = await loggedInResponse.json()
    onSubmitProps.resetForm()

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      )
      navigate('/home')
    }
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps)
    else await register(values, onSubmitProps)
  }

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'grid',
              gap: '30px',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              '& > div': { gridColumn: undefined },
            }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4' }}
            />
            {!isLogin && (
              <>
                <TextField
                  label="Fist Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: 'span 4' }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: 'span 4' }}
                />
                <Box
                  sx={{
                    gridColumn: 'span 4',
                    border: `1px solid ${palette.neutral.medium}`,
                    borderRadius: '5px',
                    p: '1rem',
                  }}
                >
                  <Dropzone
                    acceptFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptFiles) => {
                      setFieldValue('picture', acceptFiles[0])
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        sx={{
                          border: `2px dashed ${palette.primary.main}`,
                          p: '1rem',
                          '&:hover': { cursor: 'pointer' },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </>
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: 'span 4' }}
            />
          </Box>

          <Box>
            <Button
              type="submit"
              sx={{
                width: '100%',
                m: '2rem 0',
                p: '1rem',
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
              }}
            >
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </Button>

            <Typography
              sx={{
                textDecoration: 'underline',
                color: palette.primary.main,
                '&:hover': { cursor: 'pointer' },
              }}
              onClick={() => {
                resetForm()
                setPageType(isLogin ? 'register' : 'login')
              }}
            >
              {isLogin
                ? 'Dont have an account? Sign Up here.'
                : 'Already have an account? Login here.'}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}
export default Form
