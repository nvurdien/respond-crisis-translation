import React from "react";
import "./Cases.css";
import formatDate from "../../assets/helpers/formatDate";

import lang_short from "../../assets/lists/langShort";
import Sidebar from "../../components/Sidebar/Sidebar";
import { db } from "../../firebase";

export default class Cases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: null,
      cases: [],
    };
  }

  componentDidMount() {
    db.collection("cases")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        this.setState({ cases: data });
      });
  }

  render() {
    const { cases } = this.state;
    return (
      <>
        <Sidebar
          active="cases"
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
                {cases.map((onboard, i) => (
                  <React.Fragment
                    key={onboard.first_name + onboard.last_name + " " + i}
                  >
                    <tr
                      onClick={() => {
                        this.setState({
                          show: this.state.show === i ? null : i,
                        });
                      }}
                      style={
                        this.state.show === i
                          ? {
                              borderLeft: "1px solid #e0e0e0",
                              borderRight: "1px solid #e0e0e0",
                              cursor: "pointer",
                            }
                          : { cursor: "pointer" }
                      }
                    >
                      <td>
                        <span className="uk-label">
                          {lang_short[onboard.fromLanguage]} &#9658;{" "}
                          {lang_short[onboard.toLanguage]}
                        </span>
                      </td>
                      <td>
                        {onboard.first_name} {onboard.last_name}
                      </td>
                      <td>{onboard.source}</td>
                      <td>{onboard.case_number}</td>
                      <td>{formatDate(onboard.due_date)}</td>
                      <td>{onboard.status}</td>
                      <td>{onboard.project_manager}</td>
                      <td>
                        {onboard.translator.first_name}{" "}
                        {onboard.translator.last_name}
                      </td>
                    </tr>
                    <tr
                      style={{
                        display: this.state.show === i ? "" : "none",
                        borderTop: "none",
                        borderLeft: "1px solid #e0e0e0",
                        borderRight: "1px solid #e0e0e0",
                        borderBottom: "1px solid #e0e0e0",
                      }}
                    >
                      <td></td>
                      <td colSpan={7}>
                        <div uk-grid="">
                          <div className="uk-width-auto">
                            <p>
                              <b>Contact</b>
                            </p>
                            <p>{onboard.email}</p>
                          </div>
                          <div className="uk-width-auto">
                            <p>
                              <b>Contact at organization</b>
                            </p>
                            <p>{onboard.contact}</p>
                          </div>
                        </div>
                        <hr />
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
                            {onboard.documents.map((document, p) => (
                              <tr
                                key={`${document.name} ${p} ${document.file_type}`}
                              >
                                <td>{document.name}</td>
                                <td>{document.file_type}</td>
                                <td>
                                  <a
                                    href={document.file_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    C
                                  </a>
                                </td>
                                <td>
                                  <a
                                    href={document.translated_document_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    C
                                  </a>
                                </td>
                                <td>
                                  <a
                                    href={document.certificate_upload}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    C
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <hr />
                        <p>
                          <b>Notes</b>
                        </p>
                        {onboard.note}
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
