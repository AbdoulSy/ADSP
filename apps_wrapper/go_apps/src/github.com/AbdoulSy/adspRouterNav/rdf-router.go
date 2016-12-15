package adspRouterNav

import (
    "github.com/AbdoulSy/adspRdf"
    "log"
    "net/http"
    "io/ioutil"
    "encoding/json"
)

type RDFRouterDocumentBuilder struct {
    Route string
    DocumentName string
    Uri adspRdf.UriType
    Triple adspRdf.Triple
}


func (builder RDFRouterDocumentBuilder) ReadRemoteJsonBodyInItem (item interface{}) () {
    uri := builder.Uri
    res, getErr := http.Get(uri.FullUri)
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
