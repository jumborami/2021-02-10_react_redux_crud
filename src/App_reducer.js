const BOARD_SAVE = 'SAVE';
const BOARD_REMOVE = 'REMOVE';
const BOARD_READ = 'ONE';
const BOARD_LIST = 'LIST';

export const board_save = (data) => ({
  type: BOARD_SAVE,
  data
})

export const board_remove = (brdno) => ({
  type: BOARD_REMOVE,
  brdno: brdno
})

export const board_read = (brdno) => ({
  type: BOARD_READ,
  brdno: brdno
})

export const board_list = () => ({ type: BOARD_LIST })


const initialState = {
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
};


export default function board_reducer(state = initialState, action) {
  let boards = state.boards;

  switch(action.type) {
    case BOARD_SAVE:
      let data = action.data;
      let maxNo = state.maxNo;
      if(!data.brdno) { // new: Insert
        return { maxNo: maxNo+1, boards: boards.concat({...data, brdno: maxNo, brddate: new Date()}), selectedBoard: {} };
      }
      return {...state, boards: boards.map(row => data.brdno === row.brdno ? {...data } : row), selectedBoard: {} };
    case BOARD_REMOVE:
      return {...state, boards: boards.filter(row => row.brdno !== action.brdno), selectedBoard: {} };
    case BOARD_rEAD:
      return {
        ...state,
        selectedBoard: boards.find(row => row.brdno === action.brdno)
      };
    default:
      return state;
  }
}






// App_reducer.js 파일은 Redux의 reducer로 다음과 같이 데이터 관리와 관련된 기능을 구현해 둔다.

// 출처: https://forest71.tistory.com/184?category=683254 [SW 개발이 좋은 사람]