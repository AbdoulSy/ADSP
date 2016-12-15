package adspLayoutBuilder

import (
  "github.com/AbdoulSy/adspgoTheme"
  "github.com/AbdoulSy/adspRouterNav"
  "github.com/AbdoulSy/adspUser"
  "github.com/AbdoulSy/commitHistoryReader"

)

//PageLayout structure holding the pageLayout Elements
type T struct {
	Contents string
	Styles   adspgoTheme.CssLinks
	Scripts  adspgoTheme.JsScripts
	Logo     adspgoTheme.Logo
	Nav      adspRouterNav.RouterNav
	Page     Page
	Errors   []error
	User     adspUser.User
	History  commitHistoryReader.History
}

//BuildVisualisationLayoutWithPage Builds a Visusalisation Layout
func BuildVisualisationLayoutWithPage(pa Page, u adspUser.User, c commitHistoryReader.History) (pl T, err error) {
	theLinks := adspgoTheme.CssLinks{
		Links: []string{
			"/public/stylesheets/main.css",
			"/public/stylesheets/layout.css",
		},
		Page: "Visualisation",
	}

	theScripts := adspgoTheme.JsScripts{
		Files: []string{
			"/public/javascripts/application.js",
			"https://code.jquery.com/jquery-2.1.1.min.js",
			"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js",
			"https://code.getmdl.io/1.2.1/material.min.js",
			"http://d3js.org/d3.v4.min.js",

		},
		Page: "Visualisation",
	}

	myLogo := adspgoTheme.Logo{
		FilePath: "/public/images/logo.png",
		Title:    "ADSP LOGO",
	}

	homeNav := adspRouterNav.NavElement{
		Name:     "Home",
		Link:     "/",
		Ligature: "home",
	}

	projectsNav := adspRouterNav.NavElement{
		Name:     "Projects",
		Link:     "/projects",
		Ligature: "toc",
	}

	visualisationNav := adspRouterNav.NavElement{
		Name:     "Visualisation",
		Link:     "/visualisation",
		Ligature: "bubble_chart",
	}

	myNav := adspRouterNav.RouterNav{
		Elements: []adspRouterNav.NavElement{
			homeNav, projectsNav, visualisationNav},
	}

	pl = T{
		Contents: "I am cat",
		Styles:   theLinks,
		Scripts:  theScripts,
		Logo:     myLogo,
		Nav:      myNav,
		Page:     pa,
		User:     u,
		History: c,
	}

	return
}

//BuildBasicLayoutWithPage Builds a basic Layout with a page embedded
func BuildBasicLayoutWithPage(
	pa Page,
	u adspUser.User,
	c commitHistoryReader.History) (pl T, err error) {

	theLinks := adspgoTheme.CssLinks{
		Links: []string{
			"/public/stylesheets/main.css",
			"/public/stylesheets/layout.css",
		},
		Page: "Index",
	}

	theScripts := adspgoTheme.JsScripts{
		Files: []string{
			"/public/javascripts/application.js",
			"https://code.jquery.com/jquery-2.1.1.min.js",
			"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js",
			"https://code.getmdl.io/1.2.1/material.min.js",
		},
		Page: "Index",
	}

	myLogo := adspgoTheme.Logo{
		FilePath: "/public/images/logo.png",
		Title:    "ADSP LOGO",
	}



	homeNav := adspRouterNav.NavElement{
		Name:     "Home",
		Link:     "/",
		Ligature: "home",
	}

	projectsNav := adspRouterNav.NavElement{
		Name:     "Projects",
		Link:     "/projects",
		Ligature: "toc",
	}

	visualisationNav := adspRouterNav.NavElement{
		Name:     "Visualisation",
		Link:     "/visualisation",
		Ligature: "bubble_chart",
	}

	myNav := adspRouterNav.RouterNav{
		Elements: []adspRouterNav.NavElement{
			homeNav, projectsNav, visualisationNav},
	}

	pl = T{
		Contents: "I am Dog",
		Styles:   theLinks,
		Scripts:  theScripts,
		Logo:     myLogo,
		Nav:      myNav,
		Page:     pa,
		User:     u,
		History: c,
	}

	return

}
