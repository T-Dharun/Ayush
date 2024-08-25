import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Input,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { ArrowForwardIcon, CloseIcon } from "@chakra-ui/icons";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(true); // Assuming the chat is open by default
  const [userId] = useState("user1"); // Replace with actual dynamic user ID
  const [receiverId] = useState("government1"); // Replace with actual dynamic receiver ID

  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit(
        "sendMessage",
        {
          sender: userId,
          receiver: receiverId,
          content: message,
        },
        (response) => {
          if (response.error) {
            console.error("Message sending error:", response.error);
          } else {
            setMessage("");
          }
        }
      );
    }
  };

  if (!isOpen) return null;

  return (
    <Flex
      direction="column"
      w="300px"
      h="400px"
      bg="gray.800"
      borderRadius="md"
      boxShadow="lg"
      overflow="hidden"
      position="fixed"
      bottom="20px"
      right="20px"
    >
      {/* Header */}
      <Flex
        bg="gray.900"
        p="4"
        color="white"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontWeight="bold">Chat App</Text>
        <IconButton
          size="sm"
          icon={<CloseIcon />}
          aria-label="Close"
          variant="ghost"
          color="white"
          onClick={() => setIsOpen(false)}
        />
      </Flex>

      {/* Messages */}
      <VStack
        flex="1"
        p="4"
        spacing="4"
        overflowY="auto"
        bg="gray.700"
      >
        {messages.map((msg, index) => (
          <Flex
            key={index}
            alignSelf={msg.sender === userId ? "flex-end" : "flex-start"} 
            bg={msg.sender === userId ? "blue.500" : "gray.600"} 
            color="white"
            borderRadius="lg"
            p="3"
            maxW="80%"
            boxShadow="sm"
            alignItems="center"
          >
            <Text>{msg.content}</Text>
          </Flex>
        ))}
      </VStack>

      {/* Input Area */}
      <Flex p="4" bg="gray.900" borderTop="1px solid" borderColor="gray.600">
        <Input
          placeholder="hi"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          mr="2"
          bg="gray.600"
          color="white"
          _placeholder={{ color: "gray.400" }}
        />
        <Button onClick={sendMessage} colorScheme="blue">
          Send
        </Button>
      </Flex>
    </Flex>
  );
};

export default Chat;