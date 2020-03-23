import React, { Component } from "react";

import "./CharPicker.css";
// 角色选择组件
class CharPicker extends Component {
  state = {
    characters: [],
    isLoading: false
  };
  // 加载完成后请求数据
  componentDidMount() {
    // 加载时状态为isLoading
    this.setState({ isLoading: true });
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then(charData => {
        // 截取前5条数据
        const selectedCharacters = charData.results.slice(0, 5);
        this.setState({
          characters: selectedCharacters.map((char, index) => ({
            name: char.name,
            id: index + 1
          })),
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let content = <p>Loading characters...</p>;
    // 加载完成，角色数据存在且数据不为空时，显示select框
    if (
      !this.state.isLoading &&
      this.state.characters &&
      this.state.characters.length > 0
    ) {
      content = (
        <select
          onChange={this.props.onCharSelect}
          value={this.props.selectedChar}
          className={this.props.side}
        >
          {this.state.characters.map(char => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      );
    } else if (// 加载已完成，角色数据对象不存在，或是对象为空时
      !this.state.isLoading &&
      (!this.state.characters || this.state.characters.length === 0)
    ) {
      content = <p>Could not fetch any data.</p>;
    }
    return content;
  }
}

export default CharPicker;
