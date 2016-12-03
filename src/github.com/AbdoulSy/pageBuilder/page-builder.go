package pageBuilder

import (
  "github.com/AbdoulSy/page"
  "github.com/AbdoulSy/content"
  "github.com/AbdoulSy/adspgo"
)

type T struct {
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



