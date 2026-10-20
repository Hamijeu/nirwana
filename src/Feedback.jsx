import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {AlertCircle, AlertTriangle, RotateCcw, WifiOff, X} from 'lucide-react';
import {submissionFailure, validateUpload, fieldValidationMessage} from './feedbackPolicy.js';
import './feedback.css';

const FeedbackContext=createContext(null);
export const useFeedback=()=>useContext(FeedbackContext);

export function FeedbackProvider({children}) {
  const [online,setOnline]=useState(()=>navigator.onLine);
  const [scenario,setScenarioState]=useState('normal');
  const [notice,setNotice]=useState(null);
  const scenarioRef=useRef('normal');
  useEffect(()=>{const update=()=>{setOnline(navigator.onLine);setNotice(null)};window.addEventListener('online',update);window.addEventListener('offline',update);return()=>{window.removeEventListener('online',update);window.removeEventListener('offline',update)}},[]);
  function setScenario(value){scenarioRef.current=value;setScenarioState(value);setNotice(null)}
  function showError(problem){setNotice({type:'error',...problem})}
  function checkOperation(kind='save') {
    const failure=submissionFailure({online:navigator.onLine&&scenarioRef.current!=='offline',scenario:scenarioRef.current,login:kind==='login'});
    if(!failure){setNotice(null);return true}
    setNotice(failure);
    if(failure.code!=='offline'){scenarioRef.current='normal';setScenarioState('normal')}
    return false;
  }
  function captureSubmit(event){
    if(event.target.dataset.localForm==='true')return;
    if(!checkOperation()){event.preventDefault();event.stopPropagation()}
  }
  function captureInvalid(event){
    event.preventDefault();
    if(event.target.form?.querySelector(':invalid')!==event.target)return;
    const label=event.target.closest('label')?.querySelector('span')?.textContent||event.target.getAttribute('aria-label')||'Kolom form';
    showError({title:'Periksa kembali isian Anda',message:fieldValidationMessage({label,validity:event.target.validity,min:event.target.min,max:event.target.max,minLength:event.target.minLength})});
    event.target.focus();
  }
  function captureFile(event){
    const input=event.target;
    if(input.type!=='file')return;
    for(const file of input.files||[]){const problem=validateUpload(file,input.accept);if(problem){input.value='';showError(problem);return}}
    if(input.files?.length)setNotice(null);
  }
  const disconnected=!online||scenario==='offline';
  const visible=notice||(disconnected?submissionFailure({online:false}):null);
  function recover(){setScenario('normal');setOnline(navigator.onLine)}
  const Icon=visible?.code==='offline'?WifiOff:visible?.type==='warning'?AlertTriangle:AlertCircle;
  return <FeedbackContext.Provider value={{scenario,setScenario,checkOperation,showError}}><div className="feedback-root" onSubmitCapture={captureSubmit} onInvalidCapture={captureInvalid} onChangeCapture={captureFile}>
    {children}
    {visible&&<aside className={'feedback-notice '+visible.type} role="alert" aria-live="assertive"><Icon size={21}/><div><strong>{visible.title}</strong><p>{visible.message}</p>{disconnected?<button type="button" onClick={recover}><RotateCcw size={13}/>{scenario==='offline'?'Pulihkan koneksi demo':'Periksa koneksi lagi'}</button>:<small>Perbaiki isian atau kirim ulang saat siap.</small>}{scenario!=='normal'&&<small>Skenario demo sedang aktif.</small>}</div>{!disconnected&&<button type="button" className="feedback-close" aria-label="Tutup peringatan" onClick={()=>setNotice(null)}><X size={17}/></button>}</aside>}
  </div></FeedbackContext.Provider>;
}

export function DemoWarningControls({onSelect,onLogin}) {
  const {scenario,setScenario}=useFeedback();
  return <div className="demo-warning-controls"><label htmlFor="warning-scenario">Simulasi peringatan</label><select id="warning-scenario" value={scenario} onChange={event=>{const value=event.target.value;setScenario(value);onSelect();if(value==='auth')onLogin()}}>
    <option value="normal">Normal</option><option value="auth">Gagal login berikutnya</option><option value="offline">Koneksi terputus (offline)</option><option value="timeout">Timeout permintaan berikutnya</option><option value="save">Gagal menyimpan berikutnya</option>
  </select><p>Gagal login, timeout, dan gagal simpan berlaku sekali. Offline aktif sampai dipulihkan.</p></div>;
}
