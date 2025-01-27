const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:postId/comments', (req, res) => {
    const { postId } = req.params;
    const comments = commentsByPostId[postId] || [];
    res.send(comments);
});

app.post('/posts/:postId/comments', async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    const commentId = randomBytes(4).toString('hex');
    const comments = commentsByPostId[postId] || [];
  
    const newComment = { id: commentId, content, status: 'pending' };
    comments.push(newComment);
    commentsByPostId[postId] = comments;

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId,
            status: 'pending'
        }
    });

    res.status(201).send(newComment);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(comment => comment.id === id);
        if (comment) {
            comment.status = status;
        }

        axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                postId,
                status,
                content
            }
        });
    }

    console.log('Received Event', type);
    res.send({});
});

app.listen(4001, () => {
    console.log('Listening Comment Endpoint on port 4001');
});