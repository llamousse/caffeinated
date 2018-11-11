import * as React from 'react';
// import { BrowserRouter, Route, Router, Link } from 'react-router-dom';
import { Route, Router } from 'react-router-dom';

import Home from './components/Home';
import AppAuth from './components/AppAuth';

import Auth from './Auth';
import history from './history';

export const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

const Routing = () => (
  <Router history={history} component={AppAuth}>
     <div>
       {/* <Route path="/login" render={(props) => <AppAuth auth={auth} {...props} />} /> */}
       {/* <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} /> */}
       {/* <Route exact path="/" component={Home} />  */}
      <Route path="/" render={(props) => {
         handleAuthentication(props);
         return <Home auth={auth} {...props} />
       }} />
     </div>
   </Router>

 // <BrowserRouter>
 //   <div>
 //    <Route exact path="/" component={Home} />
 //    {/* <Route path="/signup" component={Signup} /> */}
 //    {/* <Route path="/login" component={Login} /> */}
 //   </div>
 // </BrowserRouter>

);

export default Routing;
