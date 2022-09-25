import type { NextPage } from 'next'
import { Flex } from '@chakra-ui/react'
import RegisterPage from './register_page'
import LoginPage from './login_page'
const Home: NextPage = () => {
  return (
    <Flex>
      <RegisterPage />
    </Flex>
  )
}

export default Home
