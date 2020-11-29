import React from "react";
import "./Translators.css";
import formatDate from "../../assets/helpers/formatDate";

import lang_short from "../../assets/lists/langShort";
import cases from "../../assets/lists/Cases";
import Sidebar from "../../components/Sidebar/Sidebar";
import AssignTask from "../../components/AssignTask/AssignTask";
import * as TranslatorService from "../../services/TranslatorService";

export default class Translators extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null,
      translators: [],
    };
  }

  componentDidMount() {
    TranslatorService.getTranslators()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        this.setState({ translators: data });
      });
  }

  render() {
    const { translators } = this.state;
    return (
      <>
        <Sidebar
          active="translators"
          user_type={this.props.user_type ? "admin" : "all"}
          first_name={this.props.first_name}
          last_name={this.props.last_name}
        />
        <div className="tm-main uk-section uk-section-default">
          <div
            className="uk-container uk-position-relative uk-margin-remove"
            style={{
              paddingLeft: "10px",
              paddingRight: "10px",
              marginRight: "0px",
            }}
          >
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
                {translators.map((onboard, i) => (
                  <React.Fragment
                    key={onboard.first_name + onboard.last_name + " " + i}
                  >
                    <tr style={{ cursor: "pointer" }}>
                      <td
                        onClick={() => {
                          this.setState({
                            show: this.state.show === i ? null : i,
                          });
                        }}
                      >
                        {onboard.first_name} {onboard.last_name} (3)
                      </td>
                      <td
                        onClick={() => {
                          this.setState({
                            show: this.state.show === i ? null : i,
                          });
                        }}
                      >
                        {onboard.languages.map((language, y) => (
                          <span
                            className="uk-label"
                            key={
                              onboard.first_name +
                              onboard.last_name +
                              language.from_langauge +
                              language.to_langauge +
                              " language(s) " +
                              i +
                              " " +
                              y
                            }
                          >
                            {lang_short[language.from_langauge]} &#9658;{" "}
                            {lang_short[language.to_language]}
                          </span>
                        ))}
                      </td>
                      <td
                        onClick={() => {
                          this.setState({
                            show: this.state.show === i ? null : i,
                          });
                        }}
                      >
                        {formatDate(onboard.date_accepted)}
                      </td>
                      <td
                        onClick={() => {
                          this.setState({
                            show: this.state.show === i ? null : i,
                          });
                        }}
                      >
                        {formatDate(onboard.date_accepted)}
                      </td>
                      <td
                        onClick={() => {
                          this.setState({
                            show: this.state.show === i ? null : i,
                          });
                        }}
                      >
                        4/5
                      </td>
                      <td
                        onClick={() => {
                          this.setState({
                            show: this.state.show === i ? null : i,
                          });
                        }}
                      >
                        {onboard.specialities.map((special, z) => (
                          <span
                            key={
                              onboard.first_name +
                              onboard.last_name +
                              special +
                              " " +
                              i +
                              " " +
                              z
                            }
                          >
                            {special},
                          </span>
                        ))}
                      </td>
                      <td
                        onClick={() => {
                          this.setState({
                            show: this.state.show === i ? null : i,
                          });
                        }}
                      >
                        {onboard.notes}
                      </td>
                      <td>
                        <AssignTask
                          first_name={onboard.first_name}
                          last_name={onboard.last_name}
                          task_in_progress={5}
                          languages={onboard.languages}
                          tasks={cases}
                        />
                      </td>
                    </tr>
                    <tr
                      style={{
                        display: this.state.show === i ? "" : "none",
                        borderTop: "none",
                      }}
                    >
                      <td colSpan={8}>
                        <div uk-grid="">
                          <div className="uk-width-auto">
                            <p>
                              <b>Email</b>
                            </p>
                            <p>{onboard.email}</p>
                          </div>
                          <div className="uk-width-auto">
                            <p>
                              <b>Language Supports</b>
                            </p>
                            {onboard.languages.map((language, b) => (
                              <p
                                key={
                                  onboard.first_name +
                                  onboard.last_name +
                                  language.from_langauge +
                                  language.to_language +
                                  " language_support " +
                                  i +
                                  " " +
                                  b
                                }
                              >
                                {language.from_langauge} to{" "}
                                {language.to_language}
                              </p>
                            ))}
                          </div>
                          <div className="uk-width-auto">
                            <p>
                              <b>Oral Translation</b>
                            </p>
                            {onboard.languages.map((language, b) =>
                              language.oral ? (
                                <p
                                  key={
                                    onboard.first_name +
                                    onboard.last_name +
                                    language.from_langauge +
                                    language.to_language +
                                    " oral translation " +
                                    i +
                                    " " +
                                    b
                                  }
                                >
                                  {language.from_langauge} to{" "}
                                  {language.to_language}
                                </p>
                              ) : (
                                ""
                              )
                            )}
                          </div>
                          <div className="uk-width-auto">
                            <p>
                              <b>Sources</b>
                            </p>
                            {onboard.found_us.map((sources, p) => (
                              <p
                                key={
                                  onboard.first_name +
                                  onboard.last_name +
                                  sources +
                                  " sources " +
                                  i +
                                  " " +
                                  p
                                }
                              >
                                {sources}
                              </p>
                            ))}
                          </div>
                          <div className="uk-width-auto">{onboard.notes}</div>
                        </div>
                        <div className="uk-clearfix">
                          <div className="uk-float-left">
                            <button className="uk-button uk-button-danger">
                              Deactivate
                            </button>
                          </div>
                          <div className="uk-float-right">
                            <button
                              className="uk-button uk-button-primary"
                              style={{ marginRight: "5px" }}
                            >
                              Records
                            </button>
                            <button className="uk-button uk-button-primary">
                              Edit
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}
