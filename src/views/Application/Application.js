import React from 'react';
import './Application.css';
import AppQuestions from '../../assets/lists/Application';
import ApplicationPage from '../../components/ApplicationPage/ApplicationPage'
import Organizations from '../../assets/lists/knownOrganizations';
import Languages from '../../assets/lists/supportLangauges';
import Experience from '../../assets/lists/experienceLevel';

export default class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentProgress: 0,
            translationDone: false,
            languagesDone: false,
            answers: {
                first_name: '',
                last_name: '',
                email: '',
                about: ''
            },
            languages: {

            }
        }
    }

    onChange = (values) => {
        this.setState(values)
        console.log(this.state.answers)
        console.log(this.state.languages)
    }

    componentDidMount(){
        document.getElementById('ProgressBar').children[0].classList.add("is-current");
        let listLanguages = this.state.languages
        let expi = {}
        Experience.map((exp, index) => 
            expi[exp] = {
                experience: exp,
                checked: false
            
        })
        Languages.map((language, index) => 
            listLanguages[language] = {
                checked: false,
                toEnglish: false,
                fromEnglish: false,
                toTranslation: '',
                fromTranslation: '',
                oral: undefined,
                language: language,
                experience: JSON.parse(JSON.stringify(expi))
            
        })
        this.setState({languages: listLanguages})
    }

    prevRecur = (time) => {
        let moveBack = this.state.currentProgress - time
        while(moveBack > 0) {
            this.previous();
            moveBack--;
        }
    }

    advance = () => {
        let bar = document.getElementById('ProgressBar')
        let current_child = bar.querySelector(".is-current")
        
        if(current_child) {
            let current_id = parseInt(bar.querySelector(".is-current").id, 10)
            current_child.classList.add('is-complete')
            current_child.classList.remove('is-current')
            if(current_id+1 < bar.children.length){
                bar.children[current_id+1].classList.add("is-current")
                this.setState({currentProgress: current_id+1})
            }
        } else { 
            bar.children[0].classList.add("is-current");
            this.setState({currentProgress: 0})
        }
    }

    previous = () => {
        let bar = document.getElementById('ProgressBar')
        let current_child = bar.querySelector(".is-current")
        if(current_child && current_child.children.length > 0) {
            let current_id = parseInt(bar.querySelector(".is-current").id, 10)
            if(current_id-1 > -1) {
                bar.children[current_id-1].classList.remove('is-complete')
                bar.children[current_id].classList.remove('is-current')
                bar.children[current_id-1].classList.add("is-current")
                this.setState({currentProgress: current_id-1})
            }
        } else {
            let child = bar.querySelectorAll(".is-complete")
            if(child && child.length > 0) {
                child[this.state.currentProgress].classList.add('is-current')
                child[this.state.currentProgress].classList.remove('is-complete')
                this.setState({currentProgress: this.state.currentProgress-1})
            }
        }
    }

    render() {
        return (
            <div className="uk-background-primary">
                <div className="uk-margin-large-left">
                        <ol id="ProgressBar">
                        {
                            AppQuestions.map((question, index) => 
                                <li 
                                    key={index} 
                                    id={index} 
                                    className="ProgressBar-step" 
                                    style={question.allowRetry ? {cursor: 'pointer'} : {}} 
                                    onClick={question.allowRetry ? () => this.prevRecur(index) : () => {}}
                                >
                                    <svg className="ProgressBar-icon">
                                        <use xlinkHref="#checkmark-bold"/>
                                    </svg>
                                    <span className="ProgressBar-stepLabel">{question.header}</span>
                                </li>
                            )
                        }
                        </ol>
                        <div className="uk-container">
                        <ApplicationPage
                            currentProgress={this.state.currentProgress}
                            translationDone={this.state.translationDone}
                            languagesDone={this.state.languagesDone}
                            onChange={this.onChange}
                            advance={this.advance}
                            previous={this.previous}
                            answers={this.state.answers}
                            Organizations={Organizations}
                            Languages={this.state.languages}
                        />
                        </div>
                        
                        <p>
                            <button id="previous" onClick={this.previous}>Previous</button>
                            <button id="advance" onClick={this.advance}>Advance</button>
                        </p>
                        <svg xmlns="http://www.w3.org/2000/svg">
                            <symbol id="checkmark-bold" viewBox="0 0 24 24">
                                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
                            </symbol>
                        </svg>
                        </div>
            </div>  
        )
    }
}