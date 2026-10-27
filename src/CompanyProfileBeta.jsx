import React, {useEffect} from 'react';
import {ArrowLeft, ExternalLink} from 'lucide-react';
import './company-reference.css';

export default function CompanyProfileBeta({Link}) {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Company Profile Beta Page — Nirwana';
    return () => { document.title = previous; };
  }, []);
  return <main className="company-beta-page">
    <div className="company-beta-toolbar">
      <Link to="/"><ArrowLeft size={15}/> Company Profile</Link>
      <span>Company Profile Beta Page <small>Salinan referensi</small></span>
      <a href="https://company-staging.nirwana.id/" target="_blank" rel="noopener noreferrer">Sumber <ExternalLink size={14}/></a>
    </div>
    <iframe title="Company Profile Beta Page — salinan referensi" src={`${import.meta.env.BASE_URL}company-reference/index.html`} sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"/>
  </main>;
}
