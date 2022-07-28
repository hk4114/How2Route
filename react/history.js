
const HistoryRouteContext = React.createContext({
  currentPath: "/",
  onPopState: () => { }
});

const HistoryRoute = ({ path, render }) => (
  <HistoryRouteContext.Consumer>
    {({ currentPath }) => currentPath === path && render()}
  </HistoryRouteContext.Consumer>
)

const HistoryLink = ({ to, ...props }) => (
  <HistoryRouteContext.Consumer>
    {({ onPopState }) => (
      <a
        href=""
        {...props}
        onClick={e => {
          // 阻止默认行为
          e.preventDefault();
          // 更新 URL
          window.history.pushState(null, "", to);
          // 更新 UI
          onPopState();
        }}
      />
    )}
  </HistoryRouteContext.Consumer>
);

class HistoryRouter extends React.Component {
  state = {
    currentPath: extractUrlPath(window.location.href)
  };

  onPopState = () => {
    const currentPath = extractUrlPath(window.location.href);
    console.log("onPopState:", currentPath);
    this.setState({ currentPath });
  };

  componentDidMount() {
    window.addEventListener("popstate", this.onPopState);
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.onPopState);
  }

  render() {
    return (
      <HistoryRouteContext.Provider value={{currentPath: this.state.currentPath, onPopState: this.onPopState}}>
        {this.props.children}
      </HistoryRouteContext.Provider>
    );
  }
}

ReactDOM.render(
  <HistoryRouter>
    <ul>
      <li>
        <HistoryLink to="/home">home</HistoryLink>
      </li>
      <li>
        <HistoryLink to="/about">about</HistoryLink>
      </li>
    </ul>
    <HistoryRoute path="/home" render={() => <h2>History Home</h2>} />
    <HistoryRoute path="/about" render={() => <h2>History About</h2>} />
  </HistoryRouter>,
  document.querySelector(".react.history .container")
);