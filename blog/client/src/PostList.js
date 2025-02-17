import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList =  () => {
    const [posts, setPosts] = useState({});

    // const fetchPosts =  async () => {
    //     const res =  await axios.get('http://posts.com/posts');
    //     setPosts(res.data);
    //     console.log(res.data);
    // };
    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://posts.com/posts');
            setPosts(res.data);
            console.log(res.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, []); // Add an empty dependency array to run only once

    const renderedPosts = Object.values(posts).map(post => {
        return (
            <div className="card" style={{ width: '30%', marginBottom: '20px' }} key={post.id}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        );
    }); 

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    );
};

export default PostList;