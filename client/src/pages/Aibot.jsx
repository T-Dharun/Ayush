import React, { useState } from 'react';
import { Box, Button, Input, VStack, HStack, IconButton, Text, Image } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const Bot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = () => {
        fetch('http://localhost:8080/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ input })
        })
        .then(response => response.json())
        .then(data => {
            setMessages([...messages, {
                sender: 'user',
                text: input,
            },
            {
                sender: 'bot',
                text: data.output,
            }]);
            setInput('');
            })
            .catch(error => console.error('Error:', error));
    };

    const handleChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <Box position="fixed" bottom="4" right="4" zIndex="1000">
            
                <Box 
                    w="300px" 
                    h="400px" 
                    bg="gray.800" 
                    color="white" 
                    borderRadius="lg" 
                    boxShadow="lg"
                    display="flex" 
                    flexDirection="column"
                >
                    <HStack justifyContent="space-between" p="4" bg="gray.900" borderTopRadius="lg">
                        <Text fontSize="lg" fontWeight="bold">Chatbot</Text>
                        <IconButton
                            aria-label="Close Chatbot"
                            icon={<CloseIcon />}
                            onClick={toggleChatbot}
                            variant="ghost"
                            color="white"
                        />
                    </HStack>

                    <VStack 
                        spacing="3" 
                        p="4" 
                        flex="1" 
                        overflowY="auto" 
                        bg="gray.700" 
                        w="100%"
                        className="chatbot-messages"
                    >
                        {messages.map((message, index) => (
                            <Text 
                                key={index} 
                                alignSelf={message.sender === 'user' ? 'flex-end' : 'flex-start'}
                                bg={message.sender === 'user' ? 'blue.500' : 'green.500'}
                                color="white"
                                px="4"
                                py="2"
                                borderRadius="md"
                            >
                                {message.text}
                            </Text>
                        ))}
                    </VStack>

                    <HStack p="4" bg="gray.900" borderBottomRadius="lg">
                        <Input 
                            placeholder="Type your message..." 
                            value={input} 
                            onChange={handleChange} 
                            variant="filled" 
                            bg="gray.600" 
                            color="white"
                            _placeholder={{ color: 'gray.400' }}
                            flex="1"
                        />
                        <Button onClick={handleSendMessage} colorScheme="blue">
                            Send
                        </Button>
                    </HStack>
                </Box>
        
        </Box>
    );
};

export default Bot;
