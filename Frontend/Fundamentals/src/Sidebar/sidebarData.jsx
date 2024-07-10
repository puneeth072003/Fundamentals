import axios from 'axios';

const handleFetch = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/v1/class11'); 
    const sidebarData = response.data; // Use response.data to get the data
    return sidebarData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default handleFetch;
