import React, {useEffect, useRef, useState} from 'react';
import {ArrowUp, ArrowUpRight, MessageCircle, Minus, Sparkles, X} from 'lucide-react';
import {getDemoReply} from './chatDemo.js';
import './chat.css';

const actions = {packages:'Lihat semua paket', contact:'Lihat bantuan pemasangan', report:'Buat laporan gangguan', tickets:'Buka Tiket Saya', services:'Buka Layanan Saya'};

export default function ChatWidget({context, request, onNavigate}) {
  const client = context === 'client';
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState([{id:0, role:'assistant', text:client?'Halo, Budi! Saya Nira, asisten virtual Nirwana. Mau tanya soal koneksi internet atau cara melacak laporan gangguan?':'Halo! Saya Nira, asisten virtual Nirwana. Saya bantu cari paket internet yang sesuai kebutuhan Anda. Mau mulai dari mana?'}]);
  const input = useRef(null), launcher = useRef(null), conversation = useRef(null), timer = useRef(null), nextId = useRef(1);
  const prompts = client?['Internet saya lambat','Koneksi terputus','Cek progres tiket']:['Lihat paket rumah','Paket untuk bisnis','Cek area pemasangan'];
  useEffect(()=>()=>clearTimeout(timer.current),[]);
  useEffect(()=>{if(open) input.current?.focus({preventScroll:true})},[open]);
  useEffect(()=>{const field=input.current;if(field){field.style.height='auto';field.style.height=`${Math.min(field.scrollHeight,80)}px`}},[draft,open]);
  useEffect(()=>{if(open&&conversation.current)conversation.current.scrollTop=conversation.current.scrollHeight},[messages,pending,open]);
  useEffect(()=>{if(request?.scope===context){setOpen(true);setDraft(request.question)}},[request,context]);
  function close(){setOpen(false);launcher.current?.focus({preventScroll:true})}
  function send(value){
    const text=value.trim();
    if(!text||pending)return;
    setMessages(previous=>[...previous,{id:nextId.current++,role:'user',text}]);setDraft('');setPending(true);
    timer.current=setTimeout(()=>{setMessages(previous=>[...previous,{id:nextId.current++,role:'assistant',...getDemoReply(text,context)}]);setPending(false)},650);
  }
  function follow(action){
    close();
    if(action==='packages'||action==='contact')document.getElementById(action==='packages'?'layanan':'kontak')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    else onNavigate({report:'/client/tickets/create',tickets:'/client/tickets',services:'/client/services'}[action]);
  }
  return <div className="chat-widget">
    {open&&<section id="nira-chat-panel" className="chat-panel" role="dialog" aria-labelledby="nira-title" aria-describedby="nira-demo" onKeyDown={event=>{if(event.key==='Escape'){event.stopPropagation();close()}}}>
      <header className="chat-header"><span className="chat-avatar"><Sparkles size={21}/></span><div><h2 id="nira-title">Nira AI <span>Demo</span></h2><p>{client?'Asisten bantuan pelanggan':'Asisten pilihan internet'}</p></div><button type="button" onClick={close} aria-label="Tutup chat Nira"><Minus size={20}/></button></header>
      <div className="chat-demo-note" id="nira-demo"><span/>Simulasi percakapan · Balasan contoh</div>
      <div className="chat-conversation" ref={conversation} role="log" aria-live="polite" aria-relevant="additions" aria-label="Percakapan dengan Nira">
        <div className="chat-date">Percakapan demo hari ini</div>
        {messages.map(message=><div className={'chat-message '+message.role} key={message.id}>
          {message.role==='assistant'&&<span className="chat-message-avatar" aria-hidden="true"><Sparkles size={13}/></span>}
          <div><span className="chat-sender">{message.role==='assistant'?'Nira':'Anda'}</span><div className="chat-bubble"><p>{message.text}</p>{message.action&&<button className="chat-action" type="button" onClick={()=>follow(message.action)}>{actions[message.action]}<ArrowUpRight size={14}/></button>}</div></div>
        </div>)}
        {pending&&<div className="chat-typing" role="status"><span/><span/><span/><small>Nira sedang mengetik…</small></div>}
      </div>
      <div className="chat-quick"><span>{messages.length===1?'Coba tanyakan':'Pertanyaan lainnya'}</span><div>{prompts.map(prompt=><button type="button" key={prompt} onClick={()=>send(prompt)} disabled={pending}>{prompt}<ArrowUpRight size={12}/></button>)}</div></div>
      <form className="chat-composer" onSubmit={event=>{event.preventDefault();send(draft)}}>
        <label className="sr-only" htmlFor="nira-question">Tulis pertanyaan untuk Nira</label>
        <textarea ref={input} id="nira-question" value={draft} onChange={event=>setDraft(event.target.value)} maxLength={500} rows={1} placeholder={client?'Ceritakan kendala internet Anda…':'Tanya paket atau kebutuhan Anda…'} onKeyDown={event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.nativeEvent.isComposing){event.preventDefault();send(draft)}}}/>
        <button type="submit" disabled={!draft.trim()||pending} aria-label="Kirim pertanyaan"><ArrowUp size={18}/></button>
      </form>
      <footer className="chat-footer">Demo UI · Tidak terhubung ke layanan AI</footer>
    </section>}
    <button className={'chat-launcher '+(open?'is-open':'')} type="button" ref={launcher} aria-controls="nira-chat-panel" aria-expanded={open} aria-label={open?'Minimalkan chat Nira':'Buka chat Nira AI'} onClick={()=>open?close():setOpen(true)}>{open?<X size={20}/>:<MessageCircle size={20}/>}<span>{open?'Tutup chat':'Tanya Nira AI'}</span>{!open&&<i/>}</button>
  </div>;
}
