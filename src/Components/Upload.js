import React, { Component } from 'react'
import UploadIcon from './UploadIcon'
import './upload.css'

function isAdvanced () {
  var div = document.createElement('div')
  return (
    ('draggable' in div || ('ondragstart' in div && 'ondrop' in div)) &&
    'FormData' in window &&
    'FileReader' in window
  )
}

export default class Upload extends Component {
  constructor (props) {
    super(props)
    this.isAdvancedUpload = isAdvanced()
    this.target
    this.state = {
      isDragging: false,
      isUploading: false,
      isError: false
    }
  }

  preventDefaults (e) {
    e && e.preventDefault() && e.stopPropagation()
  }

  setDragging (isDragging, e) {
    this.preventDefaults(e)
    this.setState({ isDragging, isError: false })
  }

  handleDrop (e) {
    this.preventDefaults(e)
    this.setState({ isDragging: false, isError: false })
    this.submit(e.dataTransfer.files[0])
  }

  submit (file) {
    if (!file || this.state.isUploading) return

    const { onSave } = this.props

    this.setState({ isUploading: true })
    return Promise.resolve()
      .then(() => onSave(file))
      .then(() =>
        this.setState({
          isUploading: false
        })
      )
      .catch(err =>
        this.setState({
          isUploading: false,
          isError: err.message
        })
      )
  }

  handleTarget (target) {
    if (!target || this.target) return

    this.target = target
    this.target.addEventListener('change', () => {
      this.submit(target.files[0])
    })
  }

  activeClasses () {
    const { isDragging, isUploading } = this.state
    const { className } = this.props

    return [
      this.isAdvancedUpload ? 'has-advanced-upload' : '',
      className || '',
      isDragging ? 'is-dragover' : '',
      isUploading ? 'is-uploading' : ''
    ]
      .filter(v => !!v)
      .join(' ')
  }

  activeStyles () {
    const { style, supportedStyle, draggingStyle } = this.props
    const { isDragging } = this.state
    return {
      ...style,
      ...(this.isAdvancedUpload ? supportedStyle : {}),
      ...(isDragging ? draggingStyle : {})
    }
  }

  render () {
    const { accept = '' } = this.props
    const { isError } = this.state
    return (
      <form
        style={this.activeStyles()}
        className={'uploader-box ' + this.activeClasses()}
        onDrag={this.preventDefaults.bind(this)}
        onDragStart={this.preventDefaults.bind(this)}
        onDragOver={this.setDragging.bind(this, true)}
        onDragEnter={this.setDragging.bind(this, true)}
        onDragLeave={this.setDragging.bind(this, false)}
        onDragEnd={this.setDragging.bind(this, false)}
        onDrop={this.handleDrop.bind(this)}
      >
        <div className='box__input'>
          <UploadIcon />
          <input
            className='box__file'
            id='file'
            name='file'
            type='file'
            accept={accept}
            ref={this.handleTarget.bind(this)}
          />
          <label htmlFor='file'>
            <strong>Choose a file</strong>
            <span className='box__dragndrop'> or drag it here</span>
            .
          </label>
        </div>
        <div className='box__uploading'>Uploading…</div>
        {isError ? <div className='box__error'>{isError}</div> : ''}
      </form>
    )
  }
}
