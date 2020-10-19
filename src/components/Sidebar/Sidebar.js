import React from 'react';
import './Sidebar.css';
import Links from './lists/links';

export default ({active, user_type}) => (
    <div className="tm-sidebar-left uk-visible@m">
        <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
            {
                Links.map((link, index) => 
                    <li key={link.display + index} className={active === link.active ? `uk-active` : ''}><a href={link.link}>{link.display}</a></li>
                )
            }
            <li><a href="/logout">Logout</a></li>
        </ul>
    </div>
)