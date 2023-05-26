import React from 'react';
import { Card } from '../../components/card/card.jsx';
import Element from "../../components/Form/Element";
import { inputType } from "../../components/utils/enum.js";
import { useFormik } from "formik";
import { changePasswordValidationSchema } from "../../components/utils/validation.js";
import axios from 'axios';
import {
  successToast, failureToast
} from '../../components/toast/toast.js';

function Settings() {


	const INIT_STATE = {
		old_password: "",
		new_password: "",
		confirm_password: "",
	  };
	
	
	  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
		useFormik({
		  enableReinitialize: true,
		  initialValues: INIT_STATE,
		  onSubmit: onSubmit,
		  validationSchema: changePasswordValidationSchema,
		});
	
	  async function onSubmit(data) {
		debugger;
		const {confirm_password,...newData} = data;
		var d = JSON.parse(localStorage.getItem("UD"));
		  let res = await axios.put(
			`${process.env.REACT_APP_API_URL}user/change_password/${d._id}`, {  ...newData }, {
			headers: {
			  'Content-Type': 'application/json'
			}
		  }
		  );
		  successToast(res?.data?.message);
		
	  }
	return (
		<div>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-xl-10">
						<div className="row">
							<div className="col-xl-12">
								<div id="general" className="mb-5">
									<h4><i className="far fa-user fa-fw text-theme"></i> Reset Password</h4>
									<p>View and update your general account information and settings.</p>
									<Card>
										<form onSubmit={handleSubmit}>
									<div className='row m-3'>
										<div className='col-md-12 m-2'>
										<span className='m-1'>Old Password :</span>	
										<Element
											eletype={inputType.passwordinput}
											label="Old Password"
											placeholder="Enter your Old Password"
											inputProps={{
												onChange: handleChange,
												onBlur: handleBlur,
												name: "old_password",
											}}
											errorText={touched.old_password && errors.old_password}
											value={values.old_password}
										/>
										</div>
										<div className='col-md-12 m-2'>
										<span className='m-1'>New Password :</span>	
										<Element
											eletype={inputType.passwordinput}
											label="New Password"
											placeholder="Enter your New Password"
											inputProps={{
												onChange: handleChange,
												onBlur: handleBlur,
												name: "new_password",
											}}
											errorText={touched.new_password && errors.new_password}
											value={values.new_password}
										/>
										</div>
										<div className='col-md-12 m-2'>
										<span className='m-1'>Confirm Password :</span>	
										<Element
											eletype={inputType.passwordinput}
											label="Confirm Password"
											placeholder="Enter your New Password"
											inputProps={{
												onChange: handleChange,
												onBlur: handleBlur,
												name: "confirm_password",
											}}
											errorText={touched.confirm_password && errors.confirm_password}
											value={values.confirm_password}
										/>

										</div>
									</div>
									<div style={{textAlign:"right"}}>	
											<button className='btn btn-outline-theme btn-lg m-4 p-2'  type="submit"> Save </button>
									</div>
									</form>
									</Card>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	
			
		</div>
	)
}

export default Settings;