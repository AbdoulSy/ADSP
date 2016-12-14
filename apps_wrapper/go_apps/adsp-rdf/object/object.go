package adspRdf

//PredicateType is a structure holding predicates
type ObjectType TripleElement {
    ShortPrefix string
    Prefix UriType
    Name string
    Value interface{}
}
