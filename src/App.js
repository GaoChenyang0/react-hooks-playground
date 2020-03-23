import React, { useState } from "react";
import CharPicker from "./components/CharPicker";
import Character from "./components/Character";

const App = props => {
  // 定义state，setState方法 和 初始值
  const [selectedCharacter, setSelectCharacter] = useState(1);
  const [side, setSide] = useState("red");
  const [destoryed, setDestoryed] = useState(false);

  // 控制颜色
  const sideHandler = side => {
    setSide(side);
  };
  // 控制角色选择
  const charSelectHandler = event => {
    const charId = event.target.value;
    setSelectCharacter(charId);
  };
  // 控制摧毁
  const destructionHandler = () => {
    setDestoryed(true);
  };

  let content = (
    // <></>是<React.Fragment></React.Fragment>的语法糖
    <React.Fragment>
      {/* 角色选择模块 */}
      <CharPicker
        side={side}
        selectedChar={selectedCharacter}
        onCharSelect={charSelectHandler}
      />
      {/* 角色展示模块 */}
      <Character selectedChar={selectedCharacter} />
      <button onClick={sideHandler.bind(this, "red")}>Red Light</button>
      <button onClick={sideHandler.bind(this, "blue")}>Blue Light</button>
      {/* 颜色为蓝色时，显示摧毁按钮 */}
      {side === "blue" && (
        <button onClick={destructionHandler}>DESTORY!</button>
      )}
    </React.Fragment>
  );
  // 状态为已摧毁时，显示“全部摧毁”
  if (destoryed) {
    content = <h1>Total destruction!</h1>;
  }
  return content;
};

export default App;
