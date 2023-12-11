import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios';

import Post from './components/Post';
import Pagination from './components/Pagination';

function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);


    useEffect(() => {
        async function fetchPosts(){
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    function paginate(pageNumber){
        setCurrentPage(pageNumber);
    };

  return (
    <div className="container mt-5">
      <h1 className='text-primary mb-3'>React Simple Pagination</h1>
      <Post posts={currentPosts} loading={loading}/>

      <Pagination 
        postsPerPage={postsPerPage} 
        totalPosts={posts.length} 
        paginate={paginate} />
    </div>
  );
}

export default App;
