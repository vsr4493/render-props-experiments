import React from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

const WithContext = ({ children }) => {
  const Wrapper = class extends React.Component {
    static contextTypes = {
      name: PropTypes.string
    }
    render() {
      const name = this.context.name;
      return children({ name });
    }
  }
  return <Wrapper/>;
}

class Test extends React.Component{
  static childContextTypes = {
    name: PropTypes.string
  }
  getChildContext(){
    return {
      name: "Vorcan"
    };
  }
  render(){
    return (
      <div>
        <WithContext>
          {
            ({name}) => (<div> {name} </div>)
          }
        </WithContext>
      </div>
    );
  }
}

class Mouse extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  }
  
  constructor(){
    super();
    this.state = {
      x: 0,
      y: 0
    }
  }

  handleMouseMove = (e) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    });
  }

  render(){
    return(
      <div style={{height:"100vh", width: "100%"}} onMouseMove={this.handleMouseMove}>
        {this.props.children(this.state)}
      </div>
    );
  }
}


const App = () => (
  <div style={styles}>
    <Test></Test>
    <Mouse>
      {
        ({x,y}) => (
          <div className="container-fluid">
            <hr/>
            <div className="btn btn-primary">X is at {x}</div>
            <hr/>
            <div className="btn btn-success">Y is at {y}</div>
          </div>
        )
      }
    </Mouse>
  </div>
);

render(<App />, document.getElementById('root'));
