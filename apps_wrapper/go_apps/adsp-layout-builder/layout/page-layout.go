package adspLayoutBuilder

import (
  "github.com/AbdoulSy/adspgoTheme"
  "github.com/AbdoulSy/nav"
  "github.com/AbdoulSy/userDescriptor"
  "github.com/AbdoulSy/page"
  "github.com/AbdoulSy/navelement"
  "github.com/AbdoulSy/commitHistoryReader"

)

//PageLayout structure holding the pageLayout Elements
type T struct {
	Contents string
	Styles   csslinks.T
	Scripts  jsscripts.T
	Logo     logo.T
	Nav      nav.T
	Page     page.T
	Errors   []error
	User     userDescriptor.User
	History  commitHistoryReader.History
}

//BuildVisualisationLayoutWithPage Builds a Visusalisation Layout
func BuildVisualisationLayoutWithPage(pa page.T, u userDescriptor.User, c commitHistoryReader.History) (pl T, err error) {
	theLinks := csslinks.T{
		Links: []string{
			"/public/stylesheets/main.css",
			"/public/stylesheets/layout.css",
		},
		Page: "Visualisation",
	}

	theScripts := jsscripts.T{
		Files: []string{
			"/public/javascripts/application.js",
			"https://code.jquery.com/jquery-2.1.1.min.js",
			"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js",
			"https://code.getmdl.io/1.2.1/material.min.js",
			"http://d3js.org/d3.v4.min.js",

		},
		Page: "Visualisation",
	}

	myLogo := logo.T{
		FilePath: "/public/images/logo.png",
		Title:    "ADSP LOGO",
	}

	homeNav := navelement.T{
		Name:     "Home",
		Link:     "/",
		Ligature: "home",
	}

	projectsNav := navelement.T{
		Name:     "Projects",
		Link:     "/projects",
		Ligature: "toc",
	}

	visualisationNav := navelement.T{
		Name:     "Visualisation",
		Link:     "/visualisation",
		Ligature: "bubble_chart",
	}

	myNav := nav.T{
		Elements: []navelement.T{homeNav, projectsNav, visualisationNav},
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
func BuildBasicLayoutWithPage(pa page.T, u userDescriptor.User, c commitHistoryReader.History) (pl T, err error) {
	theLinks := csslinks.T{
		Links: []string{
			"/public/stylesheets/main.css",
			"/public/stylesheets/layout.css",
		},
		Page: "Index",
	}

	theScripts := jsscripts.T{
		Files: []string{
			"/public/javascripts/application.js",
			"https://code.jquery.com/jquery-2.1.1.min.js",
			"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js",
			"https://code.getmdl.io/1.2.1/material.min.js",
		},
		Page: "Index",
	}

	myLogo := logo.T{
		FilePath: "/public/images/logo.png",
		Title:    "ADSP LOGO",
	}



	homeNav := navelement.T{
		Name:     "Home",
		Link:     "/",
		Ligature: "home",
	}

	projectsNav := navelement.T{
		Name:     "Projects",
		Link:     "/projects",
		Ligature: "toc",
	}

	visualisationNav := navelement.T{
		Name:     "Visualisation",
		Link:     "/visualisation",
		Ligature: "bubble_chart",
	}

	myNav := nav.T{
		Elements: []navelement.T{homeNav, projectsNav, visualisationNav},
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
