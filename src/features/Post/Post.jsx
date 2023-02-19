import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAllPosts, selectStatus } from "../../store/postsSlice";
import { fetchComments } from "../../store/commentsSlice";
import { CommentList } from "../Comment/CommentList";
import './Post.css';

export const Post = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const posts = useSelector(selectAllPosts);
    const selectedPost = posts.find(post => post.id === postId);

    useEffect(() => {
        dispatch(fetchComments(selectedPost.url))
    }, []);

    return (
        <div id="post-container" >
            <div id='title'>{selectedPost.title}</div>
            <div id="post-text">
                {selectedPost.selftext}
            </div>
            <div id="comments-container">
                <CommentList />
            </div>
        </div>
    )
}