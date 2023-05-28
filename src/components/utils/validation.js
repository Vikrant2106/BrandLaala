import * as Yup from "yup";

export const buyersValidationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  // last_name: Yup.string().required("Last Name is required"),
  // contact_number: Yup.number().required("Mobile Number is required"),
  // facebook_account: Yup.string().required("Facebook Account is required"),
  // instagram_account: Yup.string().required("Instagram Account is required"),
  // email: Yup.string()
  // .email("Invalid email format")
  // .required("Email Id is required"),
  // contact_number:  Yup.number().required("Mobile Number is required"),
  // date_of_delivery: Yup.string().required("Date of Delivery is required"),
  // enquiry:Yup.string().required("Enquiry is required"),
});

export const inquiryValidationSchema= Yup.object({
  first_name: Yup.string().required("First Name is required"),
  // last_name: Yup.string().required("Last Name is required"),
  // mobile: Yup.number().required("Mobile Number is required"),
  // email: Yup.string()
  // .email("Invalid email format")
  // .required("Email Id is required"),
  // dob:Yup.string().required("Date of Birth is required"),
  // facebook_account:Yup.string().required("Facebook Account is required"),
  // instagram_account:Yup.string().required("Instagram is required"),
  // enquiry:Yup.string().required("Enquiry is required"),
})

export const signInValidationSchema= Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
})

export const registerValidationSchema= Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string()
  .email("Invalid email format")
  .required("Email Id is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required('Password is required'),
  confirm_password: Yup.string()
  .required('Confirm Password is required')
     .oneOf([Yup.ref('password'), null], 'Confirm password must match with password')
})

export const imageUploadValidation= Yup.object({
  images: Yup.array()
  .max(10, "Can'nt add more than 10 images")
  .required("Provide at least one image"),
})

export const changePasswordValidationSchema= Yup.object({
  old_password: Yup.string().required("Old Password is required"),
  new_password: Yup.string().required('New Password is required'),
  confirm_password: Yup.string()
  .required('Confirm Password is required')
     .oneOf([Yup.ref('new_password'), null], 'Confirm password must match with New Password')
})



