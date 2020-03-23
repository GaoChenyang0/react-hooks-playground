import React, { Component } from 'react';
import CharPicker from './components/CharPicker';
import Character from './components/Character';

class App extends Component {
  // 状态有 角色id 主题颜色 是否摧毁
  state = {
    selectedCharacter: 1,
    side: 'red',
    destoryed: false
  };
  // 控制颜色
  sideHandler = side => {
    this.setState({ side: side });
  };
  // 控制角色选择
  charSelectHandler = event => {
    const charId = event.target.value;
    this.setState({ selectedCharacter: charId });
  };
  // 控制摧毁
  destructionHandler = () => {
    this.setState({ destoryed: true });
  };

  render() {
    let content = (
      // <></>是<React.Fragment></React.Fragment>的语法糖
      <React.Fragment>
        {/* 角色选择模块 */}
        <CharPicker
          side={this.state.side}
          selectedChar={this.state.selectedCharacter}
          onCharSelect={this.charSelectHandler}
        />
        {/* 角色展示模块 */}
        <Character selectedChar={this.state.selectedCharacter} />
        <button onClick={this.sideHandler.bind(this, 'red')}>
          Red Light
        </button>
        <button onClick={this.sideHandler.bind(this, 'blue')}>
          Blue Light
        </button>
        {/* 颜色为蓝色时，显示摧毁按钮 */}
        {this.state.side === 'blue' && (
          <button onClick={this.destructionHandler}>DESTORY!</button>
        )}
      </React.Fragment>
    );
    // 状态为已摧毁时，显示“全部摧毁”
    if(this.state.destoryed) {
      content = <h1>Total destruction!</h1>
    }
    return content;
  }
}

export default App;
