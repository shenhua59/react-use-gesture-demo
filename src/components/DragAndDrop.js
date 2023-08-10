import React, { useRef } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useGesture } from '@use-gesture/react'

export default function DragAndDrop() {
  const [{ x, y, scale }, api] = useSpring(() => ({ x: 0, y: 0, scale: 1 }))
  const [props2, api2] = useSpring(() => ({ scale: 1 }))

  const draggableRef = useRef(null)
  const targetRef = useRef(null)

  const bind = useGesture({
    onDrag: ({ down, active, offset: [x, y] }) => {
      const scale = active ? 1.2 : 1
      api.start({ x, y, scale, immediate: down })
      if (isDroppable(draggableRef.current, targetRef.current)) {
        api2.start({ scale: 1.2 })
      }
    },
    onDragEnd: () => {
      if (isDroppable(draggableRef.current, targetRef.current)) {
        api.start({ scale: 0 })
        api2.start({ scale: 1, delay: 200 })
      }
    }
  })

  return (
    <div>
      <h4>Drag &amp; Drop:</h4>
      <animated.div className="DragAndDrop" {...bind()} style={{ x, y, scale }} ref={draggableRef} />
      <animated.div className="DragAndDropReceiver" ref={targetRef} style={props2} />
    </div>
  )
}

function isDroppable(draggableEl, targetEl) {
    const element = draggableEl.getBoundingClientRect()
		const target = targetEl.getBoundingClientRect()

		return (
      element.left    > target.left - target.width / 2 &&
      element.right   < target.right + target.width / 2 &&
      element.top     > target.top - target.height / 2 &&
      element.bottom  < target.bottom + target.height / 2  
    )
}