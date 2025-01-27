import React from 'react';
import CreatePost from './createPost';
import PostList from './PostList';

const App = () => {
    return (
        <div>
        <h1>Create Posts!!!</h1>
            <CreatePost />
            <hr />
            <h1>Posts</h1>  
            <PostList />
        </div>
    );
};

export default App;