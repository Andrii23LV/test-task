import {deleteComment} from '../api/deleteComment'

export const Comment = (props) => {

    const onDeleteClick = async (comment) => {
        await deleteComment(comment);
        props.fetchApi();
    }

    return (
        <div className='comment-card'>
            <h3 className='comment-card__title'>{props.comment.description}</h3>
            <em>{props.comment.date}</em>
            <button className='comment-card__delete-btn' type='submit' 
                    onClick={() => onDeleteClick(props.comment)}>delete</button>
        </div>
    )
}
