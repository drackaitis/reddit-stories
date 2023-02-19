import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, selectSubreddits, selectStatus, selectQuery } from "../../store/postsSlice";
import { CardList } from '../../components/CardList';

export const Home = () => {
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const subreddits = useSelector(selectSubreddits);
    const query = useSelector(selectQuery);
    
    // All three subreddits selected at the start; re-rendered once filters are applied or a search is executed.

    useEffect(() => {
        console.log("Current state of query: ", query)
        if (status === "idle" ) {
            dispatch(fetchPosts(["AmItheAsshole", "relationship_advice", "advice"]));
        } else if (query) {
            dispatch(fetchPosts(query));
        } else {
            dispatch(fetchPosts(subreddits));
        }
    }, [subreddits, query]);

    return (
        <div id="card-container">
            <CardList />
        </div>
    );
}