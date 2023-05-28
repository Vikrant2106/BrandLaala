import React, {useEffect} from 'react';
import App from './../app.jsx';
import { Navigate } from 'react-router-dom';
import Dashboard from './../pages/dashboard/dashboard.js';
import Buyers from './../pages/buyers/buyers.js';
import Inquiry from './../pages/inqury/inqury.js';
import PagesLogin from './../pages/pages/login.js';
import PagesRegister from './../pages/pages/register.js';
import LogDetails from '../pages/logdetails/logdetails.js';
import TailorForm from '../pages/buyers/tailorForm.js';
import AuthProtector from '../components/Protector/AuthProtector.js';
import LogoutAuthProtector from '../components/Protector/LogoutAuthProtector.js';
import Settings from '../pages/settings/settings.js';




// const AppRoute = [
//   {
//     path: '*', 
//     element: <App />,
//     children: [

// 		{ path: 'pages/*', 
//     		children: [
// 					{ path: 'login', element: <PagesLogin /> },
// 					{ path: 'register', element: <PagesRegister /> },
// 				]
// 			},
// 		]
//   }
// ];

const AppRoute =([
    {
      path: "/dashboard",
      element: 
	  <AuthProtector>
        <App/>
		</AuthProtector>
      ,
      children: [
    	{ path: '', element: <Dashboard /> },
    	{ path: 'buyers', element: <Buyers /> },
    	{ path: 'printform', element: <TailorForm /> },
    	{ path: 'inquiry', element: <Inquiry /> },
    	{ path: 'settings', element: <Settings /> },
      ],
    },
    {
      path: "/",
      element:
	 <LogoutAuthProtector> 
	  <App />
	  </LogoutAuthProtector>
	  ,
      children: [
		{ path: "", element: <PagesLogin /> },
        { path: "login", element: <PagesLogin /> },
        { path: "register", element: <PagesRegister /> },
        { path: "/", element: <Navigate to="/login" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);


export default AppRoute;
