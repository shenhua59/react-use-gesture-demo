

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
  backgroundColor: 'rgba(99,142,228, 0.14)',
  height: '24px',  
  borderRadius:'3px'
}; 


const Boxes = (props) => {  
  const { randomNumber } = props;
  const array1 = [];  
  const array2 = [];  
  for (let i = 7; i > 0; i--) {  
    array1.push(i / 7); // 将0到1的值依次添加到数组中  
  }  
  for (let i = 1; i < 8; i++) {  
    array2.push(i / 7); // 将0到1的值依次添加到数组中  
  } 
  return (  
    <div style={gridStyle}>  
      {array1.map((item, index) => {
        return <div
          key={item}
          style={{
            ...cellStyle,
            backgroundImage:randomNumber < -10 && index < 3  ? `linear-gradient(to left, rgba(99,142,228, 0.14), rgba(244, 67, 54, 1)` : `linear-gradient(to left, rgba(99, 142, 228, 0.14), rgba(244, 67, 54, ${item}), rgba(244, 67, 54, ${item}))` 
            // backgroundColor: randomNumber < -10 && index < 3 ? `rgb(244, 67, 54)` : `rgba(99,142,228, ${item}`,
          }}  
      >  
        
      </div>  
      })} 
      {array2.map((item, index) => {
        return  <div  
        key={item}  
        style={{  
          ...cellStyle,
          backgroundColor: randomNumber > 150 && index > 3 ? `rgb(244, 67, 54)` : `rgba(99,142,228, ${item}`,
        }}  
      >  
      </div>  
      })} 
    </div>  
  );  
}  
  
export default Boxes;