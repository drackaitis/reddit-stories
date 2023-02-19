import './Header.css'
import { useDispatch } from 'react-redux';
import { includeSubreddit, excludeSubreddit, addQuery } from '../../store/postsSlice';
import './Header.css';
import { NavLink } from 'react-router-dom';

export const Header = () => {
    const dispatch = useDispatch()
    
    const handleCheck = (id, subreddit) => {
        let checkbox = document.getElementById(id)
        if (!checkbox.checked) {
            dispatch(excludeSubreddit(subreddit));
        }
        else {
            dispatch(includeSubreddit(subreddit));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // default will refresh checkboxes -> bad
        let searchbar = document.getElementById("query");
        const encoded = encodeURI(searchbar.value);
        searchbar.value = '';
        const query = "search/?q=" + encoded;
        dispatch(addQuery(query));
    }

    return (
        <header>
            <div id="banner">
                <NavLink to='/' className='link' >Reddit <i>Stories</i></NavLink>
            </div>
            <div id="options">
                <div id="checklist">
                    <fieldset>
                        <legend>Included subreddits:</legend>
                        <div>
                            <input type="checkbox" id="aita" name="aita" onChange={() => handleCheck("aita", "AmITheAsshole")} />
                            <label htmlFor="aita">r/AmITheAsshole</label>
                        </div>

                        <div>
                            <input type="checkbox" id="reladvice" name="reladvice" onChange={() => handleCheck("reladvice", "relationship_advice")}/>
                            <label htmlFor="reladvice">r/relationship_advice</label>
                        </div>

                        <div>
                            <input type="checkbox" id="advice" name="advice" onChange={() => handleCheck("advice", "advice")} />
                            <label htmlFor="advice">r/advice</label>
                        </div>
                    </fieldset>
                </div>
                <form id="query-form" role="search" onSubmit={handleSubmit}>
                    <input type="search" id="query"/>
                    <button type="submit" form="query-form">Search</button>
                </form>
            </div>
        </header>
    )
};