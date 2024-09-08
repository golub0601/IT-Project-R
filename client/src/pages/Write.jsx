import React, { useContext, useState } from 'react'
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import "../style/style.scss"
import "../style/write-page.scss"
import { useLocation, useNavigate } from 'react-router-dom';
import moment from "moment";
import { AuthContext } from '../context/authContext.jsx';

const Write = () => {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.body || "");
  const [title, setTitle] = useState(state?.title || "");
  const [category_id, setCategory] = useState(state?.category_id || "");
  const [cover_img, setCoverImg] = useState(null);
  const navigate = useNavigate()
  const { currUser } = useContext(AuthContext);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("cover_img", cover_img);
      const res = await axios.post("http://localhost:8800/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
            title,
            body: value,
            category_id,
            cover_img: cover_img ? imgUrl : "1725498437041peakpx.jpg",
          })
        : await axios.post(`http://localhost:8800/api/posts/`, {
            title,
            desc: value,
            category_id,
            cover_img: cover_img ? imgUrl : "1725498437041peakpx.jpg",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/posts/home")
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='write-page-container'>
      <div className='content'>
          <input type="text" maxLength={30} name="title"  value={title} placeholder='Title of post' id="" onChange={e=>setTitle(e.target.value)} />
          <div className="editorContainer">
            <ReactQuill  theme="snow" value={value} onChange={setValue} className='richEditor' />
          </div>
      </div>

      <div className='menu'>
      <div className="catInput">
          <div className='titleOfGroup'>
            <h4>Select category of post:</h4>
          </div>
          <div className="catGroup">
            <div className='catG'>
              <input type="radio" name="category" checked={category_id == 3} value="3"  onChange={e => setCategory(e.target.value)} id="loots" />
              <label htmlFor="loots">LOOTS</label>
            </div>              
            <div className="catG">
              <input type="radio" name="category" checked={category_id == 1} value="1" onChange={e => setCategory(e.target.value)} id="houses" />
              <label htmlFor="houses">HOUSES</label>
            </div>
            <div className="catG">
              <input type="radio" name="category" checked={category_id == 2} value="2" onChange={e => setCategory(e.target.value)} id="appartments" />
              <label htmlFor="appartments">APPARTMENTS</label>
            </div>
          </div>
        </div>
        <label htmlFor='cover_image' className='upload-btn'><input style={{display:"none"}} type="file" onChange={(e) => setCoverImg(e.target.files[0])} name="cover_image" id="cover_image" />Upload Photo</label>
        <hr />
        <button onClick={handleSubmit}>Publish post</button>
      </div>
    </div>
  )
}

export default Write