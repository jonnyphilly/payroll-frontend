import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Shifts from './components/Shifts';
import EditOrganisation from './components/EditOrganisation';

function App() {
  return (
    <Switch>
      <Route exact path='/' component={LogIn} />
      <Route path='/signup' component={SignUp} />
      <Route path='/home' component={Home} />
      <Route path='/edit' component={EditOrganisation} />
      <Route path='/shifts' component={Shifts} />
    </Switch>
  );
}

export default App;
