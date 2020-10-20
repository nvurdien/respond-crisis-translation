import React from 'react';

import lang_short from '../../assets/lists/langShort';
import formatDate from '../../assets/helpers/formatDate';

export default ({first_name, last_name, task_in_progress, languages, tasks}) => (
    <>
        <button className="uk-button  uk-button-primary uk-button-small uk-margin-small-right" type="button" uk-toggle="target: #modal-example">Assign</button>

        <div id="modal-example" uk-modal="">
            <div className="uk-modal-dialog">
                <button className="uk-modal-close-default" type="button" uk-close=""></button>
                <div className="uk-modal-body">
                    <h2 className="uk-modal-title">Assign Task</h2>
                    <div uk-grid="">
                        <div className="uk-width-auto">
                            <p><b>Translator</b></p>
                            <p>{first_name} {last_name} ({task_in_progress})</p>
                        </div>
                        <div className="uk-width-auto">
                            <p><b>Language(s)</b></p>
                            {
                                languages.map((language, y) => (
                                    <span className="uk-label" key={`${first_name}${last_name}${language.from_langauge}${language.to_langauge} language(s) ${y}`}>{lang_short[language.from_langauge]} &#9658; {lang_short[language.to_language]}</span>
                                ))
                            }
                        </div>
                    </div>
                    <p><b>Task Assignment</b></p>
                    <table className="uk-table uk-table-divider">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Language</th>
                                <th>Case Number</th>
                                <th>Due Date</th>
                                <th>Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tasks.map((task, z) => (
                                    <tr key={`${task.first_name} ${task.last_name} task ${task.case_number}`}>
                                        <td>{task.first_name} {task.last_name}</td>
                                        <td><span className="uk-label">{lang_short[task.fromLanguage]} &#9658; {lang_short[task.toLanguage]}</span></td>
                                        <td>{task.case_number}</td>
                                        <td>{formatDate(task.due_date)}</td>
                                        <td></td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>
                    </table>
                </div>
                <div className="uk-modal-footer uk-text-right">
                    <button className="uk-button uk-button-primary" type="button">Assign</button>
                </div>
            </div>

        </div>
    </>
)