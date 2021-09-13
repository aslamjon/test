import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import 'antd/dist/antd.css';

import { currentUser } from './redux/auth/auth.selector';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

class App extends Component {
  render() {
    const {currentUser} = this.props;
    return (
      <div>
          <Switch>
            <Route exact path='/' render={() => currentUser.token ? <Home token={currentUser.token}/> : <SignIn />}/>
            <Route  path='/signup' component={SignUp} />
            <Route  path='/signin' render={() => currentUser.token ? <Redirect to="/" /> : <SignIn />} />
          </Switch>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser
})
export default connect(mapStateToProps, null)(App);
