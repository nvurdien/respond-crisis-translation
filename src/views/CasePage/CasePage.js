import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'

import Case from '../../assets/lists/Cases'

export default class CasePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            case: Case[this.props.match.params.case_id]
        }
    }

    componentDidMount(){
    }

    getPageNumbers = (id) => {
        console.log(id)
        let value = document.getElementById(id).contentWindow.document.querySelectorAll('.page').length
        console.log(value)
        return value
    }

    render() {
        return (
            this.state.case === {} ?
            ""
            : 
            <>
            <Sidebar active="mycases"/>
            <div className="tm-main uk-section uk-section-default">
                <div className="uk-container uk-container-small uk-position-relative">
                    <div>
                        {this.state.case['first_name']} {this.state.case['last_name']}
                    </div>
                    <ul uk-accordion="multiple: true">
                        {
                            this.state.case['documents'].map((document, index) => (
                                <li key={'document ' + index}>
                                    {/* eslint-disable */}
                                    <a className="uk-accordion-title" href="#">{document.name}</a>
                                    {/* eslint-enable */}
                                    <div className="uk-accordion-content">
                                        <p>
                                            <iframe id={`frame-${index}`} title={document.name} src={document.file_link} width="640" height="480"></iframe>

                                        </p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
        )
    }
}