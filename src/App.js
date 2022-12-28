import { useEffect, useState } from 'react';
import './App.css';
import {v4 as uuidv4} from 'uuid';
import Editor from './components/Editor/Editor';
import Item from './components/Item/Item';
import List from './components/List/List';
import Menu from './components/Menu/Menu';
import Panel from './components/Panel/Panel';
import Preview from './components/Preview/Preview';
import useDocumentTitle from './components/DocumentTitle/useDocumentTitle';
import ItemsContext from './components/ItemsContext/ItemsContext';


function App() {

  const [items, setItems] = useState([]);
  const [copyitems, setCopyItems] = useState([]);
  const [actualIndex, setActualIndex] = useState(-1);

  let textTitle = copyitems[actualIndex]?.title;
  useDocumentTitle(textTitle, 'Notes')

  const handleClick = () => {
    const note = {
      id: uuidv4,
      title: '',
      text: '',
      pinned: false,
      created: Date.now()
    }

    let notes = [...items];
    notes.unshift(note);
    let res = getOrderedNotes(notes);
    setItems(res);
    setCopyItems(res);
    
  }

  const sortByDate = (arr, asc = false) => {

    if(asc){
      return arr.sort((a, b) => new Date(b.created) - new Date(a.created));

    }
    return arr.sort((a, b) => new Date(a.created) - new Date(b.created));
    
  }

  const getOrderedNotes = (arr) => {
    let items = [...arr];
    let pinnedTrue = items.filter(i => i.pinned === true);
    let pinnedFalse = items.filter(i => i.pinned === false);

    pinnedTrue = sortByDate(pinnedTrue, true);
    pinnedFalse = sortByDate(pinnedFalse);

    return [...pinnedTrue, ...pinnedFalse];
  }

  const handlePinned = (item, index) => {

    setActualIndex(index);
    let id = item.id;
    let notes = [...items];
    notes[index].pinned = !notes[index].pinned;

    let res = getOrderedNotes(notes);
    setItems(res);
    setCopyItems(res);
    let newIndex = res.findIndex(i => i.id === id);
    setActualIndex(newIndex);

  }

  const handleSelectNote = (item, e) => {
    if(!e.target.classList.contains('note')) return;

    const index = items.findIndex(i => i === item);
    setActualIndex(index)

  }

 const changeTitle = (e) => {
  const title = e.target.value;
  let notes = [...items];
  notes[actualIndex].title = title;
  setItems(notes);
  setCopyItems(notes);

 }

 const changeText = (e) => {
  const text = e.target.value;
  let notes = [...items];
  notes[actualIndex].text = text;
  setItems(notes);
  setCopyItems(notes);
 }

 const handleSearch = (e) => {

  const query = e.target.value;
  if(query === ''){
    setCopyItems([...items]);
  }else{
    
    let res = items.filter(item => item.title.indexOf(query) >= 0 ||  item.text.indexOf(query) >= 0);
    
    if(res.length === 0){
      setActualIndex(-1)
    }else{
      setCopyItems([...res]);
      setActualIndex(0);
    }
    
    
  }

 }


  return (
    <div className='App container'>
      <Panel>
        <ItemsContext.Provider value={{handleClick, handleSearch}}>
          <Menu/>
        </ItemsContext.Provider>
        <List>
            {
              copyitems.map((item, i) => 
                <Item item={item} key={item.id} index={i} handlePinned={handlePinned} handleSelectNote={handleSelectNote} actualIndex={actualIndex}/>
              )
            }
        </List>
      </Panel>

      {
        actualIndex >= 0 ?
        <>
          <Editor item={copyitems[actualIndex]} changeText={changeText} changeTitle={changeTitle}/>
          <Preview text={copyitems[actualIndex].text}/>
        </>
        :
        ''
        
      }
    </div>
  );
}

export default App;
