import { useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useState, useEffect } from "react";
import { getProductDetails } from '../api/getProductDetails';
import { addComment } from '../api/addComment';
import { useNavigate } from 'react-router-dom'
import { Comment } from "../components/Comment";
import '../styles/productPage.css'
import '../styles/productsPage.css'
import { editProduct } from "../api/editProduct";
import { useDispatch, useSelector } from "react-redux";
import { SET_EDITED } from "../redux/setEdits";


export const ProductPage = () => {
    const { edited } = useSelector((state) => state.edited);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [ product, setProduct ] = useState();
    const [ comments, setComments ] = useState();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isOpenAddComment, SetIsOpenAddComment ] = useState(false);

    const fetchApi = async () => {
        const response = await getProductDetails(location.state);
        setProduct(response);
        setComments(response.comments);
    }

    const onEditClick = async (data) => {
        // dispatch(SET_EDITED(data.name));
        await editProduct(data, product.id);
        fetchApi();
    }

    const onAddComment = () => {
        SetIsOpenAddComment(!isOpenAddComment);
    }

    const onSubmitComment = async (data) => {
        await addComment(data, product?.id);
        fetchApi();
    }

    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <div className="product-wrap">
            <div className="product-details">
                <div className="product-details__buttons">
                    <button onClick={() => navigate('/')} className='product-details__back-btn'>go back</button>
                    <button onClick={() => setIsOpen(!isOpen)} className='product-details__edit-btn'>edit</button>
                </div>
                <h1 className="product-details__title">{ product?.name}</h1>
                <p className="product-details__id">ID: { product?.count}</p>
                <img src={ product?.imageUrl} className="product-details__img" alt="dima"></img>
                <div className="product-details__description">
                    <p>Height: { product?.size.height} cm</p>
                    <p>Width: { product?.size.width} cm</p>
                    <p>Weight: { product?.weight}</p>
                </div>
            </div>
            <div className="product-comments">
                    <button className="product-comment__add-btn" onClick={onAddComment}>add comment</button>
                    {isOpenAddComment && 
                         <form onSubmit={handleSubmit(onSubmitComment)} className="modal-add-product__form">
                         <input type="text" placeholder="Comment" {...register("comment", { maxLength: 999})} />
                         {errors?.comment && { type: "required" } && (
                             <span className="error-form">*Text is required</span>
                         )}
                         <input type="submit" value='post' className='modal-add-product__form__add-btn'/>
                        </form>
                    }
                    <h2>Comments</h2>
                        {comments?.map((comment) => {
                            return <Comment key={comment.id} comment={comment} fetchApi={fetchApi} />
                        })}
                </div>
                {isOpen &&  
            <div className='dark-back'>
                <div className='modal-add-product'>
                    <button className='modal-add-product__close-btn' 
                            type='submit' 
                            onClick={() => setIsOpen(!isOpen)}>close</button>
                    <form onSubmit={handleSubmit(onEditClick)} className="modal-add-product__form">
                        <input type="text" placeholder="Image URL" defaultValue={product?.imageUrl} {...register("imageUrl", { maxLength: 999})} />
                        {errors?.imageUrl && { type: "required" } && (
                            <span className="error-form">*Image URL is required</span>
                        )}
                        <input type="text" placeholder="Name" defaultValue={product?.name} {...register("name", { min: 2})} />
                        {errors?.name && { type: "required" } && (
                            <span className="error-form">*Name is required</span>
                        )}
                        <input type="number" placeholder="Count" defaultValue={product?.count} {...register("count", { min: 1})} />
                        {errors?.count && { type: "required" } && (
                            <span className="error-form">*Count is required</span>
                        )}
                        <div className='modal-add-product__form__sizes'>
                            <p>Sizes</p>
                            <input type="number" placeholder="Width" {...register("width", { min: 1})} />
                            {errors?.width && { type: "required" } && (
                                <span className="error-form">*Width is required</span>
                             )}
                            <input type="number" placeholder="Height" {...register("height", { min: 1})} className='modal-add-product__form__sizes__input-weight'/>
                            {errors?.height && { type: "required" } && (
                                <span className="error-form">*Height is required</span>
                            )}
                        </div>
                        <input type="text" placeholder="Weight" {...register("weight", { min: 1})} />
                        {errors?.weight && { type: "required" } && (
                            <span className="error-form">*Weight is required</span>
                        )}

                        <input type="submit" value='Edit' className='modal-add-product__form__add-btn'/>
                    </form>
                </div>
            </div>
            }
        </div>
    )
}
