import axios from 'axios'

export const deleteComment = async (comment:any) => {
    const response = await axios.delete(`http://localhost:8000/products/${comment.productId}`, { params: {comment} } );
    return response.data;
}
