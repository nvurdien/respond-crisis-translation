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
                <Sidebar active="mycases" user_type={this.props.user_type ? "admin" : "all"} first_name={this.props.first_name} last_name={this.props.last_name}/>
                <div className="tm-main uk-section uk-section-default">
                    <div className="uk-container uk-position-relative uk-margin-remove" style={{paddingLeft: '10px', paddingRight: '10px', marginRight: '0px'}}>
                        <div className="uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-expand@l" uk-grid="" style={{marginRight: '0px'}}>
                            {
                                this.state.cases.map((c, index) => (
                                    <a key={index} href={`/case/${c['case_number']}`} style={{textDecoration: 'none'}}>
                                        <div className="uk-card uk-card-default uk-card-hover uk-card-body">
                                            <div className="uk-clearfix">
                                                <div className="uk-float-left">
                                                    <div className="uk-label">{lang_short[c['fromLanguage']]} &#9658; {lang_short[c['toLanguage']]}</div>
                                                </div>
                                                <div className="uk-float-right">
                                                    <p className="uk-text-bold" style={{color: 'black'}}>{c['due_date'].getMonth()}/{c['due_date'].getDate()}/{c['due_date'].getYear()}</p>
                                                </div>
                                            </div>
                                            <h3 className="uk-card-title uk-margin-remove">{c['first_name']} {c['last_name']}</h3>
                                            <p className="uk-margin-remove">{c.documents.length} documents</p>
                                            <p className="uk-margin-remove">#{c.case_number}</p>
                                            <hr/>
                                            <ul>
                                                {
                                                    c.documents.map((doc, i) => 
                                                        <li key={`${doc.name} ${i}`}>{doc.name}</li>
                                                    )
                                                }
                                            </ul>
                                            <hr/>
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