import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import "./sidebar.css";


export default function Sidebar() {
    const [cat, setCat] = React.useState([]);

    React.useEffect(() => {
        const getCat = async () => {
            const res = await axios.get("/api/categories");
            setCat(res.data);
        };
        getCat();
    },[]);
    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className='sidebarTitle'>About Me</span>
                <img
                    src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
                    alt=""
                />
                <p>
                    The about me page is not completed yet, but as a learner 
                    and the author of this app, I hope you enjoyed it. :)
                </p>
                <div className="sidebarItem">
                    <span className='sidebarTitle'>Categories</span>
                    <ul className="sidebarList">
                        {cat.map(c => (
                            <Link to={`/?cat=${c.name}`} className='link'>
                                <li className='sidebarListItem'>{c.name}</li>
                            </Link>
                        ))}
                    </ul>
                </div>

                <div className="sidebarItem">
                    <span className="sidebarTitle">Follow Me</span>
                    <div className="sidebatSocial">
                        <i className="sidebarIcon fab fa-facebook-square"></i>
                        <i className="sidebarIcon fab fa-twitter-square"></i>
                        <i className="sidebarIcon fab fa-instagram-square"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}
