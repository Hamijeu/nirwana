import {useEffect} from 'react';

export default function useSubscriptionScroll(section,setActive){
  useEffect(()=>{
    const desktop=window.matchMedia('(min-width: 1024px)'),reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame=0;
    const draw=()=>{
      frame=0;
      if(!section.current)return;
      if(reduced.matches){section.current.style.removeProperty('--subscription-progress');section.current.style.removeProperty('clip-path');return;}
      const top=section.current.getBoundingClientRect().top;
      const entrance=Math.max(0,Math.min(1,(window.innerHeight-top)/(window.innerHeight*.7)));
      section.current.style.clipPath=`inset(0 ${12*(1-entrance)}px 0 ${12*(1-entrance)}px round ${24*(1-entrance)}px)`;
      if(!desktop.matches){section.current.style.removeProperty('--subscription-progress');return;}
      const progress=Math.max(0,Math.min(1,-top/(window.innerHeight*1.04)));
      section.current.style.setProperty('--subscription-progress',String(progress));
      const next=Math.min(3,Math.max(0,Math.floor(progress*3.4+.4)));
      setActive(current=>current===next?current:next);
    };
    const update=()=>{if(!frame)frame=requestAnimationFrame(draw)};
    window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);desktop.addEventListener('change',update);reduced.addEventListener('change',update);update();
    return()=>{if(frame)cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update);desktop.removeEventListener('change',update);reduced.removeEventListener('change',update);section.current?.style.removeProperty('--subscription-progress');section.current?.style.removeProperty('clip-path');};
  },[section,setActive]);
  return index=>{
    setActive(index);
    if(window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)').matches&&section.current){
      const top=section.current.getBoundingClientRect().top+window.scrollY;
      window.scrollTo({top:top+(index/3.4)*window.innerHeight*1.04,behavior:'instant'});
    }
  };
}
