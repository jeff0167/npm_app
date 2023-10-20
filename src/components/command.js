import { useState } from "react";
import "../App.css";
import { Popover, PopoverHandler, PopoverContent, Button } from "@material-tailwind/react";

function Command({Command, PropsButton}) {
    const [openPopover, setOpenPopover] = useState(false);
    
  const copied = () =>{
    setTimeout(() => {
      setOpenPopover(true);  // some cheap pop-up animation 
    }, 100);
    setTimeout(() => {
      setOpenPopover(false);
    }, 1000);
  }

    return (
  
    <div className="Inline">
      <div className="Command" onClick={() => {navigator.clipboard.writeText(Command); copied();}}>  
        <h1 className="CommandText">{Command}</h1>
          <Popover open={openPopover} placement="top-end">
          <PopoverHandler>
            <Button className="Invisible"></Button>
          </PopoverHandler>
          <PopoverContent className="Popup">
          <div>
            <h3>Copied to clipboard</h3>
          </div>
          </PopoverContent>
        </Popover>
        
      </div>
      {PropsButton}
    </div>
    );
  }
  
  export default Command;