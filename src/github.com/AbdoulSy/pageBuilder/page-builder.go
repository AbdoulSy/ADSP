package pageBuilder

import (
  "github.com/AbdoulSy/page"
)

type T struct {
   Config adspgo.Config
}

func (el T) Build (doc interface{}) (p page.T) {
    p := &page.T{
    ID:          el.Config.ID,
    Title:       el.Config.Title,
    WalkContent: doc,
    Description: el.Config.Description,
  }

  return
}



