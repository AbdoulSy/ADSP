package adspRdf

type TripleElement {
}

//Triple builder structure
type TripleElementBuilder struct {
    Value interface{}
}


func (t TripleElementBuilder) buildObjectValue () (v ObjectType){
    switch t.Value.Type {
        case UriType:
            return &ObjectType{
                Name: t.Value.Name,
                Prefix: t.Value.Prefix,
                ShortPrefix: t.value.Prefix,
                Value: t.Value
            }
        default:
            return &ObjectType{
                Value: t.Value,
            }
    }
}

func (t TripleElementBuilder) buildPredicateValue () (v PredicateType){
    return &PredicateType{
        Name: t.Value.Name,
        Prefix: t.Value.Prefix,
        ShortPrefix: t.value.Prefix,
        Value: t.Value
    }
}

func (t TripleElementBuilder) BuildSubjectValue () (v Subjectype){
    return &PredicateType{
        Name: t.Value.Name,
        Prefix: t.Value.Prefix,
        ShortPrefix: t.value.Prefix,
        Value: t.Value
    }
}

