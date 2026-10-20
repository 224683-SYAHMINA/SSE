import { useState } from 'react'
import Icon from './Icon'

const faqs = [
  {q:'Where can I find my order status?',a:'Open My order to find your order number and see its latest status.'},
  {q:'Can I change my food selection?',a:'Yes, adjust quantities in My order before placing it. If your order has already been placed, contact customer service.'},
  {q:'How much is delivery?',a:'The delivery fee is shown in your order summary before checkout.'},
  {q:'How can I pay?',a:'Choose a payment method on the order page before confirmation.'},
  {q:'Can I leave delivery instructions?',a:'Yes. Add your instructions in the Delivery Information section at checkout.'},
]
const STORAGE_KEY='hangry-enquiries'
export default function Support({onNavigate}) {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [topic,setTopic] = useState('Order enquiry')
  const [message,setMessage] = useState('')
  const [confirmation,setConfirmation] = useState('')
  const submit = event => {
    event.preventDefault()
    const reference = `CS-${Date.now().toString().slice(-8)}`
    const entry = {reference,name,email,topic,message,createdAt:new Date().toISOString()}
    try {
      const previous = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      localStorage.setItem(STORAGE_KEY, JSON.stringify([entry,...(Array.isArray(previous)?previous:[])]))
    } catch { localStorage.setItem(STORAGE_KEY, JSON.stringify([entry])) }
    setConfirmation(reference)
    setMessage('')
  }
  return <section className="section support-page"><div className="container"><div className="page-intro"><span className="overline">{('HERE TO HELP')}</span><h1>{'Customer service'}</h1><p>{('Need help with your order? Browse the answers below or send us an enquiry.')}</p></div><div className="support-layout"><div><h2>{('Frequently asked questions')}</h2><div className="join join-vertical support-faq">{faqs.map((item,index)=><div className="collapse collapse-arrow join-item" key={item.q}><input type="radio" name="hangry-faq" defaultChecked={index===0}/><div className="collapse-title">{(item.q)}</div><div className="collapse-content"><p>{(item.a)}</p></div></div>)}</div><button className="btn dark-button support-track" onClick={()=>onNavigate('/order')}><Icon name="bag" size={19}/> {('View my order')}</button></div><div className="card support-contact"><span className="overline">{('GET IN TOUCH')}</span><h2>{('How can we help?')}</h2><p>{('Tell us a little about your question.')}</p><form onSubmit={submit}><label className="form-control"><span>{('Your name')}</span><input className="input" required value={name} onChange={e=>setName(e.target.value)} placeholder={('Full name')}/></label><label className="form-control"><span>{('Email address')}</span><input className="input" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label><label className="form-control"><span>{('Enquiry type')}</span><select className="select" value={topic} onChange={e=>setTopic(e.target.value)}><option value={'Order enquiry'}>{('Order enquiry')}</option><option value={'Menu question'}>{('Menu question')}</option><option value={'Delivery assistance'}>{('Delivery assistance')}</option><option value={'Feedback'}>{('Feedback')}</option><option value={'Other'}>{('Other')}</option></select></label><label className="form-control"><span>{('Your message')}</span><textarea className="textarea" required minLength={10} value={message} onChange={e=>setMessage(e.target.value)} placeholder={('Tell us what happened or how we can help...')} rows={5}/></label><button className="btn dark-button" type="submit">{('Submit enquiry')} <Icon name="arrow" size={17}/></button></form>{confirmation&&<div className="alert support-confirmation" role="status"><Icon name="check" size={19}/><span>{("Enquiry saved. Your reference is")} <strong>{confirmation}</strong>.</span></div>}</div></div></div></section>
}
