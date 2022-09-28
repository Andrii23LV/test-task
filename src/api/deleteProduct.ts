import axios from 'axios'

export const deleteProduct = async (id:number) => {
    const response = await axios.delete(`http://localhost:8000/products/${id}`);
    return response.data;
}
