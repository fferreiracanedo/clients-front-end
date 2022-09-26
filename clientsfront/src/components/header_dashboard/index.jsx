import {
  Flex,
  Box,
  Button,
  Text,
  Stack,
  Avatar,
  ModalOverlay,
  Modal,
  FormControl,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  Input,
  ModalFooter
} from '@chakra-ui/react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState, useEffect, useCallback } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
const HeaderDashboard = () => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState([])

  const formSchema = yup.object().shape({
    name: yup.string().required('Name required'),
    emails: yup.string().required('Email required').email('Wrong email'),
    tel: yup.string().required('Phone required'),
    ownerId: yup.string().required('Owner Id required')
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
      .post('http://localhost:4000/contacts', data)
      .then(response => {
        onClose()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleContacts = useCallback(() => {
    axios
      .get(`http://localhost:4000/users/${localStorage.getItem('id')}`)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    handleContacts()
  }, [handleContacts])

  const exit = () => {
    localStorage.clear()
    router.push('/')
  }

  return (
    <Flex padding="12px 24px" bgColor="#c2e0de" flexDir="column">
      <Text textAlign="center">E-Contacts</Text>
      <Box w="100%" display="flex" justifyContent="center" mr="1%" mt="20px">
        <Stack w="100%" justifyContent="flex-start" direction="row">
          <Avatar src="https://bit.ly/broken-link" />
          <Box>
            <Text>{data.name}</Text>
            <Text>{data.email}</Text>
          </Box>
        </Stack>
        <Button
          mr="10px"
          color="#fff"
          bgColor="#59c0b7"
          _hover={{ bgColor: '#59c0b7' }}
          onClick={onOpen}
        >
          Adicionar Contato
        </Button>
        <Button
          mr="10px"
          color="#fff"
          bgColor="#59c0b7"
          _hover={{ bgColor: '#59c0b7' }}
          onClick={exit}
        >
          Sair
        </Button>
      </Box>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Contact</ModalHeader>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Name" {...register('name')} />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Email" {...register('emails')} />
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input placeholder="Phone" {...register('tel')} />
              </FormControl>
              <FormControl>
                <FormLabel>OwnerId</FormLabel>
                <Input
                  defaultValue="8bf0a9af-5b15-4a6d-ba85-ec9938730aa3"
                  placeholder="OwnerId"
                  {...register('ownerId')}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default HeaderDashboard
