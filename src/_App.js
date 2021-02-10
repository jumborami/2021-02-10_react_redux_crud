import React, { Component } from 'react';
import BoardForm from './BoardForm';
import BoardItem from './BoardRow';

class App extends Component {
  state = {
    maxNo: 3,
    boards: [
      { brdno: 1,
        brdwriter: 'Lee SunSin', 
        brdtitle: 'If you intend to live then you die',
        brddate: new Date() },
      { brdno: 2,
        brdwriter: 'So SiNo',
        brdtitle: 'Founder for two countries',
        brddate: new Date()
      } 
    ],
    selectedBoard: {}
  }

  handleSaveData = (data) => {
    let boards = this.state.boards;
    if (data.brdno === null || data.brdno === '' || data.brdno === undefined) { // 새로 생성
      this.setState({
        maxNo: this.state.maxNo+1,
        boards: boards.concat({brdno: this.state.maxNo, brddate: new Date(), brdwriter: data.brdwriter, brdtitle: data.brdtitle})
      })
    } else { // 수정
      this.setState({ 
        boards: boards.map(row => data.brdno === row.brdno ? {...data}: row)
      })
    }
  }

  handleSelectRow = (row) => {
    this.setState({selectedBoard: row});
  }

  handleRemove = (brdno) => {
    this.setState({
      boards: this.state.boards.filter(row => row.brdno !== brdno) // brdno와 state에 있는 brdno의 값을 비교해서 같지 않은 것들만 걸러서 배열로 만듦
    })
  }

  render() {
    const { boards, selectedBoard } = this.state;

    return (
      <div>
        <BoardForm selectedBoard={selectedBoard} onSaveData={this.handleSaveData}/>
        <table border="1">

            {
                boards.map(row =>
                    (<BoardItem key={row.brdno} row={row} onRemove={this.handleRemove} onSelectRow={this.handleSelectRow} />)
                )
            }

        </table>
      </div>
    );
  }
}

export default App;
