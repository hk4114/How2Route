// 匹配 history 路由
const extractUrlPath = url => /https?:\/\/[^/]+([^?#]*)/.exec(url)[1];

// 维护当前路径 currentPath
const HistoryRouteContext = React.createContext({
  currentPath: "/",
  onPopState: () => { }
});

const HistoryLink = ({ to, ...props }) => {
  // 拦截 a 标签点击事件默认行为， 点击时使用 pushState 修改 URL并更新手动 UI
  // 从而实现点击链接更新 URL 和 UI 的效果。
  return (
    <HistoryRouteContext.Consumer>
      {({ onPopState }) => (
        <a href="" {...props}
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
  )
}

class HistoryRouter extends React.Component {
  state = {
    currentPath: extractUrlPath(window.location.href)
  };

  // 路由变化时，根据路由渲染对应 UI
  onPopState = () => {
    const currentPath = extractUrlPath(window.location.href);
    this.setState({ currentPath });
  };

  componentDidMount() {
    // 监听路由变化
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