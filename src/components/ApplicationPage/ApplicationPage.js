import React, {useState} from 'react';
import './ApplicationPage.css'
import ContactForm from '../ContactForm/ContactForm';

export default ({currentProgress, translationDone, languagesDone, onChange, advance, previous, answers, Organizations, Languages}) => {
    const [lang, setLang] = useState([])
    const [toLang, setToLang] = useState([])
    const [fromLang, setFromLang] = useState([])
    const [otherField, setOtherField] = useState(false)
    switch(currentProgress) {
        case 0:
            return (
                <div>
                    <h1 className="uk-text-lead">
                        If you are a multilingual person, translator, or interpreter eager to use your language skills to be of service to migrants and refugees, please join our Team.
                    </h1>
                    <h1 className="uk-text-lead">
                        We are so glad that you are willing to spend your valuable time with us help translating.
                    </h1>
                    <span className="uk-text-normal">
                        Note: The majority of translation tasks are remote, so you can help in any country or timezone.
                    </span>
                    <button className="uk-button uk-button-primary uk-button-small" onClick={advance}>Next</button>
                </div>
                )
        case 1:
            return (
                <div className="uk-margin-medium-right">
                    <ContactForm previous={previous} advance={advance} answers={answers} onChange={onChange}/>
                </div>
            )
        case 2:
            return (
                <div>
                    {/* eslint-disable */}
                    <ul style={{display: 'none'}} className="uk-subnav uk-subnav-pill" uk-switcher="animation: uk-animation-fade">
                        <li><a href="#">support</a></li>
                        <li><a href="#">learn about us</a></li>
                        <li><a href="#">languages</a></li>
                        <li><a href="#">confidence</a></li>
                        {lang.map((l, index) => (
                            <li key={l + index + 'wow'}><a href="#">{l} exp</a></li>
                        ))}
                        {lang.map((l, index) => (
                            <li key={l + index + 'oralllwow'}><a href="#">{l} oral</a></li>
                        ))}
                        <li><a href="#">prep</a></li>
                    </ul>

                    <ul className="uk-switcher uk-margin">
                        <li>
                            <div className="uk-width-1-1">
                                <label className="uk-form-label" >Do you have any confidant/therapist/support system in place for when facing difficult emotional situations?</label>
                                <div className="uk-margin">
                                    <label><input className="uk-radio" type="radio" name="support" value={true} onChange={() => {
                                        let editAnswer = answers
                                        editAnswer['support'] = true
                                        onChange({answers: editAnswer})
                                    }}/> Yes</label>
                                </div>
                                <div className="uk-margin">
                                    <label><input className="uk-radio" type="radio" name="support" value={false} onChange={() => {
                                        let editAnswer = answers
                                        editAnswer['support'] = false
                                        onChange({answers: editAnswer})
                                    }}/> No</label>
                                </div>
                            </div>
                            <button className="uk-button uk-button-primary uk-button-small" onClick={previous}>Back</button>
                            <button className="uk-button uk-button-primary uk-button-small" uk-switcher-item="next" disabled={answers['support'] !== undefined ? false : true}>Next</button>
                        </li>
                        <li>
                        <div className="uk-width-1-1">
                            <label className="uk-form-label" >How did you hear about us?</label>
                            {
                                Organizations.map((org, index) => (
                                    <div className="uk-margin">
                                        <label key={'org ' + index}><input className="uk-radio" type="radio" name="find_us" onChange={() => {
                                            let editAnswer = answers
                                            editAnswer['find_us'] = org
                                            onChange({answers: editAnswer})
                                            setOtherField(false)
                                        }}/> {org}</label>
                                    </div>
                                ))
                            }
                            <div className="uk-margin">
                                <label className="uk-form-label"><input className="uk-radio" type="radio" name="find_us" onChange={() => {
                                    setOtherField(!otherField)
                                    let editAnswer = answers
                                    editAnswer['find_us'] = undefined
                                    onChange({answers: editAnswer})
                                }} /> { otherField ? 
                                    
                                    <input className="uk-input uk-form-width-medium" placeholder="Other" name="find_us" onChange={(value) => {
                                        let editAnswer = answers
        
                                        editAnswer['find_us'] = value.target.value ? value.target.value : undefined
                                        onChange({answers: editAnswer})
                                    }}/>
                                    :
                                    'Other'
                                }
                                </label>
                            </div>
                            </div>
                            <button className="uk-button uk-button-primary uk-button-small" uk-switcher-item="previous">Back</button>
                            <button className="uk-button uk-button-primary uk-button-small" uk-switcher-item="next" disabled={answers['find_us'] !== undefined ? false : true}>Next</button>
                        </li>
                        <li>
                            <label className="uk-form-label">Which language(s) are you able to translate?</label>
                            <div className="uk-margin" uk-grid="">
                                {
                                    Object.keys(Languages).map((language, index) => (
                                        <div key={'language ' + index} className="uk-width-1-3@m uk-width-1-2@s">
                                            <div className={`uk-card uk-card-body ${ Languages[language]['checked'] ? "uk-card-primary" : "uk-card-default" }`} onClick={
                                                () => {
                                                    let temp = Languages
                                                    temp[language]['checked'] = !temp[language]['checked']
                                                    if(temp[language]['checked']) {
                                                        let leng = lang
                                                        leng.push(language);
                                                        setLang(leng);
                                                    }
                                                    else {
                                                        let langIndex = lang.indexOf(language)
                                                        let leng = lang.splice(langIndex, 1);
                                                        setLang(leng);
                                                    }
                                                    console.log(lang)
                                                    onChange({languages: temp})
                                                }
                                            }> {language}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="uk-width-1-1">
                                <label className="uk-form-label" htmlFor="addtional_languages">If you can provide support for languages not listed above, please list it below:</label>
                                <textarea alt="addtional_languages" className="uk-textarea" id="addtional_languages" required="" label="" name="addtional_languages" placeholder="type your answer here" rows="5" title="addtional_languages"/>
                            </div>

                            <button className="uk-button uk-button-primary uk-button-small" uk-switcher-item="previous">Back</button>
                            <button className="uk-button uk-button-primary uk-button-small" uk-switcher-item="next" disabled={lang.length > 0 ? false : true}>Next</button>
                        </li>
                        <li>
                            <label className="uk-form-label">For the langauges you have selected, which tasks here are you confident translating?</label> 
                            <div className="uk-margin" uk-grid="">
                                {
                                    lang.map((language, index) => (
                                            <div key={'languageto ' + index} className="uk-width-1-3@m uk-width-1-2@s">
                                                <div className={`uk-card uk-card-body ${ Languages[language]['toEnglish'] ? "uk-card-primary" : "uk-card-default" }`} onClick={
                                                    () => {
                                                        let temp = Languages
                                                        temp[language]['toEnglish'] = !temp[language]['toEnglish']
                                                        if(temp[language]['toEnglish']) {
                                                            let leng = toLang
                                                            leng.push(language);
                                                            setToLang(leng);
                                                        }
                                                        else {
                                                            let langIndex = toLang.indexOf(language)
                                                            let leng = toLang.splice(langIndex, 1);
                                                            setToLang(leng);
                                                        }
                                                        console.log(toLang)
                                                        onChange({languages: temp})
                                                    }
                                                }>
                                                    {language} to English
                                                </div>
                                            </div>
                                    ))
                                    }
                                    {
                                    lang.map((language, index) => (
                                            <div key={'languagefrom ' + index} className="uk-width-1-3@m uk-width-1-2@s">
                                                <div className={`uk-card uk-card-body ${ Languages[language]['fromEnglish'] ? "uk-card-primary" : "uk-card-default" }`} onClick={
                                                    () => {
                                                        let temp = Languages
                                                        temp[language]['fromEnglish'] = !temp[language]['fromEnglish']
                                                        if(temp[language]['fromEnglish']) {
                                                            let leng = fromLang
                                                            leng.push(language);
                                                            setFromLang(leng);
                                                        }
                                                        else {
                                                            let langIndex = fromLang.indexOf(language)
                                                            let leng = fromLang.splice(langIndex, 1);
                                                            setFromLang(leng);
                                                        }
                                                        console.log(fromLang)
                                                        onChange({languages: temp})
                                                    }
                                                }>
                                                    English to {language}
                                                </div>
                                            </div>
                                    ))
                                }
                            </div>
                            <button className="uk-button uk-button-primary uk-button-small" uk-switcher-item="previous">Back</button>
                            <button className="uk-button uk-button-primary uk-button-small" uk-switcher-item="next" disabled={toLang.length > 0 || fromLang.length > 0 ? false : true}>Next</button>
                        </li>
                            {
                                lang.map((l, index) => (
                                    <li key={l + ' experience'}>
                                        <label className="uk-form-label">For {l}, have you had experience in any of the following? (click all that apply)</label> 
                                        <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                            {Object.keys(Languages[l]['experience']).map((ex, index) => (
                                                <label key={l + ' experience ' + 'option ' + index}>
                                                    <input 
                                                    className="uk-checkbox" 
                                                    type="checkbox" 
                                                    checked={Languages[l]['experience'][ex]['checked']}
                                                    onClick={()=> {
                                                        let temp = Languages
                                                        temp[l]['experience'][ex]['checked'] = !temp[l]['experience'][ex]['checked']
                                                        onChange({languages: temp})
                                                    }}
                                                    readOnly
                                                    /> {ex}
                                                </label>
                                            ))}
                                        </div>
                                        <button className="uk-button uk-button-primary uk-button-small" uk-switcher-item="previous">Back</button>
                                        <button className="uk-button uk-button-primary uk-button-small" uk-switcher-item="next">Next</button>
                                    </li>
                                ))
                            }
                        {
                            lang.map((l, index) => (
                                <li key={l + ' oral'}>
                                    <div className="uk-width-1-1">
                                        <label className="uk-form-label" >For {l}, besides translating documents, would you be willing to provide oral translation?</label>
                                        <label className="uk-width-1-1"><input className="uk-radio" type="radio" name="support" value={true} onChange={() => {
                                            let temp = Languages
                                            temp[l]['oral'] = true
                                            onChange({languages: temp})
                                        }}/> Yes</label>
                                        <label className="uk-width-1-1"><input className="uk-radio" type="radio" name="support" value={false} onChange={() => {
                                            let temp = Languages
                                            temp[l]['oral'] = false
                                            onChange({languages: temp})
                                        }}/> No</label>
                                    </div>
                                    <button className="uk-button uk-button-primary uk-button-small" onClick={previous}>Back</button>
                                    <button className="uk-button uk-button-primary uk-button-small" uk-switcher-item="next" disabled={Languages[l]['oral'] !== undefined ? false : true}>Next</button>
                                </li>
                            ))
                        }
                        <li>
                            <h1 className="uk-text-lead">
                            Next, we would like to assess your translation skills. We will ask you to translate a few simple messages.
                            </h1>
                                
                            <button className="uk-button uk-button-primary uk-button-small" onClick={previous}>Back</button>
                            <button className="uk-button uk-button-primary uk-button-small" onClick={advance}>Next</button>
                        </li>
                    </ul>
                </div>
            )
        case 3: 
            return (
                <div>
                    <ul style={{display: 'none'}} className="uk-subnav uk-subnav-pill" uk-switcher="animation: uk-animation-fade">
                        
                        {Object.keys(Languages).map((l, index) => ( Languages[l]['checked'] && Languages[l]['toEnglish'] ? 
                            <li key={l + index + 'totranslating'}><a href="#">{l} translate</a></li> : ""
                        ))}
                        {Object.keys(Languages).map((l, index) => ( Languages[l]['checked'] && Languages[l]['fromEnglish'] ? 
                            <li key={l + index + 'fromtranslating'}><a href="#">{l} translate</a></li> : ""
                        ))}
                        <li><a href="#">done</a></li>
                    </ul>
                    <ul className="uk-switcher uk-margin">
                        {Object.keys(Languages).map((l, index) => ( Languages[l]['checked'] && Languages[l]['toEnglish'] ? 
                            <li key={l + 'translationpart'}>
                                <label className="uk-form-label" >Please translate the following {l} message into English</label>
                                ...
                                <div className="uk-width-1-1">
                                    <label className="uk-form-label" htmlFor="translation">Your answer:</label>
                                    <textarea alt="translation" className="uk-textarea" id="translation" required="" label="" name="translation" placeholder="type your answer here" rows="5" title="translation"/>
                                </div>
                                <button className="uk-button uk-button-primary uk-button-small" uk-switcher-item="next">Next</button>
                            </li>
                            : ""
                        ))}
                        {Object.keys(Languages).map((l, index) => ( Languages[l]['checked'] && Languages[l]['fromEnglish'] ? 
                            <li key={l + 'translationpart'}>
                                <label className="uk-form-label" >Please translate the following English message into {l}</label>
                                ...
                                <div className="uk-width-1-1">
                                    <label className="uk-form-label" htmlFor="translation">Your answer:</label>
                                    <textarea alt="translation" className="uk-textarea" id="translation" required="" label="" name="translation" placeholder="type your answer here" rows="5" title="translation"/>
                                </div>
                                <button className="uk-button uk-button-primary uk-button-small" uk-switcher-item="next">Next</button>
                            </li>
                            : ""
                        ))}
                        <li>
                            <h1 className="uk-text-lead">
                                You have completed all translations! Would you like to submit?
                            </h1>
                            <button className="uk-button uk-button-primary uk-button-small" onClick={() => {
                                advance();
                                advance();
                            }}>Submit</button>
                        </li>
                    </ul>
                    {/* eslint-enable */}
                </div>
            )
        case 4:
            return (
                <div>
                    <h1 className="uk-text-lead">
                        You're all set for now!
                    </h1>
                    <h1 className="uk-text-lead">
                        We will review your application and contact you shortly through email.
                    </h1>
                    <h1 className="uk-text-lead">
                        Thank you again for your interest and effort!
                    </h1>
                    <span className="uk-text-normal">
                        In the meantime, if you have any questions regarding the network and our work, feel free to contact us at <a href="mailto:respond@crisistranslators.net" target="_blank" rel="noopener noreferrer">respond@crisistranslators.net</a>
                    </span>
                    <span className="uk-text-normal">
                        If you would like to learn more about what we do visit our website <a href="www.respondcrisistranslation.org" target="_blank" rel="noopener noreferrer">www.respondcrisistranslation.org</a>
                    </span>
                </div>
            )
        default:
            return (
            <div>
                error
            </div>
        )
    }
}