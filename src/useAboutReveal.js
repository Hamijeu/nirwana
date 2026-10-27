import {useEffect} from 'react';

export default function useAboutReveal(root){
  useEffect(()=>{
    const element=root.current;if(!element||!('IntersectionObserver'in window))return;
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');let observer;
    const sections=[...element.querySelectorAll(':scope > section:not(:first-child)')];
    const reset=()=>{observer?.disconnect();element.removeAttribute('data-about-motion');sections.forEach(section=>section.classList.remove('is-about-visible'))};
    const configure=()=>{
      reset();if(reduced.matches)return;
      element.dataset.aboutMotion='ready';
      observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-about-visible');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -30px 0px'});
      sections.forEach(section=>observer.observe(section));
    };
    configure();reduced.addEventListener('change',configure);
    return()=>{reduced.removeEventListener('change',configure);reset()};
  },[root]);
}
