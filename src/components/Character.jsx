import React, { Component } from 'react';

import Summary from './Summary.jsx';
// 角色模块
class Character extends Component {
    // loadedCharacter存放角色数据
    state = {
        loadedCharacter: {},
        isLoading: false
    }
    // 当角色id、加载状态改变时，更新组件
    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        return (
            nextProps.selectedChar !== this.props.selectedChar ||
            nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
            nextState.isLoading !== this.state.isLoading
        );
    }
    // 当上一个角色id与现在的id不同时，请求数据
    componentDidUpdate(prevProps) {
        console.log('Component did update');
        if (prevProps.selectedChar !== this.props.selectedChar) {
            this.fetchData();
        }
    }
    // 初次加载，请求数据
    componentDidMount() {
        this.fetchData();
    }
    // 根据id查找角色数据
    fetchData = () => {
        console.log(
            'Sending Http request for new character with id ' + 
            this.props.selectedChar
        );
        // 加载中
        this.setState({ isLoading: true });
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.selectedChar}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Could not fetch person!');
            }
            return response.json();
        })
        .then(charData => {
            const loadedCharacter = {
                id: this.props.selectedChar,
                name: charData.name,
                height: charData.height,
                abilities: charData.abilities,
                baseExperience: charData.base_experience
            };
            // 存放角色信息、加载状态设置为加载完成
            this.setState({ loadedCharacter: loadedCharacter, isLoading: false});
        })
        .catch(err => {
            console.log(err);
        });
    };
    // 组件即将卸载
    componentWillUnmount() {
        console.log('Too soon...');
    }

    render() {
        let content = <p>Loading Character...</p>;
        // 已加载完成且角色id存在时
        if (!this.state.isLoading && this.state.loadedCharacter.id) {
            content = (
                <Summary
                    name={this.state.loadedCharacter.name}
                    gender={this.state.loadedCharacter.gender}
                    height={this.state.loadedCharacter.height}
                    baseExperience={this.state.loadedCharacter.baseExperience}
                    abilities={this.state.loadedCharacter.abilities}
                />
            );
        } else if (!this.state.isLoading && !this.state.loadedCharacter.id) {
            content = <p>Failed to fetch character.</p>;
        }
        return content;
    }
}

export default Character;