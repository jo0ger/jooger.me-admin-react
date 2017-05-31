// 文章缩略图
// 投机了一把，永乐antd内部Upload的className

import React from 'react'
import { Icon } from 'antd'

export const Thumb = ({ thumb, onPreview }) => {

  const { url, name } = thumb

  const handlePreview = e => {
    e.preventDefault()
    onPreview(thumb)
  }

  return (
    <div className="ant-upload-list-item ant-upload-list-item-undefined">
      <div className="ant-upload-list-item-info">
        <span>
          <a className="ant-upload-list-item-thumbnail" href={url} target="_blank" rel="noopener noreferrer">
            <img src={url} alt={name} />
          </a>
          <a href={url} target="_blank" rel="noopener noreferrer" className="ant-upload-list-item-name" title={name}>
            {name}
          </a>
        </span>
      </div>
      <span className="ant-upload-list-item-actions">
        <a href={url} target="_blank" rel="noopener noreferrer" title="预览文件" onClick={handlePreview}>
          <Icon type="eye-o" />
        </a>
      </span>
    </div>
  )
} 

export default Thumb
