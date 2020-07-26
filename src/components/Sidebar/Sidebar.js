import React from 'react';
import './Sidebar.css'

export default ({active}) => (
    <div className="tm-sidebar-left uk-visible@m">
        <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
            <li className={active === 'mycases' ? `uk-active` : ''}><a href="/">My Cases</a></li>
            <li className={active === 'tasks' ? `uk-active` : ''}><a href="/tasks">Task Board</a></li>
            <li className={active === 'community' ? `uk-active` : ''}><a href="/community">Community</a></li>
            <li className={active === 'record' ? `uk-active` : ''}><a href="/record">Record</a></li>
            <li className={active === 'settings' ? `uk-active` : ''}><a href="settings">Settings</a></li>
            <li><a href="/logout">Logout</a></li>
        </ul>
    </div>
)