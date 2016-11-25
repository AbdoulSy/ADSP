package adspgo

//PageLayout structure holding the pageLayout Elements
type PageLayout struct {
	Contents string
	Styles   CSSLinks
	Scripts  JsScripts
	Logo     LogoType
	Nav      NavType
	Page     PageType
	Errors   []ErrorType
}

//Builds a basic Layout with a page embedded
func BuildBasicLayoutWithPage(pa PageType) (pl PageLayout, err error) {
	theLinks := CSSLinks{
		Links: []string{
			"/public/stylesheets/main.css",
			"/public/stylesheets/layout.css",
		},
		Page: "Index",
	}

	theScripts := JsScripts{
		Files: []string{
			"/public/javascripts/application.js",
			"https://code.jquery.com/jquery-2.1.1.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js",
            "https://code.getmdl.io/1.2.1/material.min.js",

		},
		Page: "Index",
	}

	myLogo := LogoType{
		FilePath: "/public/images/logo.png",
		Title:    "ADSP LOGO",
	}

	homeNav := NavElementType{
		Name: "Home",
		Link: "/",
	}

	projectsNav := NavElementType{
		Name: "Projects",
		Link: "/projects",
	}

	visualisationNav := NavElementType{
		Name: "Visualisation",
		Link: "/visualisation",
	}

	myNav := NavType{
		Elements: []NavElementType{homeNav, projectsNav, visualisationNav},
	}

	pl = PageLayout{
		Contents: "I am Dog",
		Styles:   theLinks,
		Scripts:  theScripts,
		Logo:     myLogo,
		Nav:      myNav,
		Page:     pa,
	}

	return

}
