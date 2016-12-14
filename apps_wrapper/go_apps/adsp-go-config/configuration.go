package adspgoConfig

type Config struct {
    ID string
    Title string
    Description string
}

func Configuration (value string) (currentConf Config) {
    switch value {
    case "HOME":
        currentConf = Config {
            ID: "aria-abdoulsy-eu/adsp/home",
            Title: "The Home Page",
            Description: "The Dashboard",
        }
    case "PROJECTS":
        currentConf = Config {
            ID: "aria-abdoulsy-eu/adsp/projects",
            Title: "The Projects Page",
            Description: "The page to manage projects",
        }
    case "VISUALISATION":
        currentConf = Config {
            ID: "aria-abdoulsy-eu/adsp/visualisation",
            Title: "The Visualisation Page",
            Description: "Navigate files like a Graph",
        }
    }

    return


}
