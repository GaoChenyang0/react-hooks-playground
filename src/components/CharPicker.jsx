import React, { useState } from "react";

import "./CharPicker.css";
// 角色选择组件
const CharPicker = props => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // // 加载完成后请求数据
  // componentDidMount() {
  //   // 加载时状态为isLoading
  //   setIsLoading(true);
  //   fetch("https://pokeapi.co/api/v2/pokemon/")
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch.");
  //       }
  //       return response.json();
  //     })
  //     .then(charData => {
  //       // 截取前5条数据
  //       const selectedCharacters = charData.results.slice(0, 5);
  //       setCharacters(selectedCharacters.map((char, index) => ({
  //         name: char.name,
  //         id: index + 1
  //       })));
  //       setIsLoading(false);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // }

  let content = <p>Loading characters...</p>;
  // 加载完成，角色数据存在且数据不为空时，显示select框
  if (!isLoading && characters && characters.length > 0) {
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {characters.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (
    // 加载已完成，角色数据对象不存在，或是对象为空时
    !isLoading &&
    (!characters || characters.length === 0)
  ) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default CharPicker;
