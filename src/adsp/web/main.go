package main

import (
	"encoding/json"
	"github.com/AbdoulSy/adspgo"
	"github.com/AbdoulSy/pageBuilder"
    "github.com/AbdoulSy/codeDescriptor"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", index)
	mux.HandleFunc("/projects", projects)
	mux.HandleFunc("/visualisation", visualisation)
	mux.Handle("/public/", http.StripPrefix("/public/", http.FileServer(http.Dir("./public"))))
	log.Println("ADSP Web server listening on the port 8080")
	http.ListenAndServe(":8080", mux)
}

var tpl *template.Template

//Docss Holds the Content of the JSON String
var Docss adspgo.Content

func init() {
	tpl = template.Must(template.ParseGlob("views/templates/*"))
}

func index(w http.ResponseWriter, req *http.Request) {

	//indev var assignments
    docName := "FileWalkAndDescription"
    host := "http://localhost:3465"
    fileReader = &codeDescriptor {
    	Name: docName,
    	Host: host
    }
    //fileReader injects content into Docss structure
    fileReader.GetBodyAsTextSync(Docss)

	log.Printf("%+v", Docss)

	pageBuilder := &pageBuilder{
		Config: adspgo.Configuration("HOME")
	}

	myPage, err := pageBuilder.Build(Docss)
	c, er := adspgo.BuildBasicLayoutWithPage(myPage)

	errtmpl := tpl.ExecuteTemplate(w, "layout", c)
	if errtmpl != nil || er != nil {
		log.Println(errtmpl)
	}
}

func projects(w http.ResponseWriter, req *http.Request) {

	pageBuilder := &pageBuilder{
		Config: adspgo.Configuration("PROJECTS")
	}
	projectPage, err := pageBuilder.Build()
	c, er := adspgo.BuildBasicLayoutWithPage(projectPage)
	err := tpl.ExecuteTemplate(w, "layout", c)
	if err != nil || er != nil {
		log.Println(err)
	}

}

func visualisation(w http.ResponseWriter, req *http.Request) {

	pageBuilder := &pageBuilder{
		Config: adspgo.Configuration("VISUALISATION")
	}
	visualisationPage, err := pageBuilder.Build()
	c, er := adspgo.BuildBasicLayoutWithPage(visualisationPage)
	err := tpl.ExecuteTemplate(w, "layout", c)
	if err != nil || er != nil {
		log.Println(err)
	}
}
