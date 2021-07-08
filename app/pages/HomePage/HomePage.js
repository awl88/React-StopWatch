import React, { useState } from 'react'
import PropTypes from 'prop-types'

// Components
import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { Container } from 'components/Container'
import { Text } from 'components/Text'

// Helpers
import { formatTimeText } from '../../utils/helpers'

/*
 * StopWatch
 *
 * I did a setInterval, but thought that a Date.now() - time started type solution
 * might be better as it would be more accurate to times. I spent a few minutes trying
 * to get it to work, but was unable to get it to work as I wanted so I went back to
 * the setInterval method. Given more time I would most likely use Date.now() for this
 * type of project. I was able to get laps working just in the nick of time as well.
 *
 * Given more time I would most likely break this up into separate components for the
 * time, buttons, and laps. For this short project I did not use Redux at all, but if
 * the times were needed elsewhere in the application I would add the laps to Redux if
 * needed.
 *
 */
export const HomePage = ({ history }) => {
  const [time, setTime] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [intervalId, setIntervalId] = useState(null)
  const [laps, setLaps] = useState([])

  const startTimer = () => {
    if (!isActive) {
      setIsActive(true)
      const interval = setInterval(() => {
        setTime(time => time + 10)
      }, 10)
      setIntervalId(interval)
    }
  }

  const stopTimer = () => {
    if (isActive) {
      clearIntervalId()
    }
  }

  const resetTimer = () => {
    setTime(0)
    clearIntervalId()
    setIntervalId(null)
  }

  const addLap = () => {
    setLaps([...laps, formatTimeText(time)])
  }

  const clearIntervalId = () => {
    setIsActive(false)
    clearInterval(intervalId)
  }

  return (
    <>
      <Container align="center">
        <Text size="xlarge">{formatTimeText(time)}</Text>
        <Box gap="small" direction="row" pad="small">
          <Button label="Start" onClick={() => startTimer()} />
          <Button label="Stop" onClick={() => stopTimer()} />
        </Box>
        <Box gap="small" direction="row" pad="small">
          <Button label="Reset" onClick={() => resetTimer()} />
          <Button label="Lap" onClick={() => addLap()} />
        </Box>
        {laps.map(lap => (
          <Text key={lap}>{lap}</Text>
        ))}
      </Container>
    </>
  )
}

HomePage.propTypes = {
  history: PropTypes.object,
}

export default HomePage
