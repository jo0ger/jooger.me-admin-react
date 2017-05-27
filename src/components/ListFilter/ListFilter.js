import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import DropOption from '~components/DropOption'
import styles from './ListFilter.styl'

const Search = Input.Search

export const ListFilter = (props) => {
  const { onSearch, onInput, sorterMenus, selectedSorterKeys, onMenuClick } = props
  const onChange = e => onInput && onInput(e.target.value)
  const onSearchInput = val => onSearch(val.trim())
  return (
    <div className={styles.list_filter}>
      <div className={styles.input_search}>
        <Search 
          placeholder="搜索"
          onChange={onChange}
          onSearch={onSearchInput}
        />
      </div>
      <div className={styles.sorter_group}>
        <DropOption
          buttonClass="sorter_btn"
          menuIcon="bars"
          menuOptions={sorterMenus}
          selectedKeys={selectedSorterKeys}
          buttonStyle={{ display: 'block', width: 50, textAlign: 'center' }}
          onMenuClick={onMenuClick}
        />
      </div>
    </div>  
  )
}

ListFilter.propTypes = {
  sorterMenus: PropTypes.array.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onInput: PropTypes.func
}

export default ListFilter
