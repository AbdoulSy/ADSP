package adspgo

//Directory is the struct representation of a directory concept
type Directory struct {
	Root string
	Dirs []DirsType
}

//File is the struct representation of a File concept
type File struct {
	Description string
	Author      interface{}
	Project     interface{}
	Milestone   interface{}
	TODO        interface{}
	File        string
}

//DirsType is the struct representation of the Array of directory Concepts
type DirsType struct {
	Name, Mtime string
}

//Content is the struct representation of the Content Concept
type Content struct {
	WalkStart   int
	WalkEnd     int
	WalkTime    string
	Directories []Directory
	Files       []File
}
