import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

export default function Drag() {

  // Set the drag hook and define component movement based on gesture data
  // The useDrag hook returns a function (stored in the bind constant), 
  // which when called returns an object with event handlers.

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  // movement example:
  // const bind = useDrag(({ down, movement, movement: [mx, my] }) => {
  //   console.log(down) // returns true is dragged, and false when letting go
  //   console.log(movement) // returns x & y value of mouse or touch movement
  //   console.log(mx, my) // destructured movement with mx, my
  //   console.log(x, y)
  //   console.log(api)
  //   api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
  // })

  // // offset example:
  // const bind2 = useDrag(({ down, offset, offset: [mx, my] }) => {
  //   console.log(down)
  //   console.log(offset)
  //   console.log(mx, my)
  //   console.log(x, y)
  //   console.log(api)
  //   api.start({ x: mx, y: my })
  // })

  // offset only left or right example:
  const bind4 = useDrag(({ down, offset, offset: [mx] }) => {
    // console.log(down)
    console.log(offset)
    // console.log(mx)
    // console.log(x, y)
    // console.log(api)
    api.start({ x: mx })
  })
  
  // // swipe example:
  // const [position, setPosition] = useState(0)
  // const { xx } = useSpring({ xx: position * 500 })
  // const bind3 = useDrag(({ swipe: [swipeX] }) => {
  //   // position will either be -1, 0 or 1
  //   setPosition((p) => Math.min(Math.max(-1, p + swipeX), 1))
  // })

  return (
    <>
      {/* <animated.div className="Drag" {...bind()} style={{ x: x, y: y }} />
      <animated.div className="Drag Drag--2" {...bind2()} style={{ x: x, y: y }} /> */}
      <animated.div className="Drag Drag--4" {...bind4()} style={{ x: x }} />
      {/* <animated.div className="Swipe" {...bind3()} style={{ x: xx }} /> */}
    </>
  )
}