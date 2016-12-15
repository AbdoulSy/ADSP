package adspRdf

//PredicateType is a structure holding predicates
type ObjectType struct {
    ShortPrefix string
    Prefix UriType
    Name string
    Value interface{}
}
