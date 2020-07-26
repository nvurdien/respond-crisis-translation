import React from 'react';
import './Home.css'

import Sidebar from '../../components/Sidebar/Sidebar'

import Cases from '../../assets/lists/Cases'


export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cases: [],
            lang_short: {
                'Arabic': 'AR',
                'Cantonese': 'ZH-C',
                'Chinese': 'ZH',
                'Farsi': 'FS',
                'French': 'FR',
                'Haitian Creole': 'HCR',
                'Pulaar': 'PU',
                'Punjabi': 'PA',
                'Portuguese': 'PT',
                'Romanian': 'RO',
                'Russian': 'RU',
                'Spanish': 'ES',
                'Tigrinya': 'TI',
                'Turkish': 'TR',
                'Ukrainian': 'UK',
                'English': 'EN'
            }
        }
    }

    componentDidMount() {
        this.setState({cases:Cases})
    }

    render() {
        return (
            <>
                <Sidebar active="mycases"/>
                <div className="tm-main uk-section uk-section-default">
                    <div className="uk-container uk-container-small uk-position-relative">
                        <div className="uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid="">
                            {
                                this.state.cases.map((c, index) => (
                                    <a href={`/case/${c['case_number']}`} style={{textDecoration: 'none'}}>
                                        <div className="uk-card uk-card-default uk-card-hover uk-card-body">
                                            <div className="uk-card-badge uk-label">{this.state.lang_short[c['fromLanguage']]} - {this.state.lang_short[c['toLanguage']]}</div>
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