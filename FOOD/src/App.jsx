import { useEffect, useState } from 'react'
import './App.css'
import Icon from './Icon'
import { money } from './data'
import Home from './Home'
import Restaurants from './Restaurants'
import Menu from './Menu'
import Order from './Order'
import Support from './Support'
import Settings from './Settings'
import LoadingFace from './LoadingFace'

const pages = ['/', '/restaurants', '/menu', '/order', '/support', '/settings']
function readPage() {
  const hash = window.location.hash.slice(1).split('?')[0]
  return pages.includes(hash) ? hash : '/'
}
const readStored = (key, fallback) => {
  try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback }
  catch { return fallback }
}
export default function App() {
  const [page, setPage] = useState(readPage)
  const [cart, setCart] = useState(() => readStored('hangry-cart', []))
  const [favorites, setFavorites] = useState(() => readStored('hangry-favorites', []))
  const [currentOrder, setCurrentOrder] = useState(() => readStored('hangry-current-order', null))
  const [customer, setCustomer] = useState(() => ({name:'',phone:'',email:'',address1:'',address2:'',postcode:'',city:'',state:'',note:'',payment:'Cash on delivery',...readStored('hangry-personal-info', {})}))
  const [addresses, setAddresses] = useState(() => readStored('hangry-addresses', []))
  const [category, setCategory] = useState('All')
  const [selectedRestaurant, setSelectedRestaurant] = useState(null)
  const [query, setQuery] = useState('')
  const [notice, setNotice] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [loading, setLoading] = useState(true)
  const [userReviews, setUserReviews] = useState(() => readStored('hangry-reviews', []))

  useEffect(() => {
    const onHash = () => { setPage(readPage()); setMobileOpen(false); setSidebarOpen(false); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  useEffect(() => { const timer = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(timer) }, [])
  useEffect(() => { document.documentElement.lang = 'en'; localStorage.removeItem('hangry-lang') }, [])
  useEffect(() => { localStorage.setItem('hangry-addresses', JSON.stringify(addresses)) }, [addresses])

  useEffect(() => { localStorage.setItem('hangry-reviews',JSON.stringify(userReviews)) }, [userReviews])
  useEffect(() => { localStorage.setItem('hangry-cart',JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('hangry-favorites',JSON.stringify(favorites)) }, [favorites])
  useEffect(() => { localStorage.setItem('hangry-current-order',JSON.stringify(currentOrder)) }, [currentOrder])
  const navigate = (target) => {
    setMobileOpen(false)
    setSidebarOpen(false)
    if (window.location.hash !== `#${target}`) window.location.hash = target
    else { setPage(target); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  }
  const addToCart = (dish) => {
    setCart(prev => {
      const found = prev.find(item => item.id === dish.id)
      return found ? prev.map(item => item.id === dish.id ? {...item,quantity:item.quantity+1}:item) : [...prev,{...dish,quantity:1}]
    })
    setNotice(`${dish.name} ${'added to your order'}`)
  }
  const changeQuantity = (id, change) => setCart(prev => prev.map(item => item.id===id ? {...item,quantity:item.quantity+change}:item).filter(item=>item.quantity>0))
  const toggleFavorite = id => setFavorites(prev => prev.includes(id)?prev.filter(x=>x!==id):[...prev,id])
  const restaurantMenu = restaurant => {setSelectedRestaurant(restaurant.id);setQuery('');setCategory('All');navigate('/menu')}
  const cartCount = cart.reduce((sum,item)=>sum+item.quantity,0)
  const subtotal = cart.reduce((sum,item)=>sum+item.price*item.quantity,0)
  const deliveryFee = cart.length? Math.max(...new Set(cart.map(item => [1,4].includes(item.restaurantId) ? 2.5 : [2,6].includes(item.restaurantId) ? 2.9 : 3.9))) : 0
  const placeOrder = () => {
    if (!cart.length) return
    const order = {id:`HG-${Date.now().toString().slice(-8)}`,placedAt:new Date().toISOString(),stage:0,items:cart,total:subtotal+deliveryFee,customer:{...customer}}
    setCurrentOrder(order)
    setCart([])
    setCustomer(prev => ({...prev, note:''}))
    setNotice('Order placed successfully. Your order details are ready.')
    navigate('/order')
  }
  const addReview = review => setUserReviews(prev => [{ ...review, id: Date.now(), date: new Date().toISOString() }, ...prev])
  const goToAllMenu = () => {setSelectedRestaurant(null);setCategory('All');setQuery('');navigate('/menu')}

  return <div className="hangry-app" data-theme="light">
    <div className="announcement">{('FRESH FLAVOURS')} <span>·</span> {('LOCAL FAVOURITES')} <span>·</span> {('GOOD MOODS')}</div>
    <header className="site-header navbar"><div className="container nav-row">
      <a href="#/" className="logo" onClick={()=>setMobileOpen(false)}><span className="logo-icon"><Icon name="utensils" size={24}/></span><span>Hangry<span className="lime-dot">!</span><small>FEED YOUR MOOD</small></span></a>
      <nav className={mobileOpen?'nav-links opened':'nav-links'} aria-label="Main navigation">
        <a className={page==='/'?'current':''} href="#/" onClick={()=>setMobileOpen(false)}>{("Home")}</a>
        <a className={page==='/restaurants'?'current':''} href="#/restaurants" onClick={()=>setMobileOpen(false)}>{("Restaurants")}</a>
        <a className={page==='/menu'?'current':''} href="#/menu" onClick={()=>setMobileOpen(false)}>{("Menu")}</a>
      </nav>
      <div className="nav-controls"><button className="btn cart-button" onClick={()=>navigate('/order')} aria-label={`Open order, ${cartCount} items`}><Icon name="bag"/><span>{("My order")}</span><b className="badge">{cartCount}</b></button><button type="button" className="btn btn-ghost settings-sidebar-trigger" onClick={()=>setSidebarOpen(true)} aria-label={("Open account sidebar")} aria-expanded={sidebarOpen}><Icon name="menu" size={22}/><span>{("Account")}</span></button></div>
    </div></header>
    {sidebarOpen && <div className="account-sidebar-backdrop" onClick={()=>setSidebarOpen(false)} aria-hidden="true"/>}
    <aside className={`account-sidebar ${sidebarOpen?'account-sidebar-open':''}`} aria-label={'Account navigation'} aria-hidden={!sidebarOpen}>
      <div className="account-sidebar-heading"><strong>{'My account'}</strong><button type="button" className="btn btn-ghost btn-circle" onClick={()=>setSidebarOpen(false)} aria-label={('Close sidebar')}><Icon name="close" size={20}/></button></div>
      <nav className="account-sidebar-links">
        <button type="button" className="sidebar-mobile-nav" onClick={()=>navigate('/')}><Icon name="arrow" size={20}/>{('Home')}</button>
        <button type="button" className="sidebar-mobile-nav" onClick={()=>navigate('/restaurants')}><Icon name="utensils" size={20}/>{('Restaurants')}</button>
        <button type="button" className="sidebar-mobile-nav" onClick={goToAllMenu}><Icon name="menu" size={20}/>{('Menu')}</button>
        <button type="button" onClick={()=>navigate('/order')}><Icon name="bag" size={20}/>{('My orders')}</button>
        <button type="button" onClick={()=>navigate('/support')}><Icon name="info" size={20}/>{('Customer service')}</button>
        <button type="button" onClick={()=>{navigate('/settings');setTimeout(()=>document.getElementById('personal-info')?.scrollIntoView({behavior:'smooth'}),60)}}><Icon name="pin" size={20}/>{('Personal information & addresses')}</button>
      </nav>
    </aside>
    <main>
      {page==='/'&&<Home onNavigate={target=>target==='/menu'?goToAllMenu():navigate(target)}/>}
      {page==='/restaurants'&&<Restaurants userReviews={userReviews} addReview={addReview} category={category} setCategory={setCategory} query={query} setQuery={setQuery} favorites={favorites} toggleFavorite={toggleFavorite} onExplore={restaurantMenu}/>}
      {page==='/menu'&&<Menu category={category} setCategory={setCategory} query={query} setQuery={setQuery} selectedRestaurant={selectedRestaurant} setSelectedRestaurant={setSelectedRestaurant} onAdd={addToCart} onViewOrder={()=>navigate('/order')} cartCount={cartCount}/>}
      {page==='/order'&&<Order cart={cart} subtotal={subtotal} deliveryFee={deliveryFee} total={subtotal+deliveryFee} formatPrice={money} onBack={goToAllMenu} onCheckout={placeOrder} onQuantity={changeQuantity} currentOrder={currentOrder} customer={customer} onCustomerChange={setCustomer} addresses={addresses}/>}
      {page==='/support'&&<Support onNavigate={navigate}/>}
      {page==='/settings'&&<Settings customer={customer} setCustomer={setCustomer} addresses={addresses} setAddresses={setAddresses} onNavigate={navigate}/>}
    </main>
    {loading && <LoadingFace/>}
    <footer className="footer"><div className="container footer-content"><div><strong>Hangry!</strong><p>Feed Your Mood.</p></div><span>{('Made for Malaysian cravings.')}</span></div></footer>
    {notice&&<div className="toast toast-center hangry-toast" role="status"><div className="alert notice"><span>{notice}</span><button aria-label={('Dismiss notification')} onClick={()=>setNotice('')}><Icon name="close" size={17}/></button></div></div>}
  </div>
}
