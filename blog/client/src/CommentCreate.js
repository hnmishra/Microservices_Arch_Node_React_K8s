import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CommentCreate = ({ postId }) => {
    const [content, setContent] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();
       const t1=  await axios.post(`http://posts.com/posts/${postId}/comments`, {
            content
        });
        setContent('');
       // console.log(t1);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input 
                        value={content} 
                        onChange={e => setContent(e.target.value)} 
                        className="form-control" 
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default CommentCreate;