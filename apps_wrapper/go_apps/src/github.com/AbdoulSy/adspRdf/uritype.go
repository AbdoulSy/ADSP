package adspRdf
//UriType is a wrapper structure around a uri
//TODO: find a uri package to expand the uri definition
type UriType struct {
    Protocol string
    Host string
    Port string
    Location string
    FullUri string
}
