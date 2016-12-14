package adspRdf

//Triple structure holding triples
type Triple struct {
	Subject SubjectType
	Predicate PredicateType
	Object ObjectType
}

//Build Triple builds a Triple from a subject a predicate and an object structures
func BuildTriple(s SubjectType, p PredicateType, o ObjectType) (t TripleType, err Error){
    g := TripleType {
      Subject: s,
      Predicate: p,
      Object: o
    }
    newTripleBuilder := TripleElementBuilder {
      Value: g,
    }

    t , err := newTripleBuilder.BuildTriple();

    return
}

func BuildTripleForObjectString(s SubjectType, p PredicateType, o string) (t TripleType, err Error) {
    newObjectBuilder := TripleElementBuilder {
      Value: o,
    }

    newObject, err := newObjectBuilder.buildObjectValue(s, p);
    if err != nil {
      log.Println(err);
      return
    }
    t := TripleType {
      Subject: s,
      Predicate: p,
      Object: newObject
    }

    return
}

func BuildTripleForPredicateAndObjectString(s SubjectType, p string, o string) (t TripleType, err Error) {

    predicteBuilder = TripleBuilder {
      Value: p,
    }
    newPredicate, predicateError := predicateBuilder.buildPredicateValue(s);
    t, err := BuildTripleForObjectString(s, newPredicate, o);
    if err != nil {
      log.Println(err);
    }

    return;
}

func BuildTripleForSubjectPredicateAndObjectString(s string, p string, o string) (t TripleType, err Error) {

    subjectBuilder = TripleBuilder {
      Value: s,
    }
    newSubject , subjectError := subjectBuilder.BuildSubjectValue();

    if subjectErr != nil {
      log.Println(subjectErr);
      return
    }
    t, err := BuildTripleForPredicateAndSubjectString(newSubject, p, o);

    if err != nil {
      log.Println(err);
      return
    }

    return

}


