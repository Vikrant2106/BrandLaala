import React, { useEffect, useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AppSettings } from './../../config/app-settings.js';
import Element from '../../components/Form/Element.js';
import { inputType } from '../../components/utils/enum.js';
import { useFormik } from "formik";
import axios from 'axios';
import { failureToast, successToast } from '../../components/toast/toast.js';
import { registerValidationSchema } from '../../components/utils/validation.js';

function PagesRegister() {
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
		first_name: "",
		last_name: "",
		email: "",
		username: "",
		password: "",
		confirm_password:""
	};

	//   signInValidationSchema
	const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
		useFormik({
			enableReinitialize: true,
			initialValues: INIT_STATE,
			onSubmit: onSubmit,
			validationSchema: registerValidationSchema,
		});

	async function onSubmit(data) {


	
		let res = await axios.post(
			`${process.env.REACT_APP_API_URL}user/signup/`, {data:{	...data}}, {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		);
		if(res?.data?.status===1)
		{
			successToast(res?.data?.message)
			setRedirect(true);
		}
		else{
			failureToast(res?.data?.err)		
		}


	}

	if (redirect) {
		return <Navigate to='/pages/login' />;
	}
	return (
		<div className="register">
			<div className="register-content">
				<form onSubmit={handleSubmit}>
					<h1 className="text-center">Sign Up</h1>
					<p className="text-inverse text-opacity-50 text-center">One Admin ID is all you need to access all the Admin services.</p>
					<div className="mb-3">
						<label className="form-label">First Name <span className="text-danger">*</span></label>
						<Element
							eletype={inputType.input}
							label="First Name"
							placeholder="Please enter first name"
							inputProps={{
								onChange: handleChange,
								onBlur: handleBlur,
								name: "first_name",
							}}
							errorText={touched.first_name && errors.first_name}
							value={values.first_name}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Last Name <span className="text-danger">*</span></label>
						<Element
							eletype={inputType.input}
							label="Last Name"
							placeholder="Please enter last name"
							inputProps={{
								onChange: handleChange,
								onBlur: handleBlur,
								name: "last_name",
							}}
							errorText={touched.last_name && errors.last_name}
							value={values.last_name}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">Email <span className="text-danger">*</span></label>
						<Element
							eletype={inputType.input}
							label="Email"
							placeholder="Please enter email"
							inputProps={{
								onChange: handleChange,
								onBlur: handleBlur,
								name: "email",
							}}
							errorText={touched.email && errors.email}
							value={values.email}
						/>
					</div>
					<div className="mb-3">
						<label className="form-label">User Name <span className="text-danger">*</span></label>
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
					</div>

					<div className="mb-3">
						<label className="form-label">Password <span className="text-danger">*</span></label>
						<Element
							eletype={inputType.passwordinput}
							label="Password"
							placeholder="Please enter password"
							inputProps={{
								onChange: handleChange,
								onBlur: handleBlur,
								name: "password",
							}}
							errorText={touched.password && errors.password}
							value={values.password}
						/>
					</div>

					<div className="mb-3">
						<label className="form-label">Confirm Password <span className="text-danger">*</span></label>
						<Element
							eletype={inputType.passwordinput}
							label="Email"
							placeholder="Please enter confirm password"
							inputProps={{
								onChange: handleChange,
								onBlur: handleBlur,
								name: "confirm_password",
							}}
							errorText={touched.confirm_password && errors.confirm_password}
							value={values.confirm_password}
						/>
					</div>
					
					{/* <div className="mb-3">
						<div className="form-check">
							<input className="form-check-input" type="checkbox" id="customCheck1" />
							<label className="form-check-label" htmlFor="customCheck1">I have read and agree to the <a href="#/">Terms of Use</a> and <a href="#/">Privacy Policy</a>.</label>
						</div>
					</div> */}
					<div className="mb-3">
						<button type="submit" className="btn btn-outline-theme btn-lg d-block w-100">Sign Up</button>
					</div>
					<div className="text-inverse text-opacity-50 text-center">
						Already have an Admin ID? <Link to="/pages/login">Sign In</Link>
					</div>
				</form>
			</div>
		</div>
	)
}

export default PagesRegister;