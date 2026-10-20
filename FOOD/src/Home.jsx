import Icon from './Icon'
import { photos } from './data'

export default function Home({ onNavigate }) {

  return <>
    <section className="hero" id="home"><div className="container hero-grid">
      <div className="hero-copy"><span className="eyebrow">{('MADE FOR EVERY CRAVING')}</span><h1>{<>Good food.<br/><em>Better mood.</em></>}</h1><p>{('From kampung classics to modern comfort food. Your next happy meal is just a tap away.')}</p><div className="hero-actions"><button className="btn primary-button" onClick={() => onNavigate('/restaurants')}>{('Explore restaurants')} <Icon name="arrow" size={18}/></button><button className="btn btn-ghost plain-button" onClick={() => onNavigate('/menu')}>{('Browse menu →')}</button></div><div className="hero-note"><Icon name="check" size={17}/> {('Malaysian flavours, your way.')}</div></div>
      <div className="hero-photo-wrap"><img src={photos.hero} alt="Photograph of freshly prepared gourmet burger" className="hero-photo"/><div className="hero-sticker"><span>{('Made fresh.')}</span><strong>{('Enjoy more.')}</strong></div></div>
    </div></section>
    <section className="home-feature container"><div className="section-title"><div><span className="overline">{('WELCOME TO HANGRY!')}</span><h2>{('Every mood deserves a good meal.')}</h2><p>{('Find traditional Malaysian favourites, modern comfort food, and little treats for your day.')}</p></div></div><div className="home-shortcuts"><button onClick={() => onNavigate('/restaurants')}><img src={photos.nasi} alt="Real photograph of Malaysian-style food"/><span>{('Discover restaurants')} <Icon name="arrow" size={18}/></span></button><button onClick={() => onNavigate('/menu')}><img src={photos.ramen} alt="Real photograph of noodle dish"/><span>{('Choose your dishes')} <Icon name="arrow" size={18}/></span></button></div></section>
    <section className="how-section"><div className="container"><div className="section-title centered"><div><span className="overline">{('EASY FROM START TO FINISH')}</span><h2>{('From hungry to happy')}</h2><p>{('Three steps to your next favourite meal.')}</p></div></div><div className="steps"><article className="card"><span className="step-number">01</span><Icon name="search" size={30}/><h3>{('Find your flavour')}</h3><p>{('Explore traditional and modern restaurants.')}</p></article><article className="card"><span className="step-number">02</span><Icon name="bag" size={30}/><h3>{('Build your order')}</h3><p>{('Add the dishes you love to your order.')}</p></article><article className="card"><span className="step-number">03</span><Icon name="check" size={30}/><h3>{('Review and enjoy')}</h3><p>{('Check your selections and follow your order status.')}</p></article></div></div></section>
  </>
}
