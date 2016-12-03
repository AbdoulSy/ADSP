package commitHistoryReader

import (
  "net/http"
  "io/ioutil"
  "log"
  "encoding/json"
)

type Commit struct {
    Sha string
    Author string
    Date string
    Message string
}

type History []Commit

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
