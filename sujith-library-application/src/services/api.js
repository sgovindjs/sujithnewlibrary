const BASE_URL = 'http://localhost:3001'; 

const api = {
  getBooks: async () => {
    const response = await fetch(`${BASE_URL}/books?sortBy=name`);
    const data = await response.json();
    return data;
  },

  addBook: async (book) => {
    const response = await fetch(`${BASE_URL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
    const data = await response.json();
    return data;
  },

  markAsBorrowed: async (id) => {
    await fetch(`${BASE_URL}/books/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ borrowed: true }),
    });
  },

  deleteBook: async (id) => {
    await fetch(`${BASE_URL}/books/${id}`, {
      method: 'DELETE',
    });
  },
};

export default api;
