import React, { useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import New from "./pages/New";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((i) => i.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((i) =>
        i.id === action.data.id ? { ...action.data } : i
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DairyDispatchContext = React.createContext();

const dummy = [
  {
    id: 1,
    emotion: 1,
    content: "오늘의 일기 1",
    date: 1664591937084,
  },
  {
    id: 2,
    emotion: 2,
    content: "오늘의 일기 2",
    date: 1664591937085,
  },
  {
    id: 3,
    emotion: 3,
    content: "오늘의 일기 3",
    date: 1664591937086,
  },
  {
    id: 4,
    emotion: 4,
    content: "오늘의 일기 4",
    date: 1664591937087,
  },
  {
    id: 5,
    emotion: 5,
    content: "오늘의 일기 5",
    date: 1664591937088,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummy);
  const dataId = useRef(0);

  // CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  // REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  // EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DairyDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DairyDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
