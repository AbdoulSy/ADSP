package adspLayoutBuilder

import (
  "github.com/AbdoulSy/adspgoConfig"
  "github.com/AbdoulSy/adspPageTodolist"
)

type Builder struct {
   Config adspgoConfig.Config
}

func (el Builder) Build (doc adspPageTodolist.T) (p Page, err error) {
    p = Page{
    ID:          el.Config.ID,
    Title:       el.Config.Title,
    WalkContent: doc,
    Description: el.Config.Description,
  }

  return
}



