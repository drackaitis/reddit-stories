import { useSelector } from "react-redux";
import { selectAllComments } from "../../store/commentsSlice";
import { Comment } from './Comment';

export const CommentList = () => {
    const comments = useSelector(selectAllComments);

    const listComments = comments.map((comment, id) => <Comment key={id} comment={comment} />);

    return (
        <div id='comment-list'>
            {listComments}
        </div>
    )
}