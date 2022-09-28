import axios from 'axios'

export const getProductDetails = async (id:number) => {
    const response = await axios.get(`http://localhost:8000/products/${id}`);
    return response.data;
}
