import React, { useState } from 'react'
import { SearchContext } from '../../App'
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'

const Search = () => {
	const [value, setValue] = useState('')
	const { setSearchValue } = React.useContext(SearchContext)

	const onClickClear = () => {
		setSearchValue('')
		setValue('')
	}
	const updateSearchValue = React.useCallback(
		debounce(str => {
			setSearchValue(str)
		}, 150),
		[]
	)

	const onChangeInput = event => {
		setValue(event.target.value)
		updateSearchValue(event.target.value)
	}

	return (
		<div className={styles.search}>
			<svg
				className={styles.icon}
				xmlns='http://www.w3.org/2000/svg'
				version='1.1'
				viewBox='0 0 129 129'
				enable-background='new 0 0 129 129'
			>
				<g>
					<path d='M51.6,96.7c11,0,21-3.9,28.8-10.5l35,35c0.8,0.8,1.8,1.2,2.9,1.2s2.1-0.4,2.9-1.2c1.6-1.6,1.6-4.2,0-5.8l-35-35   c6.5-7.8,10.5-17.9,10.5-28.8c0-24.9-20.2-45.1-45.1-45.1C26.8,6.5,6.5,26.8,6.5,51.6C6.5,76.5,26.8,96.7,51.6,96.7z M51.6,14.7   c20.4,0,36.9,16.6,36.9,36.9C88.5,72,72,88.5,51.6,88.5c-20.4,0-36.9-16.6-36.9-36.9C14.7,31.3,31.3,14.7,51.6,14.7z' />
				</g>
			</svg>
			<input
				value={value}
				className={styles.input}
				onChange={onChangeInput}
				placeholder='Шукати піцу...'
			/>
			{value && (
				<svg
					onClick={onClickClear}
					className={styles.clearIcon}
					xmlns='http://www.w3.org/2000/svg'
					version='1.1'
					id='Layer_1'
					x='0px'
					y='0px'
					viewBox='0 0 60.963 60.842'
				></svg>
			)}
		</div>
	)
}

export default Search
