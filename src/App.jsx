import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(10);
  const [numberAllow, setnumberAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef=useRef(null);

  const passwordGenerator=useCallback(()=>{
    let pass="",str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllow){
      str+="0123456789"
    }
    if(charAllow){
      str+="!@#$%^&*()/*-+.{}?[]|_-"
    }
    for (let i = 1; i <=length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char);
    }
    
  setpassword(pass);
  },[length,numberAllow,charAllow, setpassword])

  const copyToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,36)
    window.navigator.clipboard.writeText(password);

  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllow,charAllow,passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-9 py-5 my-5 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center py-2'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
          value={password}
          className='outline-none w-full py-1 px-3' 
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={35} 
          value={length} className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label className='px-3'>Length: {length}</label>
        </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            id="numberInput"
            defaultChecked={numberAllow}
            onChange={()=>{
              setnumberAllow((prev)=>!prev)
            }
            }
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            id="charInput"
           defaultChecked={charAllow}
            onChange={()=>{
              setcharAllow((prev)=>!prev)
            }}
            />
            <label htmlFor="charInput">Character</label>
          </div>
        </div>

      </div>
      </>
  )
}

export default App
