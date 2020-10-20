import React from 'react';
import './Onboarding.css';
import Onboard from '../../assets/lists/onboarding';
import TranslationTest from '../../assets/lists/translationTest';
import lang_short from '../../assets/lists/langShort';

import Sidebar from '../../components/Sidebar/Sidebar';


export default class Onboarding extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: null
        }
    }


    render() {
        console.log(this.props)
        return(
        <>
            <Sidebar active="onboarding" user_type={this.props.user_type ? "admin" : "all"} first_name={this.props.first_name} last_name={this.props.last_name}/>
            <div className="tm-main uk-section uk-section-default">
                    <div className="uk-container uk-position-relative uk-margin-remove" style={{paddingLeft: '10px', paddingRight: '10px', marginRight: '0px'}}>
                    <table className="uk-table uk-table-divider">
                        <thead>
                            <tr>
                                <th>Applicant Name</th>
                                <th>Language(s)</th>
                                <th>Application Date</th>
                                <th>Specialty</th>
                                <th>Application Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Onboard.map((onboard, i) => (
                                    <React.Fragment key={onboard.first_name+onboard.last_name+" "+i}>
                                        <tr onClick={() => {this.setState({show: this.state.show === i ? null : i})}} style={{cursor: 'pointer'}}>
                                            <td>
                                                    {onboard.first_name} {onboard.last_name}
                                            </td>
                                            <td>
                                                {
                                                    onboard.languages.map((language, y) => (
                                                        <span className="uk-label" key={onboard.first_name+onboard.last_name+language.from_langauge+language.to_langauge+" language(s) "+i+" "+y}>{lang_short[language.from_langauge]} &#9658; {lang_short[language.to_language]}</span>
                                                    ))
                                                }
                                            </td>
                                            <td>
                                                    {onboard.date_submitted.toDateString()}
                                            </td>
                                            <td>
                                                {
                                                    onboard.specialities.map((special, z) => (
                                                        <span key={onboard.first_name+onboard.last_name+special+" "+i+" "+z}>
                                                            {special},
                                                        </span>
                                                    ))
                                                } 
                                            </td>
                                            <td>
                                                {
                                                    onboard.status
                                                }
                                            </td>
                                        </tr>
                                        <tr style={{display: this.state.show === i ? "" : "none", borderTop: 'none'}}>
                                            <td colSpan={5}>
                                                <p>
                                                    <b>Email</b>
                                                </p>
                                                <p>
                                                    {onboard.email}
                                                </p>
                                                <p>
                                                    <b>Reason for joining</b>
                                                </p>
                                                <p>
                                                    {onboard.about}
                                                </p>
                                                <div uk-grid="">
                                                    <div className="uk-width-auto">
                                                        <p>
                                                            <b>Language Support</b>
                                                        </p>
                                                        {
                                                            onboard.languages.map((language, b) => (
                                                                <p key={onboard.first_name+onboard.last_name+language.from_langauge+language.to_language+" language_support "+i+" "+b}>
                                                                    {language.from_langauge} to {language.to_language}
                                                                </p>
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="uk-width-auto">
                                                        <p><b>Oral Translation</b></p>
                                                        {
                                                            onboard.languages.map((language, b) => ( language.oral ?
                                                                <p key={onboard.first_name+onboard.last_name+language.from_langauge+language.to_language+" oral translation "+i+" "+b}>
                                                                    {language.from_langauge} to {language.to_language}
                                                                </p> : ""
                                                            ))
                                                        }
                                                    </div>
                                                    <div className="uk-width-auto">
                                                        <p>
                                                            <b>Sources</b>
                                                        </p>
                                                        {
                                                            onboard.found_us.map((sources, p) => 
                                                            <p key={onboard.first_name+onboard.last_name+sources+ " sources " +i+ " "+p}>
                                                                {sources}
                                                            </p>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                {
                                                    onboard.languages.map((language, b) => (<React.Fragment key={onboard.first_name+onboard.last_name+ " language_test " +i+ " "+b}>
                                                        <p><b>{language.from_langauge} to {language.to_language}</b></p>
                                                        <div uk-grid="">
                                                            <div className="uk-width-1-2">
                                                                <p>Original Text</p>
                                                                <p>
                                                                    {TranslationTest[language.from_langauge]}
                                                                </p>
                                                            </div>
                                                            <div className="uk-width-1-2">
                                                                <p>answer:{new Date(language.test_time * 1000).toISOString().substr(11, 8)}</p>
                                                                <p>
                                                                    {language.translation_test}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                    ))
                                                }
                                                <div className="uk-clearfix">
                                                    <div className="uk-float-left">
                                            
                                                    </div>
                                                    <div className="uk-float-right">
                                                        <button className="uk-button uk-button-danger" style={{marginRight: '5px'}}>Reject</button>
                                                        <button className="uk-button uk-button-primary">Approve</button>
                                                    </div>
                                                </div>
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