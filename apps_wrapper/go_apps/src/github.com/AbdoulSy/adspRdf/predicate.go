package adspRdf

//PredicateType is a structure holding predicates
type PredicateType struct {
    ShortPrefix string
    Prefix UriType
    Name string
    Value interface{}
}
