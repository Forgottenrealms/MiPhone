import React, { Component } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom'
import { AppFrame } from './components'

import routes from './routes';

class App extends Component {
  render() {
    return (
      <AppFrame>
        <Switch>
          {
            routes.map(item => {
              // console.log(item)
              // console.log(this.props.match.path)
              return (
                <Route 
                  path={`${this.props.match.path}${item.path}`}
                  key={`${this.props.match.path}${item.path}`}
                  component={item.component}
                />
              )
            })
          }
          <Redirect to={`${this.props.match.path}/dashboard`} from="/admin" exact/>
          <Redirect to="/404" />
        </Switch>
      </AppFrame>
    );
  }
}

export default App;
