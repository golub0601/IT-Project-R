import { Link } from 'react-router-dom';
import "../style/style.scss";
import "../style/menu.scss";
import LoadingSpinner from './LoadingSpinner.jsx';


function Menu({ posts }) {
  
  if (!posts) {
    return <LoadingSpinner />
  }

  if (posts.length === 0) {
    return <h1>No posts available from same category.</h1>;
  }

  return (
    <div className='menu-container'>
      <h1>Other posts that you may like:</h1>
          {posts.map((post)=>(
            <div className='post-view-menu' key={post.id}>
              <img src={`../uploads/${post.cover_img}`} alt="" />
              <h2>{post.title}</h2>
              <Link to={`/post/${post.id}`}>
                <button className='read-post-btn'>Read more</button>
              </Link>
            </div>
          ))}
    </div>
  );
}

export default Menu;
