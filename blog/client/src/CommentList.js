// import React, { useState, useEffect } from 'react';
import React from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const CommentList = ({ postId }) => {
//     const [comments, setComments] = useState([]);

//     const fetchComments = async () => {
//         const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
//         setComments(res.data);
//     };

//     useEffect(() => {
//         fetchComments();
//     }, []);

const CommentList = ({comments}) => {    
    const renderedComments = comments.map(comment => {
        // return <li key={comment.id}>{comment.content}</li>;
   
        let content;

        if (comment.status === 'approved') {
            content = comment.content;
        } else if (comment.status === 'pending') {
            content = 'This comment is awaiting moderation';
        } else if (comment.status === 'rejected') {
            content = comment.content + '- This comment has been rejected';
        }

        return <li key={comment.id}>{content}</li>;
    });

    return (
        <div>
            <ul>
                {renderedComments}
            </ul>
        </div>
    );
};

export default CommentList;