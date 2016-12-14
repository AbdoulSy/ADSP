package adspLayoutBuilder

import (
  "github.com/AbdoulSy/adspgoConfig"
  "github.com/AbdoulSy/adspPageTodolist"
)

type Builder struct {
   Config adspgo.Config
}

func (el T) Build (doc content.T) (p page.T, err error) {
    p = page.T{
    ID:          el.Config.ID,
    Title:       el.Config.Title,
    WalkContent: doc,
    Description: el.Config.Description,
  }

  return
}



