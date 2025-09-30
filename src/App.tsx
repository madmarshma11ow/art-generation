import Arts from './components/Arts'
import { useState } from 'react'
import "./app.css"

export default function App() {
  const [quantityArts, setQuantityArts] = useState<number>(0);

  return (
    <div className='main'>
      <Arts quantityArts={quantityArts} />
      <button className='main__button' onClick={() => setQuantityArts(quantityArts + 1)}>+</button>
    </div>
  )
}