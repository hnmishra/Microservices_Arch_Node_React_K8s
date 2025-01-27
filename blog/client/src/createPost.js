import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [posts, setPosts] = useState([]);

    // useEffect(() => {
    //     const fetchPosts =  () => {
    //         const res =  axios.get('http://posts.com/posts/create');
    //         setPosts(res.data);
    //     };
        
    //     fetchPosts();
    // }, []);

    const onSubmit =  async (event) => {
        event.preventDefault();
        console.log('Title:', title);
          await axios.post('http://posts.com/posts/create', {
            title
        });
        setTitle('');
        // const res =  await axios.get('http://posts.com/posts');
        // setPosts(res.data);
    };

    return (
        <div className="container mt-5">
            <h1>Create Post</h1>
            <form onSubmit={onSubmit}>
                
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        id="title"
                        name="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                   
                   
                </div>
   
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    );
};

export default CreatePost;