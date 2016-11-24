package main

import (
	"encoding/json"
	"github.com/AbdoulSy/adspgo"
	"html/template"
	"io/ioutil"
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

//Docss Holds the Content of the JSON String
var Docss adspgo.Content

func init() {
	tpl = template.Must(template.ParseGlob("views/templates/*"))
}

func index(w http.ResponseWriter, req *http.Request) {

	res, err := http.Get("http://localhost:3465/")
	if err != nil {
		log.Fatal(err)
	}
	txt, err := ioutil.ReadAll(res.Body)
	res.Body.Close()
	if err != nil {
		log.Fatal(err)
	}

	erri := json.Unmarshal(txt, &Docss)

	if erri != nil {
		log.Fatal(erri)
	}

	log.Printf("%+v", Docss)

	myPage := adspgo.PageType{
		ID:          "aria-abdoulsy-eu/adsp/home",
		Title:       "Home Page",
		WalkContent: Docss,
		Description: "This Page describe the current state of the Team",
	}
	c, er := adspgo.BuildBasicLayoutWithPage(myPage)

	errtmpl := tpl.ExecuteTemplate(w, "layout", c)
	if errtmpl != nil || er != nil {
		log.Println(errtmpl)
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
