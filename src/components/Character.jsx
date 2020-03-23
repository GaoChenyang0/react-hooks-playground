import React, { useState, useEffect } from "react";

import Summary from "./Summary.jsx";
// 角色模块
const Character = props => {
  // loadedCharacter存放角色数据
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // 根据id查找角色数据
  const fetchData = () => {
    console.log(
      "Sending Http request for new character with id " + props.selectedChar
    );
    // 加载中
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.selectedChar}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Could not fetch person!");
        }
        return response.json();
      })
      .then(charData => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          abilities: charData.abilities,
          baseExperience: charData.base_experience
        };
        // 存放角色信息、加载状态设置为加载完成
        setLoadedCharacter(loadedCharacter);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  // // 当角色id、加载状态改变时，更新组件
  // shouldComponentUpdate(nextProps, nextState) {
  //     console.log('shouldComponentUpdate');
  //     return (
  //         nextProps.selectedChar !== props.selectedChar ||
  //         nextState.loadedCharacter.id !== loadedCharacter.id ||
  //         nextState.isLoading !== isLoading
  //     );
  // }
  // 使用useEffect替换componentDidUpdate方法
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.selectedChar]);

  // // 组件即将卸载
  // componentWillUnmount() {
  //     console.log('Too soon...');
  // }

  let content = <p>Loading Character...</p>;
  // 已加载完成且角色id存在时
  if (!isLoading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        baseExperience={loadedCharacter.baseExperience}
        abilities={loadedCharacter.abilities}
      />
    );
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default Character;
