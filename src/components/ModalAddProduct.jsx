import { useForm } from 'react-hook-form';
import { addNewProduct } from '../api/addNewProduct';

export const ModalAddProduct = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const response = await addNewProduct(data)
        console.log(response);
    };

    return (
        <div className='dark-back'>
        <div className='modal-add-product'>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="imageUrl" {...register("imageUrl", {required: true, maxLength: 999})} />
            <input type="text" placeholder="name" {...register("name", {min: 2})} />
            <input type="number" placeholder="count" {...register("count", {min: 1})} />
            <input type="number" placeholder="width" {...register("width", {min: 1})} />
            <input type="number" placeholder="height" {...register("height", {})} />
            <input type="text" placeholder="weight" {...register("weight", {in: 1})} />

            <input type="submit" value='Send'/>
            </form>
        </div>
        </div>
    )
}
