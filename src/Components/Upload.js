import React, { Component } from 'react';

export default class Upload extends Component {

  constructor (props) {
    super(props)
    this.listening = false
  }

  handleTarget (target) {
    if (!target || this.listening) return

    this.listening = true
    const { onSave } = this.props
    target.addEventListener('change', function () {
      const files = target.files
      if (files.length) onSave(files[0])
    })
  }

  render () {
    const { accept="" } = this.props
    return (
      <div className="upload">
        <input
        type="file"
        accept={accept}
        ref={this.handleTarget.bind(this)} />
      </div>
    )
  }
}
