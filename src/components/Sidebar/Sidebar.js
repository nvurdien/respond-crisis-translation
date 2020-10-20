import React from 'react';
import './Sidebar.css';
import Links from './lists/links';
import Logo from '../../assets/images/Respond_Logo_icon_fullcolor.png'

export default ({active, user_type, first_name, last_name}) => (
    <div className="tm-sidebar-left uk-visible@m">
        <div className="uk-margin-large-bottom" style={{paddingLeft: '10px'}}>
            <img src={Logo} width={50} height={50} alt="Respond Crisis Translation Logo"/>
        </div>
        <div className="uk-margin-large-bottom" style={{paddingLeft: '10px'}}>
            <h3 className="uk-card-title uk-margin-remove-bottom">{first_name} {last_name}</h3>
            <p className="uk-text-meta uk-margin-remove-top" style={{'color': 'black'}}>{user_type === 'admin' ? 'admin' : 'translator'}</p>
                        
        </div>
        <ul className="uk-nav uk-nav-primary uk-nav-left uk-margin-auto-vertical">
            {
                Links.map((link, index) => link.visibility === user_type || link.visibility === 'all' ? 
                    <li key={link.display + index} className={active === link.active ? `uk-active` : ''}><a href={link.link}>{link.display}</a></li> : ""
                )
            }
            <li><a href="/logout">Logout</a></li>
        </ul>
    </div>
)