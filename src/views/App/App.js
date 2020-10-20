import React, {Suspense, Component, lazy} from 'react';
import {createBrowserHistory} from 'history';
import {Route, Router, Switch} from 'react-router-dom';

import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min';
import 'uikit/dist/js/uikit-icons.min';

import './App.css';
// import UIkit from 'uikit';

const Home = lazy(() => import('../Home/Home'));
const Application = lazy(() => import('../Application/Application'));
const CasePage = lazy(() => import('../CasePage/CasePage'));
const Cases = lazy(() => import('../Cases/Cases'));
const Translators = lazy(() => import('../Translators/Translators'));
const Statistics = lazy(() => import('../Statistics/Statistics'));
const Onboarding = lazy(() => import('../Onboarding/Onboarding'));
const Settings = lazy(() => import('../Settings/Settings'));

const history = createBrowserHistory();

// let main_url = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5001/navie-vurdien/a/helloWorld' : 'https://us-central1-navie-vurdien.cloudfunctions.net/helloWorld'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      admin: true,
      first_name: 'Jane',
      last_name: 'Doe'
    }
  }

  fetchData = (url, config) => fetch(url, config)
  .then((response) => {
      if(response.status >= 200 && response.status < 300) {
        return response.json();
      }
      console.log(response.status)
      return Promise.reject();
  })
  

  render() {
    return (
      <Router history={history}>
        <Suspense fallback={<div></div>}>
          <Switch>
            {
              this.state.admin ?
              <Route exact path="/" render={(props) => <Cases {...props} user_type={this.state.admin} first_name={this.state.first_name} last_name={this.state.last_name} />}/> :
              <Route exact path="/" render={(props) => <Home {...props} user_type={this.state.admin} first_name={this.state.first_name} last_name={this.state.last_name} />}/>
            }
            <Route exact path="/application" render={(props) => <Application {...props} user_type={this.state.admin} first_name={this.state.first_name} last_name={this.state.last_name} />}/>
            <Route exact path="/onboarding" render={(props) => <Onboarding {...props} user_type={this.state.admin} first_name={this.state.first_name} last_name={this.state.last_name} />}/>
            <Route exact path="/settings" render={(props) => <Settings {...props} user_type={this.state.admin} first_name={this.state.first_name} last_name={this.state.last_name} />}/>
            <Route exact path="/statistics" render={(props) => <Statistics {...props} user_type={this.state.admin} first_name={this.state.first_name} last_name={this.state.last_name} />}/>
            <Route exact path="/translator" render={(props) => <Translators {...props} user_type={this.state.admin} first_name={this.state.first_name} last_name={this.state.last_name} />}/>
            <Route exact path="/case" render={(props) => <Cases {...props} user_type={this.state.admin} first_name={this.state.first_name} last_name={this.state.last_name} />}/>
            <Route exact path="/case/:case_id" render={(props) => <CasePage {...props} user_type={this.state.admin} first_name={this.state.first_name} last_name={this.state.last_name} />}/>
            {
              this.state.admin ? <Route exact path="/mycases" render={(props) => <Home {...props} user_type={this.state.admin} first_name={this.state.first_name} last_name={this.state.last_name} />}/> : ""
            }
          </Switch>
        </Suspense>
      </Router>
    )
  }
}

export default App;
