import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/css/css'
import 'codemirror/mode/javascript/javascript'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCompressAlt, faExpandAlt} from '@fortawesome/free-solid-svg-icons'
 import {faHtml5 ,faCss3Alt, faJsSquare} from '@fortawesome/free-brands-svg-icons'

import { Controlled as ControlledEditor} from 'react-codemirror2'

export default function Editor(props) {

  const [open, setOpen] = React.useState(true)

  function handleClick(){
    setOpen(prevOpen => !prevOpen)
  }

console.log(open)

  const{
    onChange,
    value,
    displayName, 
    language
  } = props
  function handleChange(editor, data, value){
    onChange(value)
  }

  let icon = faHtml5
  if(displayName ==='CSS'){
    icon = faCss3Alt
  }else if(displayName ==='JS'){
    icon = faJsSquare
  }

  
  

  return (
    <div className = {`flex flex-col w-full p-1.5 ${open?'':'w-1/12'} transition duration-100`}> 
      <div className='title flex gap-0.5 justify-between p-1 text-white bg-black '>
        <FontAwesomeIcon icon={icon}  
        className='text-xl'/>
        <button className='bg-none text-white w-6' onClick={handleClick}>
          <FontAwesomeIcon icon={open? faCompressAlt: faExpandAlt} />
        </button>
      </div>

      <ControlledEditor
        className='code-mirror-wrapper h-full overflow-hidden'
        value={value}
        onBeforeChange={handleChange}
        options={{
          lineWrapping:true,
          lint:true,
          mode:language,
          lineNumbers: true,
          theme: 'material'
        } 
        }
        />
    </div>
  )
}
