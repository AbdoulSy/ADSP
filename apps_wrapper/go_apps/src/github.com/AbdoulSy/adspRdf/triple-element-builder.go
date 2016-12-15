package adspRdf


type TripleElement struct{
}

//Triple builder structure
type TripleElementBuilder struct {
    Value interface {
    }
}

func (t TripleElementBuilder) BuildTriple () (Triple) {
    return Triple{}
}


func (t TripleElementBuilder) buildObjectValue () (ObjectType){
    switch t.Value.(type) {
        case UriType:
            return ObjectType{
                Value: t.Value,
            }
        default:
            return ObjectType{
                Value: t.Value,
            }
    }
}

func (t TripleElementBuilder) buildPredicateValue () (PredicateType){
    return PredicateType{
        Value: t.Value,
    }
}

func (t TripleElementBuilder) BuildSubjectValue () (SubjectType){
    return SubjectType{
        Value: t.Value,
    }
}

