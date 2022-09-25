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

import { useRouter } from 'next/router'
const RegisterForm = () => {
  const router = useRouter()
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
        <Box
          mt="20px"
          padding="12px 8px"
          display="flex"
          w="100%"
          justifyContent="center"
        >
          <FormControl padding="10px" w="80%">
            <Input
              padding="12 24px"
              h="50px"
              borderRadius="8px"
              type="email"
              placeholder="Type your name"
            />
          </FormControl>
        </Box>
        <Box display="flex" w="100%" justifyContent="center">
          <FormControl padding="10px" w="80%">
            <Input
              padding="12 24px"
              h="50px"
              borderRadius="8px"
              type="email"
              placeholder="Type your password"
            />
          </FormControl>
        </Box>
        <Box display="flex" w="100%" justifyContent="center">
          <FormControl padding="10px" w="80%">
            <Input
              padding="12 24px"
              h="50px"
              borderRadius="8px"
              type="password"
              placeholder="Type your password"
            />
          </FormControl>
        </Box>
        <Box display="flex" w="100%" justifyContent="center">
          <FormControl padding="10px" w="80%">
            <Input
              padding="12 24px"
              h="50px"
              borderRadius="8px"
              type="password"
              placeholder="Confirm your password"
            />
          </FormControl>
        </Box>
        <Box display="flex" w="100%" justifyContent="center">
          <FormControl padding="10px" w="80%">
            <Input
              padding="12 24px"
              h="50px"
              borderRadius="8px"
              type="phone"
              placeholder="Type your phone"
            />
          </FormControl>
        </Box>
        <Box mt="20px" display="flex" w="100%" justifyContent="center">
          <Button
            padding="10px"
            color="white"
            bgColor="#3bc4b8"
            _hover={{ _hover: { bgColor: '#0ae9d6' } }}
            onClick={() => {
              router.push('/login_page')
            }}
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
      </Box>
    </Flex>
  )
}

export default RegisterForm
