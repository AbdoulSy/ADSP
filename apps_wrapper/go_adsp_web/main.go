package main

import (
	"encoding/json"
	"github.com/AbdoulSy/adspgo"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
)

//Directory is the struct representation of a directory concept
type Directory struct {
	Root string
	Dirs []DirsType
}

//File is the struct representation of a File concept
type File struct {
	Description string
	Author      interface{}
	Project     interface{}
	Milestone   interface{}
	TODO        interface{}
	File        string
}

//DirsType is the struct representation of the Array of directory Concepts
type DirsType struct {
	Name, Mtime string
}

//Content is the struct representation of the Content Concept
type Content struct {
	WalkStart   int
	WalkEnd     int
	WalkTime    string
	Directories []Directory
	Files       []File
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

//Docss Holds the Content of the JSON String
var Docss Content

func init() {
	tpl = template.Must(template.ParseGlob("templates/*"))
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
		Title:       string(txt),
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
