import React from 'react';
import './Settings.css'

import Sidebar from '../../components/Sidebar/Sidebar'


export default class Settings extends React.Component {


    render() {
        return(<>
            <Sidebar active="settings" user_type={this.props.user_type ? "admin" : "all"}/>
            <div className="tm-main uk-section uk-section-default">
                    <div className="uk-container uk-position-relative uk-margin-remove" style={{paddingLeft: '10px', paddingRight: '10px', marginRight: '0px'}}>
                        
                    </div>
                </div>
        </>);
    }
}