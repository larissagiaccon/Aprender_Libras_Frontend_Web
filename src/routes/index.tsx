import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Converse from '../pages/Converse';
import Profile from '../pages/Profile';
import ListProviders from '../pages/ListProviders';
import Dashboard from '../pages/Dashboard';
import CreateAppointment from '../pages/CreateAppointment';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/profile" component={Profile} isPrivate />
    <Route path="/converse" component={Converse} isPrivate />
    <Route path="/listProviders" component={ListProviders} isPrivate />
    <Route path="/dashboard" component={Dashboard} isPrivate />
    <Route path="/createAppointment" component={CreateAppointment} isPrivate />
  </Switch>
);

export default Routes;
