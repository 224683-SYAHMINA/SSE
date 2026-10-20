import { useState } from 'react'
import Icon from './Icon'

const states = ['Johor','Kedah','Kelantan','Melaka','Negeri Sembilan','Pahang','Perak','Perlis','Pulau Pinang','Sabah','Sarawak','Selangor','Terengganu','Wilayah Persekutuan Kuala Lumpur','Wilayah Persekutuan Labuan','Wilayah Persekutuan Putrajaya']
const emptyAddress = {label:'Home',address1:'',address2:'',postcode:'',city:'',state:'',note:''}
const fields = ['address1','address2','postcode','city','state','note']
const formatAddress = a => [a.address1,a.address2,[a.postcode,a.city].filter(Boolean).join(' '),a.state].filter(Boolean).join(', ')
export default function Settings({customer,setCustomer,addresses,setAddresses,onNavigate}) {

  const [profile,setProfile] = useState(() => ({name:customer.name||'',phone:customer.phone||'',email:customer.email||''}))
  const [editing,setEditing] = useState(null)
  const [draft,setDraft] = useState(emptyAddress)
  const [message,setMessage] = useState('')
  const saveProfile = e => {
    e.preventDefault()
    const next = {name:profile.name.trim(),phone:profile.phone.trim(),email:profile.email.trim()}
    setCustomer(prev=>({...prev,...next}))
    localStorage.setItem('hangry-personal-info',JSON.stringify(next))
    setMessage(('Personal information saved.'))
  }
  const startAddress = (idx=null) => {setEditing(idx===null?'new':idx);setDraft(idx===null?{...emptyAddress}:{...addresses[idx]});setMessage('')}
  const saveAddress = e => {
    e.preventDefault()
    const clean = {...draft,id:editing==='new'?`${Date.now()}`:draft.id}
    const next = editing==='new'?[...addresses,clean]:addresses.map((a,i)=>i===editing?clean:a)
    setAddresses(next)
    setCustomer(prev=>({...prev,...Object.fromEntries(fields.map(k=>[k,clean[k]||'']))}))
    setEditing(null)
    setMessage(('Delivery address saved and selected for checkout.'))
  }
  const removeAddress = idx => {setAddresses(prev=>prev.filter((_,i)=>i!==idx));setEditing(null);setMessage(('Address removed.'))}
  const selectAddress = a => {setCustomer(prev=>({...prev,...Object.fromEntries(fields.map(k=>[k,a[k]||'']))}));setMessage(('Address selected for checkout.'))}
  return <section className="section listing-page settings-page"><div className="container">
    <div className="page-intro"><span className="overline">{('YOUR HANGRY! ACCOUNT')}</span><h1>{('My account')}</h1><p>{('Manage your personal details, delivery addresses, orders and support.')}</p></div>
    <div className="settings-shortcuts">
      <button className="card settings-shortcut" onClick={()=>onNavigate('/order')}><span className="settings-shortcut-icon"><Icon name="bag" size={24}/></span><strong>{('My order')}</strong><span>{('View cart and track orders')} →</span></button>
      <button className="card settings-shortcut" onClick={()=>onNavigate('/support')}><span className="settings-shortcut-icon"><Icon name="info" size={24}/></span><strong>{('Customer service')}</strong><span>{('FAQs, enquiries and assistance')} →</span></button>
      <button className="card settings-shortcut" onClick={()=>document.getElementById('personal-info')?.scrollIntoView({behavior:'smooth'})}><span className="settings-shortcut-icon"><Icon name="pin" size={24}/></span><strong>{('Personal information')}</strong><span>{('Edit details and addresses')} →</span></button>
    </div>
    {message&&<div className="alert settings-message" role="status"><Icon name="check" size={17}/>{message}</div>}
    <div className="settings-sections">
      <div id="personal-info" className="card settings-section"><h2>{('Personal information')}</h2><p>{('Your contact details can be used again at checkout.')}</p><form onSubmit={saveProfile} className="settings-form"><div className="settings-two-col"><label className="form-control"><span>{('Full name')} *</span><input required className="input input-bordered" autoComplete="name" value={profile.name} onChange={e=>setProfile(p=>({...p,name:e.target.value}))}/></label><label className="form-control"><span>{('Phone number')} *</span><input required className="input input-bordered" type="tel" pattern="[0-9+() -]{8,18}" value={profile.phone} onChange={e=>setProfile(p=>({...p,phone:e.target.value}))}/></label></div><label className="form-control"><span>{('Email')} *</span><input required type="email" className="input input-bordered" value={profile.email} onChange={e=>setProfile(p=>({...p,email:e.target.value}))}/></label><button className="btn dark-button" type="submit">{('Save personal information')}</button></form></div>
      <div className="card settings-section"><div className="settings-heading"><div><h2>{('Delivery addresses')}</h2><p>{('Save multiple addresses, edit or remove them, and select one for checkout.')}</p></div><button className="btn primary-button" type="button" onClick={()=>startAddress()}><Icon name="plus" size={17}/>{('Add new address')}</button></div>
      {addresses.length===0&&editing===null&&<p className="settings-empty">{('No saved addresses yet. Add your first address.')}</p>}
      <div className="settings-addresses">{addresses.map((a,i)=><article className="settings-address" key={a.id||i}><div><strong>{a.label||('Address')}</strong><p>{formatAddress(a)}</p>{a.note&&<small>{a.note}</small>}</div><div className="settings-address-actions"><button className="btn btn-sm btn-outline" type="button" onClick={()=>selectAddress(a)}>{('Use for checkout')}</button><button className="btn btn-sm btn-ghost" type="button" onClick={()=>startAddress(i)}>{('Edit')}</button><button className="btn btn-sm btn-ghost" type="button" onClick={()=>removeAddress(i)}>{('Remove')}</button></div></article>)}</div>
      {editing!==null&&<form className="settings-form settings-address-editor" onSubmit={saveAddress}><h3>{editing==='new'?('New delivery address'):('Edit delivery address')}</h3><label className="form-control"><span>{('Address label')}</span><input className="input input-bordered" maxLength={35} value={draft.label||''} placeholder={('Home / Work')} onChange={e=>setDraft(p=>({...p,label:e.target.value}))}/></label><label className="form-control"><span>{('Address line 1')} *</span><input required minLength={5} className="input input-bordered" value={draft.address1||''} onChange={e=>setDraft(p=>({...p,address1:e.target.value}))}/></label><label className="form-control"><span>{('Address line 2 (optional)')}</span><input className="input input-bordered" value={draft.address2||''} onChange={e=>setDraft(p=>({...p,address2:e.target.value}))}/></label><div className="settings-two-col"><label className="form-control"><span>{('Postcode')} *</span><input required className="input input-bordered" inputMode="numeric" maxLength={5} pattern="[0-9]{5}" value={draft.postcode||''} onChange={e=>setDraft(p=>({...p,postcode:e.target.value}))}/></label><label className="form-control"><span>{('City')} *</span><input required className="input input-bordered" value={draft.city||''} onChange={e=>setDraft(p=>({...p,city:e.target.value}))}/></label></div><label className="form-control"><span>{('State')} *</span><select required className="select select-bordered" value={draft.state||''} onChange={e=>setDraft(p=>({...p,state:e.target.value}))}><option value="" disabled>{('Select state')}</option>{states.map(state=><option key={state} value={state}>{state}</option>)}</select></label><label className="form-control"><span>{('Delivery instructions (optional)')}</span><textarea className="textarea textarea-bordered" rows={2} value={draft.note||''} onChange={e=>setDraft(p=>({...p,note:e.target.value}))}/></label><div className="settings-editor-actions"><button type="submit" className="btn dark-button">{('Save address')}</button><button type="button" className="btn btn-ghost" onClick={()=>setEditing(null)}>{('Cancel')}</button></div></form>}
      </div>
    </div>
  </div></section>
}
