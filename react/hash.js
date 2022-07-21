const HashRouteContext = React.createContext({
  currentPath: "/"
});

const HashRoute = ({ path, render }) => (
  <HashRouteContext.Consumer>
    {({ currentPath }) => currentPath === path && render()}
  </HashRouteContext.Consumer>
);

const HashLink = ({ to, ...props }) => <a {...props} href={"#" + to} />;

class BrowserRouter extends React.Component {
  state = {
    currentPath: extractHashPath(window.location.href)
  };

  onHashChange = e => {
    const currentPath = extractHashPath(e.newURL);
    console.log("onHashChange:", currentPath);
    this.setState({ currentPath });
  };

  componentDidMount() {
    window.addEventListener("hashchange", this.onHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.onHashChange);
  }

  render() {
    return (
      <HashRouteContext.Provider value={{ currentPath: this.state.currentPath }}>
        {this.props.children}
      </HashRouteContext.Provider>
    );
  }
}


ReactDOM.render(
  <BrowserRouter>
    <ul>
      <li>
        <HashLink to="/home">home</HashLink>
      </li>
      <li>
        <HashLink to="/about">about</HashLink>
      </li>
    </ul>

    <HashRoute path="/home" render={() => <h2>hash Home</h2>} />
    <HashRoute path="/about" render={() => <h2>hash About</h2>} />
  </BrowserRouter>,
  document.querySelector(".react.hash .container")
);
