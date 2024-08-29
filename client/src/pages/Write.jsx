import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../style/style.scss"
import "../style/write-page.scss"

const Write = () => {
  const [value, setValue] = useState('');
  return (
    <div className='write-page-container'>
      <div className='content'>
          <input type="text" maxLength={30} name="title" placeholder='Title of post' id="" />
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
              <input type="radio" name="category" value="art" id="art" />
              <label htmlFor="art">ART</label>
            </div>
            <div className="catG">
              <input type="radio" name="category" value="since" id="sience" />
              <label htmlFor="sience">SIENCE</label>
            </div>
            <div className="catG">
              <input type="radio" name="category" value="houses" id="houses" />
              <label htmlFor="houses">HOUSES</label>
            </div>
            <div className="catG">
              <input type="radio" name="category" value="appartments" id="appartments" />
              <label htmlFor="appartments">APPARTMENTS</label>
            </div>
          </div>
        </div>
        <label htmlFor='postImage' className='upload-btn'><input style={{display:"none"}} type="file" name="postImage" id="postImage" />Upload Photo</label>
        <hr />
        <button>Publish post</button>
      </div>
    </div>
  )
}

export default Write