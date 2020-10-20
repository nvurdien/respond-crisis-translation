import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'
import formatDate from '../../assets/helpers/formatDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import Case from '../../assets/lists/Cases'

export default class CasePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            case: Case[this.props.match.params.case_id],
            show: null
        }
    }

    componentDidMount(){
    }

    render() {
        return (
            this.state.case ?
            <>
            <Sidebar active="mycases" user_type={this.props.user_type ? "admin" : "all"} first_name={this.props.first_name} last_name={this.props.last_name}/>
            <div className="tm-main uk-section uk-section-default">
                <div className="uk-container uk-position-relative uk-margin-remove">
                    <a href="/mycases" className="uk-button uk-button-default uk-margin-bottom" type="button"><FontAwesomeIcon icon={faChevronLeft} /></a>
                    <div className="uk-clearfix">
                        <div className="uk-float-left">
                            <p className="uk-text-lead uk-text-bold uk-margin-remove">
                                {this.state.case['first_name']} {this.state.case['last_name']} ({this.state.case.location})
                            </p>
                            <p className="uk-margin-remove">
                                {this.state.case['fromLanguage']} to {this.state.case['toLanguage']}
                            </p>
                            <p className="uk-margin-remove-top">
                                #{this.state.case['case_number']}
                            </p>
                        </div>
                        <div className="uk-float-right">
                            <p className="uk-text-lead uk-text-bold">
                                DUE {formatDate(this.state.case.due_date)}
                            </p>
                        </div>
                    </div>
                    <table className="uk-table uk-table-divider">
                        <thead>
                            <tr>
                                <th>Document Name</th>
                                <th>Date Completed</th>
                                <th>Translation Status</th>
                                <th>File type</th>
                                <th>File</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.case.documents.map((onboard, i) => (
                                    <React.Fragment key={onboard.first_name+onboard.last_name+" "+i}>
                                        <tr onClick={() => {this.setState({show: this.state.show === i ? null : i})}}>
                                            <td>
                                                {onboard.name}
                                            </td>
                                            <td>
                                                {onboard.date_completed ? formatDate(onboard.date_completed) : '--'}
                                            </td>
                                            <td>
                                                {onboard.translated_document_link ? 'Complete' : 'Active'}
                                            </td>
                                            <td>
                                                {onboard.file_type}
                                            </td>
                                            <td>
                                                <a href={onboard.file_link} target="_blank" rel="noopener noreferrer">C</a>
                                            </td>
                                        </tr>
                                        <tr style={{display: this.state.show === i ? "" : "none", borderTop: 'none'}}>
                                            <td colSpan={5}>
                                                <iframe id={`frame-${i}`} title={onboard.name} src={onboard.file_link} width="640" height="480"></iframe>
                                                <p><b>Uploaded Document</b></p>
                                                {
                                                    onboard.translated_document_link ? 
                                                    <p>{onboard.translated_document_name}.{onboard.translated_document_file_type}</p> :
                                                    <p>-</p>

                                                }
                                                <div className="uk-clearfix">
                                                    <div className="uk-float-right">
                                                        {
                                                            onboard.translated_document_link ? 
                                                                <>
                                                                    <button className="uk-button uk-button-primary" style={{marginRight: '5px'}}>View Certification</button> 
                                                                    <button className="uk-button uk-button-primary">Undo Complete</button>
                                                                </>
                                                                :
                                                                <>
                                                                    <button className="uk-button uk-button-primary" style={{marginRight: '5px'}}>Complete Task</button> 
                                                                    <button className="uk-button uk-button-primary">Upload</button>
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))
                            }
                        </tbody>
                    </table>
                    <hr/>
                    <p className="uk-margin-remove">Note: {this.state.case.note}</p>
                    <p className="uk-margin-remove">PM: {this.state.case.project_manager}</p>
                    <p className="uk-margin-remove"><a href={`mailto:${this.state.case.email}`}>Send a message regarding this case</a></p>
                </div>
            </div>
        </>
        : ""
        )
    }
}