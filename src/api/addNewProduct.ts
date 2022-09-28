import axios from 'axios';

export const addNewProduct = async (data: any) => {   
    const randomId = () => {
      return Math.floor(Math.random() * 1000);
    }
    const response = await axios({
        method: "post",
        url: "http://localhost:8000/products",
        data: {
          id: randomId(),
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
