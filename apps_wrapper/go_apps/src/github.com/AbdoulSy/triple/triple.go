package triple

//UriType is a wrapper structure around a uri
//TODO: find a uri package to expand the uri definition
type UriType struct {
	Protocol string
	Host string
	Location string
	FullUri string
}


//SubjectType is a structure holding subjects
type SubjectType struct {
	ShortPrefix string
	Prefix UriType
	Name string
}

//PredicateType is a structure holding predicates
type PredicateType struct {
	ShortPrefix string
	Prefix UriType
	Name string
}


//Triple structure holding triples
type Triple struct {
	Subject SubjectType
	Predicate PredicateType
	Object ObjectType
}

//Triple builder structure
type TripleBuilder struct {
	Value interface{}
}


//Build Triple builds a Triple from a subject a predicate and an object structures
func BuildTriple(s SubjectType, p PredicateType, o ObjectType) (t TripleType, err Error){
    t := TripleType {
      Subject: s,
      Predicate: p,
      Object: o
    }
    return
}

func BuildTripleForObjectString(s SubjectType, p PredicateType, o string) (t TripleType, err Error) {
    newObjectBuilder := TripleBuilder {
      Value: o,
    }

    newObject, err := newObjectBuilder.buildObjectValue()
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
    newPredicate, predicateError := predicateBuilder.buildPredicateValue()
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


