package error

type T struct {
	ErrCode    string
	ErrTitle   string
	Message    string
	StackTrace []string
}
