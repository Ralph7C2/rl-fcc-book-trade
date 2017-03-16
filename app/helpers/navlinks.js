function NavLinks() {
	this.active = 'nav-item nav-link active';
	this.default = 'nav-item nav-link';
}

NavLinks.prototype.getHome = function(active) {
	return {
		class: active?this.active:this.default,
		link: "/",
		text: "Home"
	};
}
NavLinks.prototype.getManage = function(active) {
	return {
		class: active?this.active:this.default,
		link: "/manage",
		text: "Manage"
	};
}
NavLinks.prototype.getBrowse = function(active) {
	return {
		class: active?this.active:this.default,
		link: "/browse",
		text: "Browse"
	};
}
NavLinks.prototype.getDashboard = function(active) {
	return {
		class: active?this.active:this.default,
		link: "/dashboard",
		text: "Dashboard"
	};
}

module.exports = NavLinks;