package commitHistoryReader

import (
  "net/http"
  "io/ioutil"
  "log"
  "encoding/json"
)

/**
 * A Commit at its basic form
 * @type commitHistoryReader.Commit
 * @type_used in commitHistoryReader.History
 * @interface_var {string} Sha the sha1 of the commit
 * @interface_var {string} Author the handle of the author
 * @interface_var {string} Date the datetime of the commit
 * @interface_var {string} The Message of the current commit
 */
type Commit struct {
    Sha string
    Author string
    Date string
    Message string
}

/**
 * A History is a List of commits in a basic Array
 * @type commitHistoryReader.History
 * @interface_var []Commit all commits on this current history Element
 * TODO(asy): add more parameter on how much commits to retrieve etc...
 */
type History []Commit

/**
 * The Main Type of this package
 * @type commitHistoryReader.T
 * @interface_var QueryName is the name of the Query (should be a simple normalized name)
 * @interface_var Name Of the commit history reader
 * @interface_var Host : The host of the Query
 * TODO(asy): Find out normalized names for Queries
 * TODO(asy): Find out normalized name for The commit history reader Application name
 * TODO(asy): Use QueryName and Name in a good manner
 */
type T struct {
   QueryName string
   Name string
   Host string
}
/**
 * Gets the Response of the descriptor T HTTP Request as a synchronous request
 * And unmarshalls the data into a Struct interface
 * TODO: create a go routine to asynchronously retrieve data into a component api
 * @param  {T} descriptor T) GetBodyAsTextSync (item interface{})
 * @return {interface{}} The unmarshalled json Object
 */
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
