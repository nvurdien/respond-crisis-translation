
import React from 'react';
import './ContactForm.css'

class ContactForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static validEmail(email) { // see:
        let re;
        re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    static validateHuman(honeypot) {
        if (honeypot) {  //if hidden form filled up
            console.log("Robot Detected!");
            return true;
        } else {
            console.log("Welcome Human!");
        }
    }

    handleSubmit(event) {  // handles form submit without any jquery
        event.preventDefault();           // we are submitting via xhr below
        /* OPTION: Remove this comment to enable SPAM prevention, see README.md
        if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
          return false;
        }
        */
        let data = this.props.answers

        document.getElementById('message_status').innerHTML = '<div id="thankyou_message" className="uk-alert-success" uk-alert=""><p>Sending ...</p></div>';

        document.getElementById("email").classList.remove("uk-form-danger");
        document.getElementById("first_name").classList.remove("uk-form-danger");
        document.getElementById("last_name").classList.remove("uk-form-danger");
        document.getElementById("about").classList.remove("uk-form-danger");

        document.getElementById("email").classList.remove("uk-form-success");
        document.getElementById("first_name").classList.remove("uk-form-success");
        document.getElementById("last_name").classList.remove("uk-form-success");
        document.getElementById("about").classList.remove("uk-form-success");

        if( !data.email || !data.first_name || !data.about || !data.last_name){
            let prev = false;
            let innertext = "<div id=\"invalid\" className=\"uk-alert-danger\" uk-alert=\"\"> No";
            if(!data.email){
                innertext += ' Email';
                document.getElementById("email").classList.add("uk-form-danger");
                prev = true;
            }
            if(!data.first_name){
                if(prev) innertext += ',';
                document.getElementById("first_name").classList.add("uk-form-danger");
                innertext += ' First Name';
                prev = true;
            }
            if(!data.last_name){
                if(prev) innertext += ',';
                document.getElementById("last_name").classList.add("uk-form-danger");
                innertext += ' Last Name';
                prev = true;
            }
            if(!data.about){
                if(prev) innertext += ',';
                document.getElementById("about").classList.add("uk-form-danger");
                innertext += ' About';
            }
            // language=HTML
            innertext += ' provided </div>';
            document.getElementById("message_status").innerHTML = innertext;
        }
        else if( !ContactForm.validEmail(data.email) ) {   // if email is not valid show error
            document.getElementById('message_status').innerHTML = '<div id="invalid" className="uk-alert-danger" uk-alert="">Invalid Email</div>';
            document.getElementById("email").classList.add("uk-form-danger");
            return false;
        } else {
            document.getElementById("email").classList.remove("uk-form-success");
            document.getElementById("first_name").classList.remove("uk-form-success");
            document.getElementById("last_name").classList.remove("uk-form-success");
            document.getElementById("about").classList.remove("uk-form-success");
            document.getElementById("submit").innerText = "Submit";
            document.getElementById("submit").removeAttribute("disabled");
            this.props.advance();
        }
    }

    render() {
        return (
            <div className="uk-margin">
                <div id="message_status">

                </div>
                <h1 className="uk-text-lead">
                        Before we proceed to the next stage, we will need to know a little bit more about you and your language capabilities. Please tell us your name, contact, and a litle bit more about yourself.
                    </h1>
                <form onSubmit={this.handleSubmit} className="uk-grid-small" uk-grid="">
                        <div className="uk-width-1-2@s">
                        <label className="uk-form-label" htmlFor="first_name">First Name</label>
                            <input alt="first name" className="uk-input" id="first_name" defaultValue={this.props.answers['first_name']} onChange={(event) => {
                                let ans = this.props.answers
                                ans['first_name'] = event.target.value
                                this.props.onChange({answers: ans})
                            }} label="" required="" name="first_name" placeholder="Your First Name" title="first_name"/>
                        </div>
                        <div className="uk-width-1-2@s">
                            <label className="uk-form-label" htmlFor="last_name">Last Name</label>
                            <input alt="last name" className="uk-input" id="last_name" defaultValue={this.props.answers['last_name']} onChange={(event) => {
                                let ans = this.props.answers
                                ans['last_name'] = event.target.value
                                this.props.onChange({answers: ans})
                            }} label="" required="" name="last_name" placeholder="Your Last Name" title="last_name"/>
                        </div>
                        <div className="uk-width-1-2@s">
                            <label className="uk-form-label" htmlFor="email">Email Address</label>
                            <input alt="email" className="uk-input" id="email" defaultValue={this.props.answers['email']} onChange={(event) => {
                                let ans = this.props.answers
                                ans['email'] = event.target.value
                                this.props.onChange({answers: ans})
                            }} label="" required="" name="email" placeholder="Your Email" title="email" type="email"/>
                        </div>
                        <div className="uk-width-1-1">
                            <label className="uk-form-label" htmlFor="about">Tell us a little bit about yourself and your interest for joining our translator network:</label>
                            <textarea alt="about" className="uk-textarea" id="about" defaultValue={this.props.answers['about']} onChange={(event) => {
                                let ans = this.props.answers
                                ans['about'] = event.target.value
                                this.props.onChange({answers: ans})
                            }}  required="" label="" name="about" placeholder="type your answer here" rows="5" title="about"/>
                        </div>
                        <div className="uk-margin uk-text-center" uk-margin="">
                            <button className="uk-button uk-button-primary uk-button-small" onClick={this.props.previous}>Back</button>
                            <button type="submit" value="Submit" id="submit" className="uk-button uk-button-primary uk-button-small">Next</button>
                        </div>
                </form>
            </div>
        );
    }
}

export default ContactForm;