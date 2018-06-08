import React, { Component } from 'react'
import Progress from './components/Progress'
import { Select, Button } from './components/Controls'

class App extends Component {
  state = {
    loading: true,
    eror: false,
    buttons: null,
    bars: null,
    selectedBar: ''
  }

  onPayloadReceived (buttons, bars) {
    this.setState({
      loading: false,
      buttons,
      bars
    })
  }

  componentDidMount () {
    // Depending on the type of app being built, API calls might
    // be abstracted to a services/API file to seperate concerns.
    // They might also be handled in thunks/sagas, in the context
    // of a redux app, if the state of API calls (ie awaiting,
    // received, error) affects multiple parts of the app.
    // In a simple case like this, inline API call is fine.
    window
      .fetch('/bars')
      .then(response => {
        return response.json()
      })
      .then(response => {
        this.onPayloadReceived(response.buttons, response.bars)
      })
      .catch(error => {
        this.setState({
          loading: false,
          error
        })
      })
  }

  // Construct an array of objects with structure { value: 1, label: 'Bar 1' }
  getSelectOptions () {
    return this.state.bars.map((value, i) => ({ value: i, label: `Bar ${i+1}` }))
  }

  onChangeSelectedBar = e => {
    this.setState({
      selectedBar: e.target.value
    })
  }

  onAdjustProgress = (increment) => {
    return (e) => {
      const selectedBarValue = this.state.bars[this.state.selectedBar]
      // We utilise the data attribute on the buttons
      // to store the increment/decrement value
      const newBars = this.state.bars.slice()
      let newBarValue = Number(increment) + Number(selectedBarValue)

      if (newBarValue < 0) {
        newBarValue = 0
      }

      newBars[this.state.selectedBar] = newBarValue

      this.setState({
        bars: newBars
      })
    }
  }

  renderButtons () {
    // negative value will render minus implicitly, plus sign needs to be explicit
    if (!this.state.bars.length) return null
    return this.state.buttons.map((value, i) => (
      <Button key={i} onClick={this.onAdjustProgress(value)}>
        {value < 0 ? value : `+${value}`}
      </Button>
    ))
  }

  renderBars () {
    const { bars, selectedBar } = this.state
    if (!bars.length) return null
    return bars.map((value, i) => <Progress value={value} key={i} active={i === parseInt(selectedBar, 10)} />)
  }

  render () {
    if (this.state.loading) {
      return <div>Loading...</div>
    }

    if (this.state.error) {
      return <strong>Error fetching progress bar data!</strong>
    }

    return (
      <div>
        <div className='progress-bars'>{this.renderBars()}</div>
        <div className='controls'>
          <Select
            value={this.state.selectedBar}
            options={this.getSelectOptions()}
            onChange={this.onChangeSelectedBar}
          />
          <div className="button-container">
            {this.renderButtons()}
          </div>
        </div>
      </div>
    )
  }
}

export default App
