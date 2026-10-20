import { useMemo, useState } from 'react'
import Icon from './Icon'
import { dishes, categories, restaurants, money } from './data'

export default function Menu({ category, setCategory, query, setQuery, selectedRestaurant, setSelectedRestaurant, onAdd, onViewOrder, cartCount }) {

  const [budget, setBudget] = useState('all')
  const [deliveryLimit,setDeliveryLimit] = useState('all')
  const [sort,setSort] = useState('recommended')
  const [minRating,setMinRating] = useState('all')
  const filtered = useMemo(() => dishes.filter(d =>
    (!selectedRestaurant || d.restaurantId === selectedRestaurant) &&
    (category === 'All' || d.category === category) &&
    `${d.name} ${d.restaurant} ${d.description}`.toLowerCase().includes(query.trim().toLowerCase()) &&
    (budget==='all' || d.price <= Number(budget)) &&
    (deliveryLimit==='all' || ([1,4].includes(d.restaurantId) ? 2.5 : [2,6].includes(d.restaurantId) ? 2.9 : 3.9) <= Number(deliveryLimit)) &&
    (minRating==='all' || (restaurants.find(r=>r.id===d.restaurantId)?.rating ?? 0) >= Number(minRating))
  ).sort((a,b)=>sort==='priceLow'?a.price-b.price:sort==='priceHigh'?b.price-a.price:(restaurants.find(r=>r.id===b.restaurantId)?.rating||0)-(restaurants.find(r=>r.id===a.restaurantId)?.rating||0)), [category, query, selectedRestaurant,budget,deliveryLimit,sort,minRating])
  const restaurant = restaurants.find(r => r.id === selectedRestaurant)
  return <section className="section listing-page"><div className="container">
    <div className="page-intro"><span className="overline">{('FOOD FOR EVERY MOOD')}</span><h1>{restaurant ? `${restaurant.name} ${("menu")}` : ('Explore our menus')}</h1><p>{('Choose from mains, noodles, soups, desserts and refreshing drinks. Every restaurant has its own selection.')}</p></div>
    <div className="menu-toolbar"><label className="listing-search input"><Icon name="search" size={21}/><input type="search" value={query} onChange={e=>setQuery(e.target.value)} aria-label={('Search dishes')} placeholder={('Search dishes, kuey teow, soup or drinks...')}/></label><select className="select restaurant-select" aria-label={('Choose restaurant')} value={selectedRestaurant ?? ''} onChange={e=>{setSelectedRestaurant(e.target.value ? Number(e.target.value) : null);setCategory('All')}}><option value="">{('All restaurants')}</option>{restaurants.map(r=><option key={r.id} value={r.id}>{r.name}</option>)}</select></div>
    <div className="filter-bar card"><label>{'Meal budget'}<select className="select select-bordered" value={budget} onChange={e=>setBudget(e.target.value)}><option value="all">{('All prices')}</option><option value="10">{('Under RM 10')}</option><option value="15">{('Under RM 15')}</option><option value="20">{('Under RM 20')}</option></select></label><label>{'Delivery fee'}<select className="select select-bordered" value={deliveryLimit} onChange={e=>setDeliveryLimit(e.target.value)}><option value="all">{('Any fee')}</option><option value="2.5">{('RM 2.50 or less')}</option><option value="3">{('RM 3.00 or less')}</option><option value="4">{('RM 4.00 or less')}</option></select></label><label>{'Sort by'}<select className="select select-bordered" value={sort} onChange={e=>setSort(e.target.value)}><option value="recommended">{('Recommended')}</option><option value="priceLow">{('Price: low to high')}</option><option value="priceHigh">{('Price: high to low')}</option></select></label><label>{'Minimum rating'}<select className="select select-bordered" aria-label={('Minimum restaurant rating')} value={minRating} onChange={e=>setMinRating(e.target.value)}><option value="all">{'All ratings'}</option><option value="4.5">{('4.5 stars & up')}</option><option value="4">{('4.0 stars & up')}</option><option value="3">{('3.0 stars & up')}</option></select></label><button type="button" className="btn btn-outline" onClick={()=>{setBudget('all');setDeliveryLimit('all');setSort('recommended');setMinRating('all')}}>{('Reset filters')}</button></div>
    <div className="category-list">{categories.map(c=><button key={c} className={category===c?'btn category-pill selected':'btn category-pill'} onClick={()=>setCategory(c)} aria-pressed={category===c}>{(c)}</button>)}</div>
    <div className="section-title restaurant-title"><div><span className="overline">{('YOUR NEXT FAVOURITE')}</span><h2>{filtered.length} {("menu options")}</h2><p>{('Items without photographs are presented in a clean text-based menu.')}</p></div><button className="btn btn-ghost all-link" onClick={onViewOrder}>{("View order")} ({cartCount}) <Icon name="arrow" size={17}/></button></div>
    {filtered.length>0 && <div className="recommendation-line alert"><Icon name="star" size={18}/><span>{'Recommended picks consider restaurant ratings and meal prices.'} {filtered[0]?.name && `${("Try")} ${filtered[0].name}.`}</span></div>}
    {filtered.length ? <div className="dish-grid">{filtered.map(d=><article className="card dish-card" key={d.id}>{d.image ? <img src={d.image} alt={d.name} loading="lazy"/> : <div className="text-dish-top"><span className="badge dish-type">{(d.category)}</span><Icon name={d.category==='Drinks'?'cup':'utensils'} size={31}/></div>}<div className="card-body dish-info"><span>{d.restaurant}</span><h3>{d.name}</h3><p>{(d.description)}</p><div className="dish-bottom"><strong>{money(d.price)}</strong><button className="btn btn-square dish-add" onClick={()=>onAdd(d)} aria-label={`${("Add")} ${d.name} ${("to order")}`}><Icon name="plus" size={19}/></button></div></div></article>)}</div> : <div className="alert empty-state">{('Nothing matches this search. Try another restaurant or category.')}</div>}
  </div></section>
}
