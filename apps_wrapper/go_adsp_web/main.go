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

	myPage := adspgo.PageType{
		ID:          "aria-abdoulsy-eu/adsp/home",
		Title:       "The Home Page",
		Description: "This Page describe the current state of the Team",
	}
	c, er := adspgo.BuildBasicLayoutWithPage(myPage)

	err := tpl.ExecuteTemplate(w, "layout", c)
	if err != nil || er != nil {
		log.Println(err)
	}
}

func projects(w http.ResponseWriter, req *http.Request) {

	projectPage := adspgo.PageType{
		ID:          "aria-abdoulsy-eu/adsp/projects",
		Title:       "The Project Page",
		Description: "This Page shows the Current Projects of the Team",
	}
	c, er := adspgo.BuildBasicLayoutWithPage(projectPage)
	err := tpl.ExecuteTemplate(w, "layout", c)
	if err != nil || er != nil {
		log.Println(err)
	}

}

func projectBoards(w http.ResponseWriter, req *http.Request) {

	myPage := adspgo.PageType{
		ID:          "aria-abdoulsy-eu/adsp/projects-boards",
		Title:       "The Project Boards Page",
		Description: "This Page shows the Boards a-la-trello of the Team",
	}
	c, er := adspgo.BuildBasicLayoutWithPage(myPage)
	err := tpl.ExecuteTemplate(w, "layout", c)
	if err != nil || er != nil {
		log.Println(err)
	}
}

func visualisation(w http.ResponseWriter, req *http.Request) {

	myPage := adspgo.PageType{
		ID:          "aria-abdoulsy-eu/adsp/visualisation",
		Title:       "The Visualisation Page",
		Description: "This Page shows various visualisations for the Team",
	}
	c, er := adspgo.BuildBasicLayoutWithPage(myPage)
	err := tpl.ExecuteTemplate(w, "layout", c)
	if err != nil || er != nil {
		log.Println(err)
	}
}
