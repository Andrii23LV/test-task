import { Product } from './Product'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { addNewProduct } from '../api/addNewProduct';
import { SortPanel } from '../components/SortPanel';

export const ProductList = () => {
    const [ products, setProducts ] = useState();
    const [ isOpen, setIsOpen ] = useState(false);
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const fetchApi = async () => {
        const response = await axios.get('http://localhost:8000/products?_sort=name,count&_order=asc');
        const productsList = response.data;
        setProducts(productsList);
    }

    useEffect(() => {
        fetchApi();
    }, [])

    const onPostClick = async (data) => {
        await addNewProduct(data);
        fetchApi();
        reset();
    };

    return (
        <section className='product-list__wrap'>
            <div className='product-list__manager'>
                <button className='add-btn' onClick={() => setIsOpen(true)}>
                    Add product
                </button>
                <SortPanel setProducts={setProducts}/>
            </div>
            <div className='product-list'>
                {products?.map((product) => {
                    return <Product key={product.id} product={product} fetchApi={fetchApi}/>
                })}
            </div>
            {isOpen &&  
            <div className='dark-back'>
                <div className='modal-add-product'>
                    <button className='modal-add-product__close-btn' 
                            type='submit' 
                            onClick={() => setIsOpen(!isOpen)}>close</button>
                    <form onSubmit={handleSubmit(onPostClick)} className="modal-add-product__form">
                        <input type="text" placeholder="Image URL" {...register("imageUrl", {required: true, maxLength: 999})} />
                        {errors?.imageUrl && { type: "required" } && (
                            <span className="error-form">*Image URL is required</span>
                        )}
                        <input type="text" placeholder="Name" {...register("name", {required: true, min: 2})} />
                        {errors?.name && { type: "required" } && (
                            <span className="error-form">*Name is required</span>
                        )}
                        <input type="number" placeholder="Count" {...register("count", {required: true, min: 1})} />
                        {errors?.count && { type: "required" } && (
                            <span className="error-form">*Count is required</span>
                        )}
                        <div className='modal-add-product__form__sizes'>
                            <p>Sizes</p>
                            <input type="number" placeholder="Width" {...register("width", {required: true, min: 1})} />
                            {errors?.width && { type: "required" } && (
                                <span className="error-form">*Width is required</span>
                             )}
                            <input type="number" placeholder="Height" {...register("height", {required: true, min: 1})} className='modal-add-product__form__sizes__input-weight'/>
                            {errors?.height && { type: "required" } && (
                                <span className="error-form">*Height is required</span>
                            )}
                        </div>
                        <input type="text" placeholder="Weight" {...register("weight", {required: true, min: 1})} />
                        {errors?.weight && { type: "required" } && (
                            <span className="error-form">*Weight is required</span>
                        )}

                        <input type="submit" value='Send' className='modal-add-product__form__add-btn'/>
                    </form>
                </div>
            </div>
            }
        </section>
    )
}
