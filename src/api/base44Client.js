// Mock base44 client for demonstration
export const base44 = {
  auth: {
    me: async () => {
      // Mock user data
      return {
        email: 'user@example.com',
        id: 'user123'
      };
    }
  },
  entities: {
    FavoritePlace: {
      create: async (data) => {
        console.log('Creating favorite place:', data);
        // Mock success
        return { success: true };
      }
    },
    Snapshot: {
      create: async (data) => {
        console.log('Creating snapshot:', data);
        // Mock success
        return { success: true };
      }
    }
  }
};
