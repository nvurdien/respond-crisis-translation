import React from 'react';
import './Statistics.css'

import Sidebar from '../../components/Sidebar/Sidebar'


export default class Statistics extends React.Component {


    render() {
        return(<>
            <Sidebar active="statistics" user_type={this.props.user_type ? "admin" : "all"} first_name={this.props.first_name} last_name={this.props.last_name}/>
            <div className="tm-main uk-section uk-section-default">
                    <div className="uk-container uk-position-relative uk-margin-remove" style={{paddingLeft: '10px', paddingRight: '10px', marginRight: '0px'}}>
                        
                    </div>
                </div>
        </>);
    }
}