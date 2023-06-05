import React, { useEffect, useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppSettings } from './../../config/app-settings.js';
import Element from '../../components/Form/Element.js';
import { inputType } from '../../components/utils/enum.js';
import { useFormik } from "formik";
import { successToast } from '../../components/toast/toast.js';
import { signInValidationSchema } from '../../components/utils/validation.js';
import { defaultAxios } from '../../components/utils/axios/default.axios.js';

function PagesLogin() {
	const context = useContext(AppSettings);
	const [redirect, setRedirect] = useState(false);
	
	useEffect(() => {
		context.setAppHeaderNone(true);
		context.setAppSidebarNone(true);
		context.setAppContentClass('p-0');
		
		return function cleanUp() {
			context.setAppHeaderNone(false);
			context.setAppSidebarNone(false);
			context.setAppContentClass('');
		};
		
		// eslint-disable-next-line
	}, []);

	const INIT_STATE = {
        username:"",
        password:"",
      };
    
	//   signInValidationSchema
      const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
      useFormik({
        enableReinitialize: true,
        initialValues:  INIT_STATE,
        onSubmit: onSubmit,
        validationSchema: signInValidationSchema ,
      });

      async function onSubmit(data) {
          let res = await defaultAxios.post(
            `${process.env.REACT_APP_API_URL}user/login/`,{
				...data
			}, {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );
		    
		  localStorage.setItem("UD",JSON.stringify(res?.data?.data))
		  setRedirect(true);
       
      }
	
// 	function handleSubmit(event) {
// 		event.preventDefault();
		
// 		setRedirect(true);
//   }
  
	if (redirect) {
		return <Navigate to='/dashboard' />;
	}
	return (
		<div className="login">
			<div className="login-content">


				<form onSubmit={handleSubmit}>
					<div className='row' style={{textAlign:"center", marginBottom:"10px"}}>
						<div className='col-md-12' >
					<img src="/assets/img/user/brand.jpg" height="125" width="125" />

						</div>
					</div>
				
					
					<h1 className="text-center">Sign In</h1>
					<div className="text-inverse text-opacity-50 text-center mb-4">
						For your protection, please verify your identity.
					</div>
					<div className="mb-3">
						<label className="form-label">Username <span className="text-danger">*</span></label>
						<Element
                eletype={inputType.input}
                label="User Name"
                placeholder="Please enter username"
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur,
                  name: "username",
                }}
                errorText={touched.username && errors.username}
                value={values.username}
              />
						{/* <input type="text" onChange={} className="form-control form-control-lg bg-white bg-opacity-5" placeholder="" /> */}
					</div>
					<div className="mb-3">
						<div className="d-flex">
							<label className="form-label">Password <span className="text-danger">*</span></label>
							{/* <a href="#/" className="ms-auto text-inverse text-decoration-none text-opacity-50">Forgot password?</a> */}
						</div>
						<Element
                eletype={inputType.passwordinput}
                label="First Name"
                placeholder="Please enter your password"
                inputProps={{
                  onChange: handleChange,
                  onBlur: handleBlur,
                  name: "password",
                }}
                errorText={touched.password && errors.password}
                value={values.password}
              />
						{/* <input type="password" className="form-control form-control-lg bg-white bg-opacity-5" placeholder="" /> */}
					</div>
					<div className="mb-3">
						{/* <div className="form-check">
							<input className="form-check-input" type="checkbox" id="customCheck1" />
							<label className="form-check-label" htmlFor="customCheck1">Remember me</label>
						</div> */}
					</div>
					<button type="submit" className="btn btn-outline-theme btn-lg d-block w-100 fw-500 mb-3">Sign In</button>
					<div className="text-center text-inverse text-opacity-50">
						Don't have an account yet? <Link to="/register">Sign up</Link>.
					</div>
				</form>
			</div>
		</div>
	)
}

export default PagesLogin;