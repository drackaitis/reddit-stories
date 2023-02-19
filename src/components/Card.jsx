import { NavLink } from 'react-router-dom';
import './/Card.css';

export const Card = (props) => {
    const { post } = props;

    return (
        <div className='card'>
            <div className='votesbox'>
                <div className='votes'>{post.score}</div>
            </div>
            <div className='contentbox'>
                <NavLink to={`/post/${post.id}`} className='titlebox'>{post.title}</NavLink>
                <div className='post-details'>
                    <div className='author'>Author: {post.author}</div>
                    <div className='posted-in'> Posted in: {post.subreddit_name_prefixed}</div>
                </div>
                
            </div>
        </div>
    )
}