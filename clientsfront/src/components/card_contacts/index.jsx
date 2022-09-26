import { Flex, Box, Text, Button } from '@chakra-ui/react'
import { Delete, DeleteIcon, EditIcon } from '@chakra-ui/icons'
const CardContacts = ({ name, email, phone }) => {
  return (
    <Flex>
      <Box
        display="flex"
        padding="12px 24px"
        bgColor="#fff"
        borderRadius="10px"
        margin="20px auto"
        ml="10px"
        border="1px solid #000"
        width="400px"
        height="100px"
        flexDir="column"
      >
        <Box>
          <Text>{name}</Text>
        </Box>
        <Box>
          <Text>{email}</Text>
        </Box>
        <Box>
          <Text>{phone}</Text>
        </Box>
      </Box>
      <Box position="relative" right="100px" top="40px"></Box>
    </Flex>
  )
}
export default CardContacts
