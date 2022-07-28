// 匹配 hash 路径
const extractHashPath = url => (/#(.*)$/g.exec(url) || ["", ""])[1];

// 全局维护当前路径
const HashRouteContext = React.createContext({
  currentPath: "/"
});

// 映射：路径 -> 对应组件
const HashRoute = ({ path, render }) => (
  <HashRouteContext.Consumer>
    {({ currentPath }) => currentPath === path && render()}
  </HashRouteContext.Consumer>
);

// 链接 HashLink 绑定到视图。
const HashLink = ({ to, ...props }) => <a {...props} href={"#" + to} />;

// 把路由关键信息传递给子组件，并且在路由发生变化的时候让子组件可以感知到。
class BrowserRouter extends React.Component {
  state = {
    currentPath: extractHashPath(window.location.href)
  };

  onHashChange = e => {
    const currentPath = extractHashPath(e.newURL);
    this.setState({ currentPath });
  };

  componentDidMount() {
    window.addEventListener("hashchange", this.onHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.onHashChange);
  }
  // 通过 Provider 传递下来的 currentPath 拿到当前路径
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
