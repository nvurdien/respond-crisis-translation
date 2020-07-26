import React, {Suspense, Component, lazy} from 'react';
import {createBrowserHistory} from 'history';
import {Route, Router, Switch} from 'react-router-dom';

import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min';
import './App.css';
// import UIkit from 'uikit';

const Home = lazy(() => import('../Home/Home'));
const Application = lazy(() => import('../Application/Application'));
const CasePage = lazy(() => import('../CasePage/CasePage'));

const history = createBrowserHistory();

// let main_url = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:5001/navie-vurdien/a/helloWorld' : 'https://us-central1-navie-vurdien.cloudfunctions.net/helloWorld'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
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
    console.log(this.state.auth)
    return (
      <Router history={history}>
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route exact path="/" render={(props) => <Home {...props} />}/>
            <Route exact path="/application" render={(props) => <Application {...props} />}/>
            <Route exact path="/case/:case_id" render={(props) => <CasePage {...props} />}/>
          </Switch>
        </Suspense>
      </Router>
    )
  }
}

export default App;
