import React from 'react';

const itemUrl = name => [
  '//',
  process.env.REACT_APP_BUCKET_NAME,
  '.s3.amazonaws.com/',
  name
].join('')

const Item = ({ item }) =>
  <div className='item'>
    <img src={itemUrl(item.Key)} />
    <pre>
      {item.Key}
    </pre>
  </div>


export default ({ items }) =>
  <div className='items'>
    { items.map((item, i) => <Item key={i} item={item} />) }
  </div>
