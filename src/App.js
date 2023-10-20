import { useEffect, useState } from 'react';
import './App.css';
import { db } from './config/firebase';
import Command from './components/command';
import { getDocs, addDoc, deleteDoc, doc, collection } from "firebase/firestore"
//import { Auth } from './components/auth';

function App() {
  const [commands, setCommands] = useState([]);
  const [_command, setCommand] = useState("");
  const [_tag, setTag] = useState("");
  const [filter, setFilter] = useState("");

  const commandsCollectionRef = collection(db, "commands");

  const getCommands = async () =>{
    const data = await getDocs(commandsCollectionRef);
    const filteredData = data.docs.map(doc => ({...doc.data(), id: doc.id}));
    //console.log(data.docs);
    setCommands(filteredData);
  }

  useEffect(()=>{
    getCommands();
  }, [])

  const addCommand = async () =>{
      if(_command == "" || _tag == "") return;

      await addDoc(commandsCollectionRef, {command: _command, tag: _tag});
      setCommand("");
      setTag("");
      getCommands();
  }

  const deleteCommand = async (id) =>{
      const commandDoc = doc(db, "commands", id);
      await deleteDoc(commandDoc);
      getCommands();
  }

  // just need to also be able to search by Tag, but by command is alright also, would want to potentially just categorize all the items like a toggle
  // then you would navigate to the correct section for the information your searching for
  const commandList = commands.filter(command => command.command.includes(filter) || filter === '').map((command, id) =>
    <Command Command={command.command} key={id} PropsButton={<button className='Button' onClick={()=> deleteCommand(command.id)}>X</button>}></Command>
  );

  return (
    <div className="App">
      <header className="App-header">
        <div className='AddCommand'>
          <input className='Search' placeholder='Search' onChange={(e)=> setFilter(e.target.value)} value={filter} autoFocus></input>
          
          <input placeholder='Command' onChange={(e)=> setCommand(e.target.value)} value={_command}></input>
          <input placeholder='Tag' onChange={(e)=> setTag(e.target.value)} value={_tag}></input>
          <button className='Button' onClick={()=> addCommand()}>Add npm command</button>
        </div>
        <div className='CommandList'>
          {commandList}
        </div>
      </header>
    </div>
  );
}

export default App;
