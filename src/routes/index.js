const MENUS = [
	{id: 1, txt: "Dashboard", url: "/"},
	{id: 2, txt: "Users", url: "/users"},
	{id: 3, txt: "Contact us", url: "/contact-us"},
	{id: 4, txt: "Reports", url: "/reports"},
	{id: 5, txt: "Emails", url: "/emails"},
	{id: 6, txt: "Articles", url: "/articles"},
	{
		id: 7, 
		txt: "General", 
		url: "/general",
		kids: [
			{id: 1, txt: "Link / Menu", url: "/add-url-link"},
			
		]
	},{
		id: 8, 
		txt: "Input data",
		url: "/input-data",
		kids: [
			{id: 1, txt: "Users", url: "/users-inputs"},
			{id: 2, txt: "Emails", url: "/emails-inputs"},
			{id: 3, txt: "Articles", url: "/articles-inputs"}
		]
	},{
		id: 9, 
		txt: "Tools",
		url: "/tools",
		kids: [
			{id: 1, txt: "SEO", url: "/seo"},
			{id: 2, txt: "Third party API", url: "/third-party-api"},
			{id: 3, txt: "Media tools", url: "/media-tools"}
		]
	},{
		id: 10, 
		txt: "DEV",
		url: "/dev",
		kids: [
			{id: 1, txt: "FileMaker", url: "/file-maker"},
			{id: 2, txt: "VttMaker", url: "/vtt-maker"}
		]
	},
	
	// DEV
	{id: 11, txt: "Articles", url: "/articles"},
	{id: 12, txt: "Articles", url: "/articles"},
	{id: 13, txt: "Articles", url: "/articles"},
	{id: 14, txt: "Articles", url: "/articles"},
	{id: 15, txt: "Articles", url: "/articles"},
	{id: 16, txt: "Articles", url: "/articles"},
	{id: 17, txt: "Articles", url: "/articles"},
	{id: 18, txt: "Articles", url: "/articles"},
	{id: 19, txt: "Articles", url: "/articles"},
	{id: 20, txt: "Articles", url: "/articles"},
	{id: 21, txt: "Articles", url: "/articles"},
	{id: 22, txt: "Articles", url: "/articles"}
];

/*const ROUTES = [
	{id: 1, txt: "Dashboard", url: "/"},
	
  {
    //component: PageGetStarted,
    txt: "Getting started", 
    parent: true,
    routes: [
      {
        path: "/getting-started/installation",
        //component: PageInstallation,
        txt: "Installation"
      },{
        path: "/getting-started/usage",
        //component: PageUsage,
        txt: "Usage"
      }
    ]
  }
];*/

export {MENUS}; // ROUTES