import {deleteProduct} from '../api/deleteProduct';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

export const Product = (props) => {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const onDeleteClick = async (id) => {
        await deleteProduct(id);
        props.fetchApi();
    }

    return (
        <div className="product" >
            <img src={props.product.imageUrl} alt={props.product.name} className="product__image"
                    onClick={(() => {
                        navigate(`/product/${props.product.id}`, { replace: true, state: props.product.id});
                    })}>
                </img>
                <h2>{props.product.name}</h2>
                <p>Count: {props.product.count}</p>
            <button className="delete-btn" type="delete" onClick={() => setIsOpen(!isOpen)}>delete</button>
            {isOpen &&  
            <div className='dark-back'>
                <div className='modal-delete-product'>
                <p className='modal-delete-product__title'>Delete this product?</p>
                    <div className="modal-delete-product__buttons">
                        <button className='modal-delete-product__delete-btn modal-delete-product__btn' 
                                type='submit' 
                                onClick={() => onDeleteClick(props.product.id)}>delete
                        </button>
                        <button className='modal-delete-product__close-btn modal-delete-product__btn' 
                                type='submit' 
                                onClick={() => setIsOpen(!isOpen)}>cancel
                        </button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}
