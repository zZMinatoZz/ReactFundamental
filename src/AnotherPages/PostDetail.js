import { useEffect, useState } from "react";
import PostService from "../_services/PostService";
import { Link, useParams } from "react-router-dom";

function PostDetail() {
    const postId = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        PostService.getById(postId.postId).then(response => {
            setPost(response.data);
            setLoading(true);
        }).catch(error => {
            console.log(error);
        })
    }, [postId.postId])

    return (
        <div>
            {
                loading ?
                    <>
                        <h3 className="mt-3">Post Detail Page</h3>
                        <h3>ID: {post.id}</h3>
                        <h3>Title:</h3>
                        <div>{post.title}</div>
                        <h3>Body:</h3>
                        <div>{post.body}</div>
                        <Link to="/posts">Return to Post list</Link>
                    </>
                    : <h2 className="mt-3">Loading</h2>
            }

        </div>
    )
}

export default PostDetail;