package adspRdf

import (
  "log"
)

//Triple structure holding triples
type Triple struct {
	Subject SubjectType
	Predicate PredicateType
	Object ObjectType
}

//Build Triple builds a Triple from a subject a predicate and an object structures
func BuildTriple(s SubjectType, p PredicateType, o ObjectType) (t Triple, err error){
    g := Triple {
      Subject: s,
      Predicate: p,
      Object: o,
    }
    newTripleBuilder := TripleElementBuilder {
      Value: g,
    }

    t  = newTripleBuilder.BuildTriple();

    return
}

func BuildTripleForObjectString(s SubjectType, p PredicateType, o string) (t Triple, err error) {
    newObjectBuilder := TripleElementBuilder {
      Value: o,
    }

    newObject := newObjectBuilder.buildObjectValue();

    t = Triple {
      Subject: s,
      Predicate: p,
      Object: newObject,
    }

    return
}

func BuildTripleForPredicateAndObjectString(s SubjectType, p string, o string) (t Triple, err error) {

    predicateBuilder := TripleElementBuilder {
      Value: p,
    }
    newPredicate := predicateBuilder.buildPredicateValue();
    t, err = BuildTripleForObjectString(s, newPredicate, o);
    if err != nil {
      log.Println(err);
    }

    return;
}

func BuildTripleForSubjectPredicateAndObjectString(s string, p string, o string) (t Triple, err error) {

    subjectBuilder := TripleElementBuilder {
      Value: s,
    }
    newSubject := subjectBuilder.BuildSubjectValue();
    t, err = BuildTripleForPredicateAndObjectString(newSubject, p, o);

    if err != nil {
      log.Println(err);
      return
    }

    return

}


