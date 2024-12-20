import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const UserListItem = ({ user, handleFuntion }) => {
    return (
        <Box
            onClick={handleFuntion}
            cursor='pointer'
            bg='#e8e8e8'
            _hover={{
                background: '#38b2ac',
                color: 'white'
            }}
            w='100%'
            display='flex'
            alignItems='center'
            px={3}
            py={2}
            mb={2}
            borderRadius='lg'
        >
            <Avatar mr={2} size='sm' cursor='pointer' name={user.name} src={user.avatar} />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize='xs'>
                    <b>Email: </b>
                    {user.email}
                </Text>
            </Box>
        </Box>
    )
}

export default UserListItem