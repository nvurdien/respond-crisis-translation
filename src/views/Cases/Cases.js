import React from 'react';
import './Cases.css';
import cases from '../../assets/lists/Cases';
import formatDate from '../../assets/helpers/formatDate';

import lang_short from '../../assets/lists/langShort';
import translators from '../../assets/lists/translators';
import Sidebar from '../../components/Sidebar/Sidebar';


export default class Cases extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: null
        }
    }


    render() {
        return(
        <>
            <Sidebar active="cases" user_type={this.props.user_type ? "admin" : "all"}/>
            <div className="tm-main uk-section uk-section-default">
                    <div className="uk-container uk-position-relative uk-margin-remove" style={{paddingLeft: '10px', paddingRight: '10px', marginRight: '0px'}}>
                    <table className="uk-table uk-table-divider">
                        <thead>
                            <tr>
                                <th>Language</th>
                                <th>Client</th>
                                <th>Sources</th>
                                <th>Case Number</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>PM</th>
                                <th>Translator</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cases.map((onboard, i) => (
                                    <React.Fragment key={onboard.first_name+onboard.last_name+" "+i}>
                                        <tr onClick={() => {this.setState({show: this.state.show === i ? null : i})}}>
                                            <td>
                                                <span className="uk-label">{lang_short[onboard.fromLanguage]} - {lang_short[onboard.toLanguage]}</span>
                                                
                                            </td>
                                            <td>
                                                    {onboard.first_name} {onboard.last_name}
                                            </td>
                                            <td>
                                                {onboard.source}
                                            </td>
                                            <td>
                                                    {onboard.case_number}
                                            </td>
                                            <td>
                                                    {formatDate(onboard.due_date)}
                                            </td>
                                            <td>
                                                {onboard.status}
                                            </td>
                                            <td>
                                                {onboard.project_manager}
                                            </td>
                                            <td>
                                                {translators[onboard.translator].first_name} {translators[onboard.translator].last_name}
                                            </td>
                                        </tr>
                                        <tr style={{display: this.state.show === i ? "" : "none"}}>
                                            <td></td>
                                            <td colSpan={8}>
                                                <div uk-grid="">
                                                    <div className="uk-width-auto">
                                                        <p>
                                                            <b>Contact</b>
                                                        </p>
                                                        <p>
                                                            {onboard.email}
                                                        </p>
                                                    </div>
                                                    <div className="uk-width-auto">
                                                        <p>
                                                            <b>Contact at organization</b>
                                                        </p>
                                                        <p>
                                                            {onboard.contact}
                                                        </p>
                                                    </div>
                                                </div>
                                                <table className="uk-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Document Name</th>
                                                            <th>File Type</th>
                                                            <th>Download</th>
                                                            <th>Translation Upload</th>
                                                            <th>Certificate Download</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            onboard.documents.map((document, p) => 
                                                                <tr>
                                                                    <td>
                                                                        {document.name}
                                                                    </td>
                                                                    <td>
                                                                        {document.file_type}
                                                                    </td>
                                                                    <td>
                                                                        <a href={document.file_link} target="_blank" rel="noopener noreferrer">C</a>
                                                                    </td>
                                                                    <td>
                                                                    <a href={document.translated_document_link} target="_blank" rel="noopener noreferrer">C</a>
                                                                    </td>
                                                                    <td>
                                                                        <a href={document.certificate_upload} target="_blank" rel="noopener noreferrer">C</a>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))
                                
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
        </>
        );
    }
}