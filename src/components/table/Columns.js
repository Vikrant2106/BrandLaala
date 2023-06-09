// import AddCustomerModal from "../../modal/AddCustomerModal"


export const COLUMNS = [

	{
		Header: 'Id',
		Footer: 'id',
		accessor: '_id'
	},
	{
		Header: 'First Name',
		Footer: 'first_name',
		accessor: 'first_name'
	},
	{
		Header: 'Last Name',
		Footer: 'last_name',
		accessor: 'last_name'
	},
	{
		Header: 'Email',
		Footer: 'email',
		accessor: 'email'
	},
	// {
	// 	Header: 'Gender',
	// 	Footer: 'gender',
	// 	accessor: 'gender'
	// },
	// {
	// 	Header: 'Dob',
	// 	Footer: 'dob',
	// 	accessor: 'dob'
	// },
	{
		Header: 'Instagram',
		Footer: 'instagram',
		accessor: 'instagram_account'
	},
	{
		Header: 'Facebook',
		Footer: 'facebook',
		accessor: 'facebook_account'
	},
	{
		Header: 'Mobile',
		Footer: 'mobile',
		accessor: 'mobile'
	},
	{
		Header: 'Visit Date',
		Footer: 'Visit Date',
		accessor: 'enquiry_date'
	},
	{
		Header: 'Action',
		Footer: 'Action',
		accessor: 'action',
		Cell: ({ row }) => (<>
			<span  style={{marginRight:"15px"}} className="bi  bi-eye" ></span>
<span className="bi bi-trash" ></span>
			</>)
	},

]




