import { useEffect, useState } from "react";
import PostService from "../_services/PostService";
import { Link } from "react-router-dom";

function Posts() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState({ name: 'Title', type: 'nor' });
    const [searchTerm, setSearchTerm] = useState('');
    const [searchValue, setSearchValue] = useState([]);

    useEffect(() => {
        retrievePosts();
    }, []);

    const retrievePosts = () => {
        PostService.getAll()
            .then(response => {
                setPosts(response.data);
                setSearchValue(response.data);
                setLoading(true);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const RemoveItem = (id) => {
        const listAfterRemoveItem = searchValue.filter(post => post.id !== id);
        setSearchValue(listAfterRemoveItem);
        setPosts(listAfterRemoveItem);
    }

    const ChangeOrder = () => {
        let listAfterSort = [...searchValue];

        switch (sort.type) {
            case 'nor':
                listAfterSort.sort((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : ((b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0));
                setSearchValue(listAfterSort);
                setPosts(listAfterSort);
                setSort({ name: 'Title - ASC', type: 'asc' });
                break;

            case 'asc':
                listAfterSort.reverse((a, b) => (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 : ((b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0));
                setSearchValue(listAfterSort);
                setPosts(listAfterSort);
                setSort({ name: 'Title - DES', type: 'des' });
                break;

            case 'des':
                listAfterSort.sort((a, b) => a.id - b.id);
                setSearchValue(listAfterSort);
                setPosts(listAfterSort);
                setSort({ name: 'Title', type: 'nor' });
                break;
            default:
                break;
        }
    }

    const handleChange = (e) => {
        const listAfterFilter = posts.filter(post => post.title.includes(e.target.value));
        setSearchValue(listAfterFilter);
        setSearchTerm(e.target.value);
    }



    return (
        <div>
            {loading ?
                <>
                    <input style={{width: "300px"}} className="form-control me-2 mt-3" type="search" placeholder="Search by title" aria-label="Search" onChange={handleChange}></input>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col" onClick={() => ChangeOrder()}>{sort.name}</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchValue.map(post =>
                                    <tr key={post.id}>
                                        <th scope="row">{post.id}</th>
                                        <td>{post.title}</td>
                                        <td>
                                            <button type="button" className="btn btn-danger" onClick={() => RemoveItem(post.id)}>Remove</button>
                                            {/* <button type="button" className="btn btn-success">Detail</button> */}
                                            <Link to={`/posts/${post.id}`}>Detail</Link>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </>

                : <h3 className="mt-3">Loading</h3>
            }

        </div>

    );


}

export default Posts;