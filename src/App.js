import React, { Component } from 'react'
import S3 from './aws/s3'
import Items from './Components/Items'
import Upload from './Components/Upload'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      error: ''
    }
  }

  componentWillMount () {
    const { name, region, identityPool } = this.props.credentials || {}

    S3(this.props.credentials || {})
      .then(s3 => (this.s3 = s3))
      .then(() => this.loadItems())
      .catch(err => this.setState({ error: err.message }))
  }

  saveItem (file) {
    return this.s3
      .uploadItem({
        Key: file.name,
        ContentType: file.type,
        Body: file,
        ACL: 'public-read'
      })
      .then(() => this.loadItems())
  }

  loadItems () {
    return this.s3.listAll().then(items => items.Contents).then(items =>
      this.setState({
        error: '',
        items
      })
    )
  }

  render () {
    const { name } = this.props.credentials
    const { items, error } = this.state
    return (
      <div className='App'>
        <div className='App-header'>
          {error
            ? <h2 className='error'>{error}</h2>
            : <div>
              <h2>Welcome to {name}</h2>
              <Upload
                onSave={this.saveItem.bind(this)}
                className='upload-transition'
                supportedStyle={{
                  padding: '100px 20px',
                  backgroundColor: '#c8dadf',
                  outline: '2px dashed black',
                  outlineOffset: '-10px',
                  color: '#0f3c4b'
                }}
                draggingStyle={{
                  backgroundColor: 'white'
                }}
                />
            </div>}
        </div>
        <div className='App-intro'>
          <Items bucket={name} items={this.state.items} />
        </div>
      </div>
    )
  }
}

export default App
