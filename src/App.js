import React, { Component } from 'react';
import CharPicker from './components/CharPicker';
import Character from './components/Character';

class App extends Component {
  state = {
    selectedCharacter: 1,
    side: 'red',
    destoryed: false
  };

  sideHandler = side => {
    this.setState({ side: side });
  };

  charSelectHandler = event => {
    const charId = event.target.value;
    this.setState({ selectedCharacter: charId });
  };

  destructionHandler = () => {
    this.setState({ destoryed: true });
  };

  render() {
    let content = (
      // <></>是<React.Fragment></React.Fragment>的语法糖
      <React.Fragment>
        <CharPicker
          side={this.state.side}
          selectedChar={this.state.selectedCharacter}
          onCharSelect={this.charSelectHandler}
        />
        <Character selectedChar={this.state.selectedCharacter} />
        <button onClick={this.sideHandler.bind(this, 'red')}>
          Red Light
        </button>
        <button onClick={this.sideHandler.bind(this, 'blue')}>
          Blue Light
        </button>
        {this.state.side === 'blue' && (
          <button onClick={this.destructionHandler}>DESTORY!</button>
        )}
      </React.Fragment>
    );

    if(this.state.destoryed) {
      content = <h1>Total destruction!</h1>
    }
    return content;
  }
}

export default App;
