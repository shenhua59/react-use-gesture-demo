import React, { useState, useEffect, useCallback, useRef } from 'react';  
import { useDrag } from '@use-gesture/react'
import RollingWaveformChart from './BrainWaveChart';
import Rect from './Rect'


const initColor = `rgba(99,142,228, 0.14)`;
const warningColor = `rgb(244, 67, 54)`;

const gridStyle = {  
  display: 'flex',
  flexWrap: 'nowrap',
  gap: '8px',
  padding: '8px',  
  width: '80%',
  margin:'auto'
};  

const cellStyle = {  
  flex: '1 0 24px',
  backgroundColor:initColor,
  height: '24px',  
  borderRadius:'3px'
}; 


const Index =()=> {  
  const [randomNumber, setRandomNumber] = useState(100); 
  const [position, setPositon] = useState({ x: 0, y: 0 })
  const chartWidth = 800;
  const chartHeight = 400;
  const dragRef = useRef()
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
    backgroundImage: `linear-gradient(to Left, ${warningColor}, ${randomNumber > 150 || randomNumber < -10 ? warningColor : initColor}`  
  };  

  const gradientRoRightStyle = {  
    backgroundImage: `linear-gradient(to right, ${initColor}, ${warningColor}`
  }; 

  const gradientRoLeftStyle = {  
    backgroundImage: `linear-gradient(to left, ${initColor}, ${warningColor}`
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


  const bindposition = useDrag((params) => {
    console.log(params)
    setPositon({
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
      <Rect randomNumber={randomNumber } gradientRoLeftStyle={gradientRoLeftStyle} gradientRoRightStyle={gradientRoRightStyle} />
      {renderRact()}
      {/* <div className="App-header">
        <div ref={dragRef} {...bindposition()} style={{ position: 'relative', top: position.y, left: position.x ,width:'200px',height:'100px',backgroundColor:'violet',marginTop:'30px',borderRadius:'10px'}}>
          <div style={{width:'100%',height:'100%'}}></div>
        </div>
      </div>
      <div style={{width:'80%',margin:'auto'}}>
        <div style={{ width: '100%', margin: '15px auto', height: '300px', backgroundColor: 'rgb(190 214 191)' }} {...bind(data)}>
        <RollingWaveformChart width={chartWidth} height={chartHeight} />
        </div>
      </div> */}
    </div>  
  );  
}  
  
export default Index;