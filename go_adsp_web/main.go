package main

import (
	"fmt"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/", index)
	mux.HandleFunc("/projects", projects)
	mux.HandleFunc("/projects/:project_id/boards", projectBoards)
	mux.HandleFunc("/visualisation", visualisation)
	http.ListenAndServe(":8080", mux)
}

func index(w http.ResponseWriter, req *http.Request) {
	fmt.Fprint(w, "Hello Index")
}

func projects(w http.ResponseWriter, req *http.Request) {
	fmt.Fprint(w, "Hello Projects")
}

func projectBoards(w http.ResponseWriter, req *http.Request) {
	fmt.Fprint(w, "Hello Project Boards")
}

func visualisation(w http.ResponseWriter, req *http.Request) {
	fmt.Fprint(w, "Hello Visualisation")
}
