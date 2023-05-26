import React from 'react';
import App from './../app.jsx';
import { Navigate } from 'react-router-dom';
import Dashboard from './../pages/dashboard/dashboard.js';
import Buyers from './../pages/buyers/buyers.js';
import Inquiry from './../pages/inqury/inqury.js';
import PagesLogin from './../pages/pages/login.js';
import PagesRegister from './../pages/pages/register.js';
import LogDetails from '../pages/logdetails/logdetails.js';
import TailorForm from '../pages/buyers/tailorForm.js';

const AppRoute = [
  {
    path: '*', 
    element: <App />,
    children: [
    	{ path: '', element: <Navigate to='/dashboard' /> },
    	{ path: 'dashboard', element: <Dashboard /> },
    	{ path: 'buyers', element: <Buyers /> },
    	{ path: 'printform', element: <TailorForm /> },
    	{ path: 'inquiry', element: <Inquiry /> },
		{ path: 'pages/*', 
    		children: [
					{ path: 'login', element: <PagesLogin /> },
					{ path: 'register', element: <PagesRegister /> },
				]
			},
		]
  }
];


export default AppRoute;
