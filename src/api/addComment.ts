import axios from 'axios'

export const addComment = async (comment:any, id:number) => {
    const randomId = () => {
        return Math.floor(Math.random() * 1000);
      }
    const response = await axios.post(`http://localhost:8000/products/${id}/comments`, {
        id: randomId(),
        productI: id,
        description: comment.comment,
        date: Date.now()
    } );
    return response.data;
}
