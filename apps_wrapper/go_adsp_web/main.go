package main

import (
	"github.com/AbdoulSy/adspgo"
	"html/template"
	"log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", index)
	mux.HandleFunc("/projects", projects)
	mux.HandleFunc("/projects/*/boards", projectBoards)
	mux.HandleFunc("/visualisation", visualisation)
	mux.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("./public"))))
	http.ListenAndServe(":8080", mux)
}

var tpl *template.Template

func init() {
	tpl = template.Must(template.ParseGlob("templates/*"))
}

func index(w http.ResponseWriter, req *http.Request) {

	theLinks := adspgo.CSSLinks{
		Links: []string{
			"/public/styles/main.css",
			"/public/styles/layout.css",
			"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css",
		},
		Page: "Index",
	}

	theScripts := adspgo.JsScripts{
		Files: []string{
			"/public/js/hello.js",
			"https://code.jquery.com/jquery-2.1.1.min.js",
			"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js",
		},
		Page: "Index",
	}

	myLogo := adspgo.LogoType{
		FilePath: "/public/images/logo.png",
		Title:    "ADSP LOGO",
	}

	homeNav := adspgo.NavElementType{
		Name: "Home",
		Link: "/",
	}

	projectsNav := adspgo.NavElementType{
		Name: "Projects",
		Link: "/projects",
	}

	visualisationNav := adspgo.NavElementType{
		Name: "Visualisation",
		Link: "/visualisation",
	}

	myNav := adspgo.NavType{
		Elements: []adspgo.NavElementType{homeNav, projectsNav, visualisationNav},
	}

	myPage := adspgo.PageType{
		ID:          "aria-abdoulsy-eu/adsp/home",
		Title:       "The Home Page",
		Description: "This Page describe the current State of the Team",
	}

	c := adspgo.PageLayout{
		Contents: "I am Dog",
		Styles:   theLinks,
		Scripts:  theScripts,
		Logo:     myLogo,
		Nav:      myNav,
		Page:     myPage,
	}

	err := tpl.ExecuteTemplate(w, "layout", c)
	if err != nil {
		log.Println(err)
	}
}

func projects(w http.ResponseWriter, req *http.Request) {

	err := tpl.ExecuteTemplate(w, "layout", 44)
	if err != nil {
		log.Println(err)
	}
}

func projectBoards(w http.ResponseWriter, req *http.Request) {

	err := tpl.ExecuteTemplate(w, "layout", 44)
	if err != nil {
		log.Println(err)
	}
}

func visualisation(w http.ResponseWriter, req *http.Request) {

	err := tpl.ExecuteTemplate(w, "layout", 45)
	if err != nil {
		log.Println(err)
	}
}
