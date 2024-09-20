import { useSessionStore } from "@/utils/zustand/sessionStore";

type itemData = {
    title: string;
    startingBid: string;
    description: string;
    image: string;
    bidEndDate: string;
    userId?: string
}

export const addItem = async (itemData: itemData) => {
    
    try {
      const response = await fetch('/api/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item');
      }
  
      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || 'Failed to add item');
    }
  };
  