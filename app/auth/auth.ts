type registerData = {
    email: string;
    username: string;
    password: string;
    public_address: string;
}

export const registerUser = async (data: registerData): Promise<{ message: string; user?: any }> => {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            let errorMessage = 'An unknown error occurred';

            switch (response.status) {
                case 400:
                    errorMessage = `Bad Request: ${errorData.message || 'Invalid input'}`;
                    break;
                case 409:
                    errorMessage = `Conflict: ${errorData.message || 'Email or username already in use'}`;
                    break;
                case 500:
                    errorMessage = `Internal Server Error: ${errorData.message || 'An unexpected error occurred'}`;
                    break;
                default:
                    errorMessage = `Unexpected Error: ${errorData.message || 'Something went wrong'}`;
            }

            throw new Error(errorMessage);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error in registerUser:', error);
        throw new Error(`Registration failed: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    }
};

type LoginData = {
    email: string;
    password: string;
  };
  
  export const authenticateUser = async (data: LoginData) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        return { success: false, message: result.message || 'Login failed' };
      }
  
      return { success: true, data: result.user };
    } catch (error) {
      console.error('API Error:', error);
      return { success: false, message: 'An unexpected error occurred. Please try again later.' };
    }
  };
  
