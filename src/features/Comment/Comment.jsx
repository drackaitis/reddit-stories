import parse from "html-react-parser";

export const Comment = (props) => {
    const { comment } = props;

    // Necessary to filter out bad list-items before parsing.
    if (typeof comment.body !== 'string') {
        return;
    }

    // Check first level replies for comments made by OP (Original-Poster)
    const friskReplies = () => {
        try {
            for (let reply of comment.replies.data.children) {
                if (reply.data.is_submitter) {
                    return <p className="reply">{"OP reply: " + parse(reply.data.body)}</p>;
                }
            }
            return;
        } catch(e) {
            // Drain errors caused by bad replies, e.g objects with different structure
        }
    }
    
    return (
        <div className="comment-container">
            <div className="votesbox">
                {comment.score}
            </div>
            <div className="contentbox">
                <p>{parse(comment.body)}</p>
                {friskReplies()}
            </div>
        </div>
    )
}