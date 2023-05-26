import { useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
	const notificationData = [{
		"icon": "bi bi-bag text-theme",
		"title": "NEW ORDER RECEIVED ($1,299)",
		"time": "JUST NOW"
	},{
		"icon": "bi bi-person-circle text-theme",
		"title": "3 NEW ACCOUNT CREATED",
		"time": "2 MINUTES AGO"
	},{
		"icon": "bi bi-gear text-theme",
		"title": "SETUP COMPLETED",
		"time": "3 MINUTES AGO"
	},{
		"icon": "bi bi-grid text-theme",
		"title": "WIDGET INSTALLATION DONE",
		"time": "5 MINUTES AGO"
	},{
		"icon": "bi bi-credit-card text-theme",
		"title": "PAYMENT METHOD ENABLED",
		"time": "10 MINUTES AGO"
	}];
	
	const toggleAppSidebarDesktop = () => {
		var elm = document.querySelector('.app');
		elm.classList.toggle('app-sidebar-collapsed');
	}
	
	const toggleAppSidebarMobile = () => {
		var elm = document.querySelector('.app');
		elm.classList.toggle('app-sidebar-mobile-toggled');
	}
	
	const toggleAppHeaderSearch = () => {
		var elm = document.querySelector('.app');
		elm.classList.toggle('app-header-menu-search-toggled');
	}

	useEffect(()=>
	{
		toggleAppSidebarDesktop();
		toggleAppSidebarMobile();
	},[])

	return (
		<div id="header" className="app-header">
			<div className="desktop-toggler">
				<button type="button" className="menu-toggler" onClick={toggleAppSidebarDesktop}>
					<span className="bar"></span>
					<span className="bar"></span>
					<span className="bar"></span>
				</button>
			</div>
			
			<div className="mobile-toggler">
				<button type="button" className="menu-toggler" onClick={toggleAppSidebarMobile}>
					<span className="bar"></span>
					<span className="bar"></span>
					<span className="bar"></span>
				</button>
			</div>
			
			<div className="brand">
				<Link to="/dashboard" className="brand-logo">
					<img src="/assets/img/user/brand.jpg" alt="companylogo" height="50" width="100" />
				</Link>
			</div>
			
			<div className="menu">
				
				<div className="menu-item dropdown dropdown-mobile-full">
					<a href="#/" data-bs-toggle="dropdown" data-bs-display="static" className="menu-link">
						<div className="menu-img online">
							<img src="/assets/img/user/profile.jpg" alt="Profile" height="60" />
						</div>
						<div className="menu-text d-sm-block d-none w-90px">
						{JSON.parse(localStorage.getItem("UD"))?.username}

						</div>
					</a>
					<div className="dropdown-menu dropdown-menu-end me-lg-3 fs-11px mt-1">
						<Link to="/settings" className="dropdown-item d-flex align-items-center">SETTINGS <i className="bi bi-gear ms-auto text-theme fs-16px my-n1"></i></Link>
						<div className="dropdown-divider"></div>
						<Link to="/login" onClick={()=> localStorage.removeItem("UD")} className="dropdown-item d-flex align-items-center">LOGOUT <i className="bi bi-toggle-off ms-auto text-theme fs-16px my-n1"></i></Link>
					</div> 
				</div>
			</div>
			
			<form className="menu-search" method="POST" name="header_search_form">
				<div className="menu-search-container">
					<div className="menu-search-icon"><i className="bi bi-search"></i></div>
					<div className="menu-search-input">
						<input type="text" className="form-control form-control-lg" placeholder="Search menu..." />
					</div>
					<div className="menu-search-icon">
						<a href="#/" onClick={toggleAppHeaderSearch}><i className="bi bi-x-lg"></i></a>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Header;
