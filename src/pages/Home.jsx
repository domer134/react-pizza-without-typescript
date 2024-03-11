import React, { useRef } from 'react'

import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import { useNavigate } from 'react-router-dom'
import Skeleton from '../components/PizzaBlock/Skeleton'
import qs from 'qs'
import Categories from '../components/Categories'
import Sort, { sortList } from '../components/Sort'
import '../scss/app.scss'
import Pagination from '../components/Pagination/Pagination'
import { SearchContext } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilter } from '../redux/selector'
import {
	setCategoreyId,
	setCurrentPage,
	setFilter,
} from '../redux/slice/filterSlice'
import { fetchPizzas } from '../redux/slice/pizzaSlice'

function Home() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const isMounted = useRef(false)
	const isSearch = useRef(false)
	const { categoryId, sort, currentPage } = useSelector(selectFilter)

	const items = useSelector(state => state.pizza.items)
	const { searchValue } = React.useContext(SearchContext)
	const [isLoading, setIsLoading] = React.useState(true)

	const onChangeCategory = id => {
		dispatch(setCategoreyId(id))
	}

	const onChangePage = number => {
		dispatch(setCurrentPage(number))
	}

	const getPizzas = async () => {
		setIsLoading(true)
		const sortBy = sort.sortProperty.replace('-', '')
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
		const category = categoryId > 0 ? `category=${categoryId}` : ''
		const search = searchValue ? `&search=${searchValue}` : ''

		try {
			dispatch(
				fetchPizzas({
					search,
					sortBy,
					currentPage,
					order,
					category,
				})
			)
		} catch (error) {
			console.log('Error, error')
			alert('Помилка при полученні піц')
		} finally {
			setIsLoading(false)
		}
		window.scrollTo(0, 0)
	}

	///Якщо змінилися параметри і відбувся перший рендер
	React.useEffect(() => {
		if (isMounted.current) {
			const params = {
				sortProperty: sort.sortProperty,
				categoryId: categoryId > 0 ? categoryId : null,
				currentPage,
			}

			const queryString = qs.stringify(params, { skipNulls: true })
			navigate(`/?${queryString}`)
		}

		if (!window.location.search) {
			fetchPizzas()
		}
	}, [currentPage, sort.sortProperty, searchValue, categoryId])

	///Якщо відбувся перший рендер то ми запрошуємо піцци
	React.useEffect(() => {
		getPizzas()
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	///Якщо у нас відбувся перший рендер то ми дивимся в URL-параметри і зберігаємо в редаксі
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			const sort = sortList.find(obj => obj.sortProperty === params.sortBy)
			dispatch(
				setFilter({
					searchValue: params.search,
					categoryId: Number(params.category),
					currentPage: Number(params.currentPage),
					sort: sort || sortList[0],
				})
			)
		}
		isMounted.current = true
	}, [])

	const pizzas = items
		.filter(obj => {
			if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
				return true
			}
			return false
		})
		.map(obj => <PizzaBlock key={obj.id} {...obj} />)

	const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />)

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onClickCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>{isLoading ? skeleton : pizzas}</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}

export default Home
