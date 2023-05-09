import * as Yup from "yup";

export const buyersValidationSchema = Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  mobile: Yup.number().required("Mobile Number is required"),
  facebook_account: Yup.string().required("Facebook Account is required"),
  instagram_account: Yup.string().required("Instagram Account is required"),
  start_date: Yup.string().required("Start Date is required"),
  email: Yup.string()
  .email("Invalid email format")
  .required("Email Id is required"),
});

export const inquiryValidationSchema= Yup.object({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  mobile: Yup.number().required("Mobile Number is required"),
  start_date: Yup.string().required("Start Date is required"),
  email: Yup.string()
  .email("Invalid email format")
  .required("Email Id is required"),
})