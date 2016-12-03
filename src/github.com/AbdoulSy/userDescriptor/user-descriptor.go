package userDescriptor

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

type T struct {
   QueryName string
   Name string
   Host string
}

func (descriptor T) GetBodyAsTextSync (item interface{}) () {
    res, getErr := http.Get(descriptor.Host)
    if getErr != nil {
        log.Fatal(getErr)
    }

    txt, err := ioutil.ReadAll(res.Body)
    res.Body.Close()
    if err != nil {
        log.Fatal(err)
    }

    erri := json.Unmarshal(txt, &item)

    if erri != nil {
        log.Fatal(erri)
    }

    return
}
