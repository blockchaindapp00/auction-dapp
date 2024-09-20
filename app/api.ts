export interface Item {
    title: string;
    start_price: number;
    highest_bid: number;
    description: string;
    image: string;
    timing: number;
    start_time_stamp: string;
    posted_by: string;
}

export interface FetchItemsResponse {
    message: string;
    items: Item[];
    totalItems: number;
}

export const fetchItems = async (page: number = 1, limit: number = 10): Promise<FetchItemsResponse> => {
    try {
        const response = await fetch(`/api/item?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error fetching items: ${errorData.message || 'Unknown error'}`);
        }

        const data: FetchItemsResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error in fetchItems:', error);
        throw new Error(`Fetching items failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
