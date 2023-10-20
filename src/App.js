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

  const commandList = commands.map((command, id) =>
    <Command Command={command.command} key={id} PropsButton={<button className='Button' onClick={()=> deleteCommand(command.id)}>Delete</button>}></Command>
  );

  return (
    <div className="App">
      <header className="App-header">
        <div className='AddCommand'>
          <input placeholder='command' onChange={(e)=> setCommand(e.target.value)} value={_command} autoFocus></input>
          <input placeholder='tag' onChange={(e)=> setTag(e.target.value)} value={_tag}></input>
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
