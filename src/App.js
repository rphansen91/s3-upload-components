import React, { Component } from 'react';
import { listAll, uploadItem } from './aws/s3'
import logo from './logo.svg'
import './App.css'

import Items from './Components/Items'
import Upload from './Components/Upload'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentWillMount () {
    this.loadItems()
  }

  saveItem (file) {
    console.log(file)

    uploadItem({
      Key: file.name,
      ContentType: file.type,
      Body: file,
      ACL: 'public-read'
    })
    .then(() => this.loadItems())
  }

  loadItems () {
    listAll()
    .then(items => items.Contents)
    .then(items => {
      this.setState({ items })
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to S3</h2>
        </div>
        <div className="App-intro">
          <Items items={this.state.items} />
          <Upload onSave={this.saveItem.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;
