package adspLayoutBuilder

import (
  "github.com/AbdoulSy/adspPageTodolist"
)

//PageType is the structure defining the ADSP Page Concept
type Page struct {
	Title       string
	ID          string
	Description string
	WalkContent adspPageTodolist.T
}
