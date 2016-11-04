package main

import (
	"html/template"
	"log"
	"net/http"
)

type pageContent struct {
	Contents string
}

type pageHead struct {
	Metas    []meta
	Contents string
}

type meta struct {
	name    string
	content string
}

type pageBody struct {
	Contents string
}

type pageLayout struct {
	Contents string
}

type htmlHead struct {
	Rendered string
}

type htmlBody struct {
	Rendered string
}

type htmlPage struct {
	Head htmlHead
	Body htmlBody
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", index)
	mux.HandleFunc("/projects", projects)
	mux.HandleFunc("/projects/*/boards", projectBoards)
	mux.HandleFunc("/visualisation", visualisation)
	http.ListenAndServe(":8080", mux)
}

var tpl *template.Template

func init() {
	tpl = template.Must(template.ParseGlob("templates/*"))
}

func index(w http.ResponseWriter, req *http.Request) {

	c := pageLayout{
		Contents: "I am Dog",
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
