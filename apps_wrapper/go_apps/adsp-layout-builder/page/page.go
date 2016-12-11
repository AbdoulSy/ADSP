package page

import (
  "github.com/AbdoulSy/content"
)

//PageType is the structure defining the ADSP Page Concept
type T struct {
	Title       string
	ID          string
	Description string
	WalkContent content.T
}
