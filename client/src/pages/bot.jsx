import React, { useState } from 'react';
import { Box, Button, Image, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import Bot from './Aibot';  // Import your Bot component
import Chat from './chat';  // Import your Chat component

import ChatIcon from '../assets/chat.webp';

const bot = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const handleImageClick = () => {
    setShowButtons(!showButtons);
  };

  const handleButtonClick = (component) => {
    setSelectedComponent(component);
    setShowButtons(false);  // Hide buttons after selection
  };

  // Responsive positioning values
  const buttonMarginRight = useBreakpointValue({ base: '10px', md: '20px' });
  const buttonBottomAi = useBreakpointValue({ base: '80px', md: '120px' });
  const buttonBottomHuman = useBreakpointValue({ base: '140px', md: '180px' });

  return (
    <Box textAlign="center">
      <Button
        onClick={handleImageClick}
        position="fixed"
        bottom="20px"
        right={buttonMarginRight}
        transition="width 0.3s"
        variant="unstyled" // Remove default button styles
        p={0} // Remove padding
        cursor="pointer"
        zIndex="1000" // Ensure it stays on top
      >
        <Box
          position="fixed"   // Keeps the image fixed in place
          bottom="20px"      // Adjusts the distance from the bottom of the page
          right={buttonMarginRight} // Adjusts the distance from the right side of the page
          zIndex="1000"      // Ensures it stays on top of other content
        >
          <Image
            src={ChatIcon}    // Path to your bot image
            alt="Chatbot"
            boxSize="100px"    // Adjust this to increase/decrease the image size
            borderRadius="full" // Keeps the image circular
            cursor="pointer"    // Adds a pointer cursor to indicate it's clickable
            boxShadow="lg"      // Optional: Adds a shadow around the image
          />
        </Box>
      </Button>

      {showButtons && (
        <Box position="fixed" bottom="0" right={buttonMarginRight} zIndex="1000">
          <Button
            colorScheme="teal"
            mb={2}
            onClick={() => handleButtonClick('ai')}
            position="relative"
            bottom={buttonBottomAi}
            right={buttonMarginRight}
          >
            Chat with AI
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => handleButtonClick('human')}
            position="relative"
            bottom={buttonBottomHuman}
            right={buttonMarginRight}
          >
            Chat with Human
          </Button>
        </Box>
      )}
      {selectedComponent === 'ai' && <Bot />}
      {selectedComponent === 'human' && <Chat />}
    </Box>
  );
};

export default bot;
