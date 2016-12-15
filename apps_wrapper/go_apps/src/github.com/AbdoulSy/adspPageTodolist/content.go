package adspPageTodolist

//Directory is the struct representation of a directory concept
type Directory struct {
	Root string
	Dirs []DirsType
}

type TagType struct {
	Title string
	Value string
}

type MetaOfDocumentedType struct {
	Lineno int
	Path string
	Code interface{}
	Vars interface{}
}

type Documentation struct {
	Longname string
	Kind interface{}
	Scope interface{}
	Params []interface{}
	Todo []string
	Author []string
	Memberof interface{}
	Meta MetaOfDocumentedType
	Comment string
	Name interface{}
	Type interface{}
	Undocumented bool
}

//FileHolder is the structure holding both the document and the File'
type FileHolder struct {
	Doc   []Documentation
	Todos []File
	Project_Path string
	Adsp_type string
	Adsp_shortType string
	Adsp_in_project string
	Adsp_parent_project string
	Hints interface{}
}

//File is the struct representation of a File concept
type File struct {
	Kind        string
	Ref         string
	Line   		int
	Text        string
	File        string
}

//DirsType is the struct representation of the Array of directory Concepts
type DirsType struct {
	Name, Mtime string
}

//Content is the struct representation of the Content Concept
type T struct {
	WalkStart   int
	WalkEnd     int
	WalkTime    string
	Directories []Directory
	Files       []FileHolder
}
