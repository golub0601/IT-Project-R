import React from 'react'
import User from '../imgs/user.jpg'
import {Link} from 'react-router-dom'
import "../style/style.scss"
import "../style/single-post.scss"
import Menu from '../components/Menu'

const SinglePost = () => {
  return (
    <div className='singlePost'>
      <div className='content'>
        <img src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <div className='info'>
            <div className="user-img">
              <img src={User} alt="" />
            </div>
            <div className='text-info'>
              <span><Link>John Doe</Link></span>
              <div className='post-info'>Posted 2 days ago</div>
            </div>
            <div className="edit-links">
              <Link to="/write?edit=2"><button className='edit'>Edit Post</button></Link>
              <Link><button className='delete'>Delete Post</button></Link>
            </div>
        </div>
        <div className="post-text">
          <h1>Lorem ipsum dolor sit amet consectetur</h1>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto eos, eveniet beatae itaque repellendus expedita repellat incidunt ut rem, deserunt atque quod nemo, eligendi quas. Vitae impedit, provident, sint quibusdam tenetur laborum at enim sapiente maxime, dolorum aliquam voluptatibus alias! Excepturi porro nulla at doloribus fuga vero minima repellat accusantium nostrum ipsa eos nam itaque, temporibus dolorem cum optio possimus iure placeat. Commodi beatae alias consequatur illo nihil saepe nemo eius. Magnam dolorem autem maiores impedit corporis doloribus illum quae beatae accusantium aspernatur hic voluptas iure deleniti nihil, suscipit aliquam, repudiandae laudantium ratione culpa odio iusto officia praesentium. Magni vel, sunt animi similique suscipit quam cumque quo quisquam harum nisi possimus odit accusantium nihil non quaerat expedita rerum? Aut, similique.
          </p>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto eos, eveniet beatae itaque repellendus expedita repellat incidunt ut rem, deserunt atque quod nemo, eligendi quas. Vitae impedit, provident, sint quibusdam tenetur laborum at enim sapiente maxime, dolorum aliquam voluptatibus alias! Excepturi porro nulla at doloribus fuga vero minima repellat accusantium nostrum ipsa eos nam itaque, temporibus dolorem cum optio possimus iure placeat. Commodi beatae alias consequatur illo nihil saepe nemo eius. Magnam dolorem autem maiores impedit corporis doloribus illum quae beatae accusantium aspernatur hic voluptas iure deleniti nihil, suscipit aliquam, repudiandae laudantium ratione culpa odio iusto officia praesentium. Magni vel, sunt animi similique suscipit quam cumque quo quisquam harum nisi possimus odit accusantium nihil non quaerat expedita rerum? Aut, similique.
          </p>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto eos, eveniet beatae itaque repellendus expedita repellat incidunt ut rem, deserunt atque quod nemo, eligendi quas. Vitae impedit, provident, sint quibusdam tenetur laborum at enim sapiente maxime, dolorum aliquam voluptatibus alias! Excepturi porro nulla at doloribus fuga vero minima repellat accusantium nostrum ipsa eos nam itaque, temporibus dolorem cum optio possimus iure placeat. Commodi beatae alias consequatur illo nihil saepe nemo eius. Magnam dolorem autem maiores impedit corporis doloribus illum quae beatae accusantium aspernatur hic voluptas iure deleniti nihil, suscipit aliquam, repudiandae laudantium ratione culpa odio iusto officia praesentium. Magni vel, sunt animi similique suscipit quam cumque quo quisquam harum nisi possimus odit accusantium nihil non quaerat expedita rerum? Aut, similique.
          </p>
        </div>
      </div>
      <div className="menu">
        <Menu/>
      </div>
    </div>
  )
}

export default SinglePost