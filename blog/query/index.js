const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/posts', (_, res) => {
    res.send(posts);
});

const handleEvent = (type,data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type === 'CommentCreated') {
        const { id, content, postId,status } = data;
        const post = posts[postId];
        if (post) {
            post.comments.push({ id, content,status });
        }
    }
    if (type === 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        if (post) {
            const comment = post.comments.find(comment => comment.id === id);
            if (comment) {
                comment.content = content;
                comment.status = status;
            }
        }
    }
}

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);
    console.log(posts);

    res.send({}); 
});

app.listen(4002, async() => {
    console.log('Listening Query Endpoint on 4002');
    try {
        const res = await axios.get('http://event-bus-srv:4005/events');
        for (let event of res.data) {
            console.log('Processing event:', event.type);
            handleEvent(event.type, event.data);
        }
    } catch (error) {
        console.error('Error fetching events:', error.message);
    }
});