'use client';
import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  useToast,
} from '@chakra-ui/react';

const BidModal = () => {
   );
  const [bidAmount, setBidAmount] = useState<number | ''>('');
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();

  // Simple validator function to check if the bid is valid
  const validateBid = (amount: number | '') => {
    if (amount === '' || isNaN(amount)) {
      return 'Please enter a valid number';
    }
    if (amount <= 0) {
      return 'Bid amount must be greater than 0';
    }
    return null;
  };

  // Handle submit
  const handleConfirm = () => {
    const validationError = validateBid(bidAmount);
    if (validationError) {
      toast({
        title: 'Invalid Bid',
        description: validationError,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Bid Placed',
        description: `Your bid of $${bidAmount} has been placed.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose(); 
    }
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Place Your Bid</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Bid Amount ($)</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Enter bid amount"
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(parseFloat(e.target.value))}
              />
            </FormControl>
            <Text fontSize="sm" color="gray.500" mt={2}>
              Disclaimer: The entered amount will be fixed, and the transaction will proceed once confirmed.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleConfirm}>
              Confirm Bid
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BidModal;
