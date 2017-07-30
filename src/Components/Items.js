import React from 'react'
import './item.css'

const itemUrl = (bucket, name) =>
  ['//', bucket, '.s3.amazonaws.com/', name].join('')

const Item = ({ bucket, item }) => {
  const url = itemUrl(bucket, item.Key)

  return (
    <a className='item' href={url} target='_blank'>
      <img src={url} />
      <pre>{item.Key}</pre>
    </a>
  )
}

export default ({ items, bucket }) => (
  <div className='items'>
    {items.map((item, i) => <Item key={i} bucket={bucket} item={item} />)}
  </div>
)
