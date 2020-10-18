import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Dashborad from '../pages/Dashboard'
import List from '../pages/List'
//Switch

const AppRoutes: React.FC = ()=>(
    <BrowserRouter>
        <Layout>
            <Route path="/" exact component={Dashborad}/>
            <Route path="/list/:type" exact component={List}/>
        </Layout>
    </BrowserRouter>

);

export default AppRoutes;