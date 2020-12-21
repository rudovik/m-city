import React from 'react'
import { easePolyOut } from 'd3-ease'
import { interpolate, interpolateTransformSvg } from 'd3-interpolate'
import Animate from 'react-move/Animate'

const stripes = [
  { background: '#98c5e9', left: 120, rotate: 25, top: -260, delay: 0 },
  { background: '#ffffff', left: 360, rotate: 25, top: -397, delay: 200 },
  { background: '#98c5e9', left: 600, rotate: 25, top: -498, delay: 400 },
]

const showStripes = () =>
  stripes.map((stripe, i) => (
    <Animate
      key={i}
      show={true}
      start={{
        background: '#ffffff',
        opacity: 0,
        left: 0,
        rotate: 0,
        top: 0,
      }}
      enter={{
        background: [stripe.background],
        opacity: [1],
        left: [stripe.left],
        rotate: [stripe.rotate],
        top: [stripe.top],
        timing: { delay: stripe.delay, duration: 200, ease: easePolyOut },
        events: {
          end() {
            // console.log('Animation finished')
          },
        },
      }}
      interpolation={(begValue, endValue, attr) => {
        // pass as prop
        if (attr === 'transform') {
          return interpolateTransformSvg(begValue, endValue)
        }

        return interpolate(begValue, endValue)
      }}
    >
      {({ opacity, left, background, rotate, top }) => {
        return (
          <div
            className='stripe'
            style={{
              opacity,
              background,
              transform: `rotate(${rotate}deg) translate(${left}px,${top}px)`,
            }}
          ></div>
        )
      }}
    </Animate>
  ))

const Stripes = () => {
  return <div className='featured_stripes'>{showStripes()}</div>
}

export default Stripes
