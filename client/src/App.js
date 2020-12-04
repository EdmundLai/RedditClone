//import logo from "./logo.svg";
import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

//import ResponsiveDrawer from "./components/ResponsiveDrawer/ResponsiveDrawer";
import ContentFeed from "./components/ContentFeed/ContentFeed";

import RequestHandler from "./components/RequestHandler/RequestHandler";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: null };

    this.updateStateFromScroll = this.updateStateFromScroll.bind(this);
  }

  async componentDidMount() {
    const data = await RequestHandler.getTestUsersPosts();

    this.setState({ data: data });
  }

  async updateStateFromScroll(category) {
    const categoryPosts = await RequestHandler.getMorePosts(category);

    let updated = true;

    this.setState((prevState) => {
      let newData = Object.assign({}, prevState.data);

      const index = prevState.data.categories.findIndex(
        (categoryObj) => categoryObj.category === category
      );

      if (prevState.data.categories[index].length === categoryPosts.length) {
        updated = false;
      }

      newData.categories[index] = categoryPosts;

      return {
        data: newData,
      };
    });

    return updated;
  }

  render() {
    //console.log(this.state.data);

    return (
      <div className="App">
        <CssBaseline />
        <Container minWidth="sm" maxWidth="xl">
          <ContentFeed
            data={this.state.data}
            updateCallback={this.updateStateFromScroll}
          />
        </Container>
      </div>
    );
  }
}

export default App;