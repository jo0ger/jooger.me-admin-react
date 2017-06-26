import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'
import DropOption from '~components/DropOption'
import styles from './ListFilter.styl'
import { classnames } from '~utils'

const Search = Input.Search

export const ListFilter = (props) => {
  const { onSearch, onInput, sorterMenus, selectedSorterKeys, onMenuClick } = props
  const onChange = e => onInput && onInput(e.target.value)
  const onSearchInput = val => onSearch(val.trim())
  return (
    <div className={classnames([styles.list_filter, !sorterMenus && styles.no_sorter])}>
      <div className={styles.input_search}>
        <Search 
          placeholder="搜索"
          onChange={onChange}
          onSearch={onSearchInput}
        />
      </div>
      {
        sorterMenus
          ? (
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
            )
          : null
      }
    </div>  
  )
}

ListFilter.propTypes = {
  sorterMenus: PropTypes.array,
  onMenuClick: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  onInput: PropTypes.func
}

export default ListFilter
