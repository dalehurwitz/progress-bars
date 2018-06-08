import React from 'react'

// Renders a progress bar with text percentage value
const Progress = ({ value = 0, active }) => {
  const valueText = `${value > 0 ? value : 0}%` // value can't fall below 0
  const barOverflow = value > 100
  const progressBarContainerClasses = [
    'progress-bar-container',
    active ? 'progress-bar-container--active' : ''
  ].join(' ').trim()
  const progressBarInnerClasses = [
    'progress-bar-inner',
    barOverflow ? 'progress-bar-inner--overflow' : ''
  ].join(' ').trim()

  let barWidth = value

  // while value can grow beyond
  // 100, the bar width must not
  if (barOverflow) {
    barWidth = 100
  } else if (value < 0) {
    barWidth = 0
  }

  // We use a 'progressBarInner' div in order to animate the progress bar on load
  return (
    <div className={progressBarContainerClasses}>
      <div className="progress-bar-container__inner">
        <div className='progress-bar' style={{width: `${barWidth}%`}}>
          <div className={progressBarInnerClasses} />
        </div>
        <div className='progress-value'>{valueText}</div>
      </div>
    </div>
  )
}

export default Progress
