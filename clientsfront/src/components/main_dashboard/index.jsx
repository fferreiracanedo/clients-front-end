import {
  Flex,
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import CardContacts from '../card_contacts'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { ModalAddContact } from '../modal_add_contact'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
const MainDashboard = () => {
  const [data, setData] = useState([])
  const [contacts, setContacts] = useState([])
  const [test, setTest] = useState()

  const formSchema = yup.object().shape({
    name: yup.string(),
    emails: yup.string().email('Wrong Email'),
    tel: yup.string()
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(formSchema)
  })

  const teste = idContact => {
    const findContact = contacts.find(contact => contact.id === idContact)
    setTest(findContact)
    onOpen()
  }

  {
    console.log(test)
  }

  const handleContacts = useCallback(() => {
    axios
      .get(`http://localhost:4000/contacts/${localStorage.getItem('id')}`)
      .then(res => {
        setContacts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [contacts])

  useEffect(() => {
    handleContacts()
  }, [handleContacts])

  const deleteContact = async id => {
    axios
      .delete(`http://localhost:4000/contacts/${id}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        onClose()
        handleContacts()
      })
      .catch(err => console.log(err.response.data))
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onSubmit = data => {
    const newData = {
      name: data.name ? data.name : test.name,
      emails: data.emails ? data.emails : test.emails,
      tel: data.tel ? data.tel : test.tel
    }
    axios
      .patch(`http://localhost:4000/contacts/${test.id}`, newData, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        onClose()
        handleContacts()
      })
      .catch(err => console.log(err.response.data))
  }

  return (
    <Flex>
      <Box mt="10px" w="100%">
        <Text fontWeight="bold" textDecoration="underline" textAlign="center">
          Contatos Registrados
        </Text>
        <Box
          h="auto"
          display="flex"
          bgColor="#fff"
          w="100%"
          padding="12px 24px"
          flexWrap="wrap"
        >
          {contacts.map(contact => (
            <Flex key={contact.id}>
              <CardContacts
                name={contact.name}
                email={contact.emails}
                phone={contact.tel}
              />
              <Box
                padding="12px 5px"
                position="relative"
                top="40px"
                left="-100px"
              >
                <Button
                  ml="-30px"
                  onClick={() => {
                    deleteContact(contact.id)
                  }}
                >
                  <DeleteIcon />
                </Button>
                <Button
                  ml="20px"
                  onClick={() => {
                    teste(contact.id)
                  }}
                >
                  <EditIcon />
                </Button>
              </Box>
            </Flex>
          ))}
        </Box>
      </Box>

      <Flex>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Contact</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody pb={6} padding="12px 24px">
                <FormControl padding="12px 24px">
                  <Input placeholder="Name" {...register('name')} />
                </FormControl>
                <FormControl padding="12px 24px">
                  <Input placeholder="Email" {...register('emails')} />
                </FormControl>
                <FormControl padding="12px 24px">
                  <Input placeholder="Tel" {...register('tel')} />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Update
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </Flex>
    </Flex>
  )
}
export default MainDashboard
