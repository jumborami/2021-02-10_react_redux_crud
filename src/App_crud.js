import React, { Component } from 'react'; 


class App extends Component { 
  constructor(props) {
    super(props);
    this.child = React.createRef();
  }
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
    ] 
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
    this.child.current.handleSelectRow(row);
  }

  handleRemove = (brdno) => {
    this.setState({
      boards: this.state.boards.filter(row => row.brdno !== brdno) // brdno와 state에 있는 brdno의 값을 비교해서 같지 않은 것들만 걸러서 배열로 만듦
    })
  }
  
  render() { 
    const { boards } = this.state; 
    //const list = boards.map(function(row){ 
    //  return row.brdno + row.brdwriter ; 
    //}); 
    
    return ( 
      <div> 
        <BoardForm onSaveData={this.handleSaveData} ref={this.child} />
        <table border="1">
          <tbody>
            <tr align="center">
              <td width="50">No.</td>
              <td width="300">Title</td>
              <td width="100">Name</td>
              <td width="100">Date</td>
            </tr>
            {
              boards.map(row =>
                  ( <BoardItem key={row.brdno} row={row} onRemove={this.handleRemove} onSelectRow={this.handleSelectRow} /> )
                )
            }
          </tbody>
        </table>
      </div> 
    );
  } 
}

class BoardItem extends Component {
  handleSelectRow = () => {
    const { row, onSelectRow } = this.props;
    onSelectRow(row);
  }

  handleRemove = () => {
    const { row, onRemove } = this.props;
    onRemove(row.brdno);
  }
  render() {
    console.log(this.props.row.brdno);
    return(
      <tr>
        <td>{this.props.row.brdno}</td>
        <td><a onClick={this.handleSelectRow}>{this.props.row.brdtitle}</a></td>
        <td>{this.props.row.brdwriter}</td>
        <td>{this.props.row.brddate.toLocaleDateString('ko-KR')}</td>
        <td><button onClick={this.handleRemove}>X</button></td> 
      </tr>
    )
  }
}

class BoardForm extends Component {
  state = {
    brdwriter: '',
    brdtitle: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value  // e는 자바스크립트의 change 이벤트에서 파라미터로 넘어오는 event 를 의미하고 여기서 e.target 은 현재 이벤트가 발생한 개체로, 값을 입력하는 입력상자를 의미한다.
    })
  }

  handleSelectRow = (row) => {
    this.setState(row);
  }

  handleSubmit = (e) => {
    e.preventDefault(); // 실제 서버로 보낼 것이 아니므로 preventDefault 로 이벤트를 중지한다.
    this.props.onSaveData(this.state);
    this.setState({
      brdwriter: '',
      brdtitle: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder='title' name='brdtitle' value={this.state.brdtitle} onChange={this.handleChange} />
        <input placeholder='writer' name='brdwriter' value={this.state.brdwriter} onChange={this.handleChange} />
        <button type="submit">Save</button>
      </form>
    )
  }

}

export default App;



//사용자가 선택한 행을 부모에게 알리고, 부모는 이것을 받아서 입력 폼으로 전송하는 방식으로 구현하였다.

//사용자가 입력을 완료하고 저장하면, 다시 입력한 내용을 부모에게 전송해서 부모의 state 변수에 저장한다.

//정리하면, 데이터 저장소(state)가 부모(App.js)에게 있기 때문에 항상 부모를 거쳐서 모든 기능이 구현되어야 한다.



//출처: https://forest71.tistory.com/184?category=683254 [SW 개발이 좋은 사람]