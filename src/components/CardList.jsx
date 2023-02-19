import { useSelector } from 'react-redux';
import { selectAllPosts } from '../store/postsSlice';
import { Card } from './Card';

export const CardList = () => {

    const postList = useSelector(selectAllPosts);
    console.log("Post list for mapping: ", postList)

    const listPosts = postList.map((post, id) => <Card key={id} post={post} />);

    return (
        <div id="cardlist">
            {listPosts}
        </div>
    )
}