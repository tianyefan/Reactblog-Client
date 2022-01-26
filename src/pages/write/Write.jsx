import axios from 'axios';
import React from 'react';
import { Context } from '../../context/Context';
import "./write.css"


export default function Write() {

    const [title, setTitle] = React.useState("");
    const [desc, setDesc] = React.useState("");
    const [cats, setCats] = React.useState([]);
    const [file, setFile] = React.useState(null);
    const { user } = React.useContext(Context);

    console.log(cats);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
            categories: cats,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", data);
            } catch (err) {
                console.log(err);
            }
        }
        try {
            const res = await axios.post("/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className='write'>
            {file && (
                <img
                    className='writeImg'
                    src={URL.createObjectURL(file)}
                    alt=''
                />
            )}
            <form
                onSubmit={handleSubmit}
                className="writeForm"
            >
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className='writeIcon fas fa-plus'></i>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder='Title'
                        className='writeInput'
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                </div>

                <div className="writeFormGroup">
                    <select onChange={(e) => setCats([e.target.value])}>
                        <option value="">Choose a topic</option>
                        <option value="Life">Life</option>
                        <option value="Tech">Tech</option>
                        <option value="Music">Music</option>
                        <option value="Sport">Sport</option>
                        <option value="Travel">Travel</option>
                        <option value="Love">Love</option>
                    </select>
                </div>

                <div className="writeFormGroup">

                    <textarea
                        className='writeInput writeText'
                        placeholder='Tell your story...'
                        type='text'
                        onChange={(e) => setDesc(e.target.value)}>
                    </textarea>

                    <button className='writeSubmit' type='submit'>Publish</button>
                </div>

                
            </form>
        </div>
    )
}
