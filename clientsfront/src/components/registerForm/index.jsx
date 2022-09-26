import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Text
} from '@chakra-ui/react'
import { Api } from '../../services/api'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'

const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const formSchema = yup.object().shape({
    name: yup.string().required('Name Required'),
    email: yup.string().required('Email Required').email('Wrong Email'),
    password: yup
      .string()
      .required('Password Required')
      .min(6, 'Password must be at least 6 characters')
      .matches(/(?=.*[0-9])/, 'Password must contain a number'),
    tel: yup
      .string()
      .required('Phone Required')
      .min(10, 'Phone must be at least 10 characters')
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(formSchema)
  })

  const onSubmitFunction = data => {
    axios
      .post('http://localhost:4000/users', data)
      .then(response => {
        setLoading(true)
        toast.success('User created successfully')
        router.push('/login_page')
      })
      .catch(error => {
        toast.error('Email already registered')
        console.log(error)
      })
  }

  return (
    <Flex
      w="100%"
      justifyContent="center"
      flexDir="column"
      alignItems={'center'}
    >
      <Box
        border="1px solid gray"
        borderRadius="8px"
        mt="20px"
        mb="20px"
        padding="12px 24px"
        flexDir="column"
        display="flex"
        w="90%"
        bgColor="#d4f1f1"
      >
        <Box borderRadius="8px" padding="12px 24px" w="100%" bgColor="#3bc4b8">
          <Heading textAlign="center" mt="9px" fontSize="20px" color="#ffff">
            E-Contacts - Register Page
          </Heading>
        </Box>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <Box
            mt="20px"
            padding="12px 8px"
            display="flex"
            w="100%"
            justifyContent="center"
          >
            <FormControl padding="10px" w="80%" isInvalid={errors.name}>
              <Input
                padding="12 24px"
                h="50px"
                borderRadius="8px"
                type="name"
                placeholder="Type your name"
                {...register('name')}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box display="flex" w="100%" justifyContent="center">
            <FormControl padding="10px" w="80%" isInvalid={errors.email}>
              <Input
                padding="12 24px"
                h="50px"
                borderRadius="8px"
                type="email"
                placeholder="Type your email"
                {...register('email')}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box display="flex" w="100%" justifyContent="center">
            <FormControl padding="10px" w="80%" isInvalid={errors.password}>
              <Input
                padding="12 24px"
                h="50px"
                borderRadius="8px"
                type="password"
                placeholder="Type your password"
                {...register('password')}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box display="flex" w="100%" justifyContent="center">
            <FormControl padding="10px" w="80%" isInvalid={errors.tel}>
              <Input
                padding="12 24px"
                h="50px"
                borderRadius="8px"
                type="phone"
                placeholder="Type your phone"
                {...register('tel')}
              />
              <FormErrorMessage>
                {errors.tel && errors.tel.message}
              </FormErrorMessage>
            </FormControl>
          </Box>
          <Box mt="20px" display="flex" w="100%" justifyContent="center">
            <Button
              padding="10px"
              color="white"
              bgColor="#3bc4b8"
              _hover={{ _hover: { bgColor: '#0ae9d6' } }}
              type="submit"
              isLoading={loading}
              loadingText="Submitting"
            >
              Register
            </Button>
          </Box>
          <Box
            padding="10px"
            mt="5px"
            display="flex"
            w="100%"
            justifyContent="center"
          >
            <Text color="gray"> Have a registration?</Text>
          </Box>
          <Box mb="10px" display="flex" w="100%" justifyContent="center">
            <Button
              _hover={{ _hover: { bgColor: 'Black' } }}
              color="white"
              bgColor="#3bc4b8"
              onClick={() => {
                router.push('/login_page')
              }}
            >
              Login Here
            </Button>
          </Box>
        </form>
      </Box>
    </Flex>
  )
}

export default RegisterForm
