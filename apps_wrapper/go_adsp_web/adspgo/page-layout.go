package adspgo

//PageLayout structure holding the pageLayout Elements
type PageLayout struct {
	Contents string
	Styles   CSSLinks
	Scripts  JsScripts
	Logo     LogoType
	Nav      NavType
	Page     PageType
	Errors   []ErrorType
}
