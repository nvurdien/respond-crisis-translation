import React from 'react';
import './Translators.css';
import translator from '../../assets/lists/translators';
import formatDate from '../../assets/helpers/formatDate';

import lang_short from '../../assets/lists/langShort';
import Sidebar from '../../components/Sidebar/Sidebar';


export default class Translators extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: null
        }
    }


    render() {
        return(
        <>
            <Sidebar active="translators" user_type={this.props.user_type ? "admin" : "all"}/>
            <div className="tm-main uk-section uk-section-default">
                    <div className="uk-container uk-position-relative uk-margin-remove" style={{paddingLeft: '10px', paddingRight: '10px', marginRight: '0px'}}>
                    <table className="uk-table uk-table-divider">
                        <thead>
                            <tr>
                                <th>Translator Name (task in progress)</th>
                                <th>Language(s)</th>
                                <th>Date Joined</th>
                                <th>Last Login</th>
                                <th>Completed/Total</th>
                                <th>Specialty</th>
                                <th>Notes</th>
                                <th>Assign Task</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                translator.map((onboard, i) => (
                                    <React.Fragment key={onboard.first_name+onboard.last_name+" "+i}>
                                        <tr onClick={() => {this.setState({show: this.state.show === i ? null : i})}}>
                                            <td>
                                                    {onboard.first_name} {onboard.last_name} (3)
                                            </td>
                                            <td>
                                                {
                                                    onboard.languages.map((language, y) => (
                                                        <span className="uk-label" key={onboard.first_name+onboard.last_name+language.from_langauge+language.to_langauge+" language(s) "+i+" "+y}>{lang_short[language.from_langauge]} - {lang_short[language.to_language]}</span>
                                                    ))
                                                }
                                            </td>
                                            <td>
                                                    {formatDate(onboard.date_accepted)}
                                            </td>
                                            <td>
                                                    {formatDate(onboard.date_accepted)}
                                            </td>
                                            <td>
                                                4/5
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
                                                {onboard.notes}
                                            </td>
                                            <td>
                                            <button className="uk-button uk-button-primary">Assign</button>
                                            </td>
                                        </tr>
                                        <tr style={{display: this.state.show === i ? "" : "none"}}>
                                            <td colSpan={8}>
                                                
                                                <div uk-grid="">
                                                    <div className="uk-width-auto">
                                                        <p>
                                                            <b>Email</b>
                                                        </p>
                                                        <p>
                                                            {onboard.email}
                                                        </p>
                                                    </div>
                                                    <div className="uk-width-auto">
                                                        
                                                        <p>
                                                            <b>Language Supports</b>
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
                                                    <div className="uk-width-auto">
                                                        {onboard.notes}
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