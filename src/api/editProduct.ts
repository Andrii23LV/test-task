import axios from 'axios'

export const editProduct = async (data: any, id:number) => {    
    const response = await axios({
        method: "patch",
        url: `http://localhost:8000/products/${id}`,
        data: {
          imageUrl: data.imageUrl,
          name: data.name,
          count: parseInt(data.count),
          size: {
            width: parseInt(data.width),
            height: parseInt(data.height),
          },
          weight: data.weight
        },
      });

    return response.data;
}