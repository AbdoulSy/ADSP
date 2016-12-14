package adspLayoutBuilder

import (
  "github.com/AbdoulSy/content"
)

//PageType is the structure defining the ADSP Page Concept
type Page struct {
	Title       string
	ID          string
	Description string
	WalkContent content.T
}
