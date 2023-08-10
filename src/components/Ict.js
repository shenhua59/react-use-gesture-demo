import React, { useState, useEffect, useCallback } from 'react';  
import { useDrag } from '@use-gesture/react'

const gridStyle = {  
  display: 'flex',
  justifyContent: 'center',
  width: '80%',
  margin:'auto'
};  

const cellStyle = {  
  flex: 1,  
  border: '1px solid #999',  
  height: '20px',  
  margin: '0 5px',
}; 


const Index =()=> {  
  const [randomNumber, setRandomNumber] = useState(100); 
  const [logoPos, setLogoPos] = useState({ x: 0, y: 0 })
  const data = {
    date: new Date().getTime(),
    ictId: 110
  }

  const array = Array(14).fill();
  const getRandomNumber = (min, max)=> {  
    return Math.random() * (max - min) + min;  
  }  
  
  useEffect(() => {  
    const interval = setInterval(() => {  
      setRandomNumber(Math.floor(getRandomNumber(-50, 200)));  
    }, 1000);  
  
    return () => clearInterval(interval);  
  }, []); 

 
  const gradientStyle = {  
    backgroundImage: `linear-gradient(to Left, red, ${randomNumber > 150 || randomNumber < -10 ? 'red' : 'blue'}`  
  };  

  const gradientRoRightStyle = {  
    backgroundImage: 'linear-gradient(to right, white, red)'
  }; 

  const gradientRoLeftStyle = {  
    backgroundImage: 'linear-gradient(to left, white, red)'
  }; 

  const handleStyle = (index) => {
    if (index === 10 && randomNumber > 150) {
      return {...gradientRoRightStyle, ...cellStyle}
    }
    if (index > 10 && randomNumber > 150) {
      return {...cellStyle, ...gradientStyle}
    }
    if (index === 3 && randomNumber < -10) {
      return {...gradientRoLeftStyle, ...cellStyle}
    }
    if (index < 3 && randomNumber < -10) {
      return {...cellStyle, ...gradientStyle}
    }
    return cellStyle
  }
  
  const renderRact = useCallback(() => {
    return <div style={gridStyle}>
      {array.map((item, index) => {
        return <div className='reat-item' key={index} style={handleStyle(index)}>{ item }</div>
      })}
    </div>
  }, [randomNumber])


  const bindLogoPos = useDrag((params) => {
    console.log(params)
    setLogoPos({
      x: params.offset[0],
      y: params.offset[1]
    })
    
  })

  const doSomethingWith = (data) => {
    console.log(data)
  }

  const bind = useDrag((state) => doSomethingWith(state), {})
 
  return (  
    <div style={{width:'100%'}}>  
      <h1 style={{ textAlign: 'center' }}>{randomNumber}</h1>  
      {renderRact()}
      <div className="App-header">
        <div {...bindLogoPos()} style={{ position: 'relative', top: logoPos.y, left: logoPos.x }}>
          <div style={{width:'200px',height:'100px',backgroundColor:'violet',borderRadius:'10px',marginTop:'30px'}}></div>
        </div>
      </div>
      <div style={{width:'100%',margin:'15px auto', height:'300px', backgroundColor:'rgb(190 214 191)'}} {...bind(data)} />
    </div>  
  );  
}  
  
export default Index;