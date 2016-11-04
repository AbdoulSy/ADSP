package main

import (
	"html/template"
	"log"
	"net/http"
)

type cssLinks struct {
	Links []string
	Page  string
}

type logoType struct {
	Filepath string
	Title    string
}

type errorType struct {
	ErrCode    string
	ErrTitle   string
	Message    string
	StackTrace []string
}

type jsScripts struct {
	Files []string
	Page  string
}

type navElementType struct {
	Name string
	Link string
}

type pageType struct {
	Title       string
	ID          string
	Description string
}

type navType struct {
	Elements []navElementType
}

type pageLayout struct {
	Contents string
	Styles   cssLinks
	Scripts  jsScripts
	Logo     logoType
	Nav      navType
	Page     pageType
	Errors   []errorType
}

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

	theLinks := cssLinks{
		Links: []string{
			"/public/styles/main.css",
			"/public/styles/layout.css",
			"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css",
		},
		Page: "Index",
	}

	theScripts := jsScripts{
		Files: []string{
			"/public/js/hello.js",
			"https://code.jquery.com/jquery-2.1.1.min.js",
			"https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/js/materialize.min.js",
		},
		Page: "Index",
	}

	myLogo := logoType{
		Filepath: "/public/images/logo.png",
		Title:    "ADSP LOGO",
	}

	homeNav := navElementType{
		Name: "Home",
		Link: "/",
	}

	projectsNav := navElementType{
		Name: "Projects",
		Link: "/projects",
	}

	visualisationNav := navElementType{
		Name: "Visualisation",
		Link: "/visualisation",
	}

	myNav := navType{
		Elements: []navElementType{homeNav, projectsNav, visualisationNav},
	}

	myPage := pageType{
		ID:          "aria-abdoulsy-eu/adsp/home",
		Title:       "The Home Page",
		Description: "This Page describe the current State of the Team",
	}

	c := pageLayout{
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
