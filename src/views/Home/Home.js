import React from 'react';
import './Home.css'

import Sidebar from '../../components/Sidebar/Sidebar';
import lang_short from '../../assets/lists/langShort';

import Cases from '../../assets/lists/Cases'


export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cases: [],
        }
    }

    componentDidMount() {
        this.setState({cases:Cases})
    }

    render() {
        return (
            <>
                <Sidebar active="mycases" user_type={this.props.user_type ? "admin" : "all"}/>
                <div className="tm-main uk-section uk-section-default">
                    <div className="uk-container uk-position-relative uk-margin-remove" style={{paddingLeft: '10px', paddingRight: '10px', marginRight: '0px'}}>
                        <div className="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-expand@l" uk-grid="" style={{marginRight: '0px'}}>
                            {
                                this.state.cases.map((c, index) => (
                                    <a key={index} href={`/case/${c['case_number']}`} style={{textDecoration: 'none'}}>
                                        <div className="uk-card uk-card-default uk-card-hover uk-card-body">
                                            <div className="uk-card-badge uk-label">{lang_short[c['fromLanguage']]} - {lang_short[c['toLanguage']]}</div>
                                            <h3 className="uk-card-title">{c['due_date'].getMonth()}/{c['due_date'].getDate()}/{c['due_date'].getYear()}</h3>
                                            <h3 className="uk-card-title">{c['first_name']} {c['last_name']}</h3>
                                            <p>
                                                <span className="uk-text-bold">Notes:</span>{c['note']}
                                            </p>
                                        </div>
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}