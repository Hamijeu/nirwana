import {useEffect} from 'react';

export default function useHeroScroll(wrapper,media,content) {
  useEffect(()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktop=window.matchMedia('(min-width: 1024px)');
    let frame=0,progress=0,lastTime=0;
    const publishHidden=hidden=>{const node=wrapper.current;if(node&&node.dataset.copyHidden!==String(hidden)){node.dataset.copyHidden=String(hidden);node.dispatchEvent(new CustomEvent('hero-copy-visibility',{detail:{hidden}}));}};
    const reset=()=>{
      publishHidden(false);
      media.current?.style.removeProperty('clip-path');
      if(content.current){content.current.style.removeProperty('opacity');content.current.style.removeProperty('transform');content.current.inert=false;}
    };
    const draw=time=>{
      frame=0;
      if(!wrapper.current||!media.current||!content.current||reduced.matches){reset();return;}
      const pinned=desktop.matches;
      const distance=pinned?window.innerHeight*.7:wrapper.current.offsetHeight;
      const target=Math.max(0,Math.min(1,-wrapper.current.getBoundingClientRect().top/distance));
      const delta=lastTime?Math.min(64,time-lastTime):16;lastTime=time;
      progress+= (target-progress)*(1-Math.exp(-delta/110));
      if(Math.abs(target-progress)<.0005)progress=target;
      const fade=pinned?Math.min(1,progress/.6):progress;
      media.current.style.clipPath=pinned?`inset(${88*progress}px ${20*progress}px ${20*progress}px ${20*progress}px round ${12*progress}px)`:'none';
      content.current.style.opacity=String(1-fade);
      content.current.style.transform=pinned?`translateY(${-14*progress}%)`:`translateY(${-48*progress}px)`;
      content.current.inert=fade>=.99;
      publishHidden(fade>=.99);
      if(progress!==target)frame=requestAnimationFrame(draw);
    };
    const update=()=>{if(!frame&&!reduced.matches)frame=requestAnimationFrame(draw);};
    const configure=()=>{if(frame)cancelAnimationFrame(frame);frame=0;progress=0;lastTime=0;reset();update();};
    window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',configure);
    reduced.addEventListener('change',configure);desktop.addEventListener('change',configure);configure();
    return()=>{if(frame)cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',configure);reduced.removeEventListener('change',configure);desktop.removeEventListener('change',configure);reset();};
  },[wrapper,media,content]);
}
