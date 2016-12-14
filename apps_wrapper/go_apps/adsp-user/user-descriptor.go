package adspUser

import (
  "net/http"
  "io/ioutil"
  "log"
  "encoding/json"
)

type User struct {
  Context string
  Has_picture string
  Has_projects []string
  Firstname string
  Lastname string
  Has_write_access bool
  Level_of_abstraction string
  Has_go_page string
  Is_go_local bool
  Handle_username string
}


