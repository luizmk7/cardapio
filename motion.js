const reduceMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const supported=element=>element&&typeof element.animate==='function'&&!reduceMotion();
const center=rect=>({x:rect.left+rect.width/2,y:rect.top+rect.height/2});
const finished=animation=>animation.finished.catch(()=>{});

export function animateProductOpen(element,sourceRect,size=0,sourceEl=null){
  if(!element)return;
  const scale=[.82,.96,1.1][size] ?? 1;
  element.getAnimations().forEach(a=>a.cancel());
  element.style.transform=`scale(${scale})`;
  if(!supported(element)){
    element.style.opacity='1';
    return;
  }
  const from = sourceRect || (sourceEl ? sourceEl.getBoundingClientRect() : null);
  const to = element.getBoundingClientRect();
  if(from && from.width > 0 && to.width > 0 && from.top < window.innerHeight && from.bottom > 0){
    const a = center(from), b = center(to), ratio = to.width / from.width;
    const deltaX = b.x - a.x, deltaY = b.y - a.y;
    const ghost = (sourceEl || element).cloneNode(true);
    ghost.removeAttribute('role');
    ghost.setAttribute('aria-hidden','true');
    ghost.className = 'pizza-art flying-product';
    Object.assign(ghost.style,{
      position:'fixed',
      top:from.top+'px',
      left:from.left+'px',
      width:from.width+'px',
      height:from.height+'px',
      margin:'0',
      transform:'none',
      zIndex:'150',
      pointerEvents:'none'
    });
    const host = document.getElementById('product-dialog') || document.body;
    host.append(ghost);
    element.style.opacity = '0';
    const animation = ghost.animate([
      {transform:'translate(0,0) scale(1)',opacity:1},
      {transform:`translate(${deltaX*.55}px,${deltaY*.3-12}px) scale(${1+(ratio-1)*.55})`,opacity:1,offset:.45},
      {transform:`translate(${deltaX}px,${deltaY}px) scale(${ratio})`,opacity:1}
    ],{duration:300,easing:'cubic-bezier(.32,.02,.31,1)',fill:'forwards'});
    finished(animation).then(()=>{
      ghost.remove();
      element.style.opacity = '1';
      element.animate([
        {transform:`scale(${scale})`},
        {transform:`scale(${scale*1.06})`,offset:.4},
        {transform:`scale(${scale})`}
      ],{duration:300,easing:'ease-out'});
    });
  } else {
    element.animate([
      {opacity:0,transform:`scale(${scale*.98})`},
      {opacity:1,transform:`scale(${scale})`}
    ],{duration:280,easing:'cubic-bezier(.22,1,.36,1)'});
  }
}
export function animateProductSize(element,size,animate=true){
  if(!element)return;
  const before=getComputedStyle(element).transform;
  const scale=[.82,.96,1.1][size] ?? 1;
  element.getAnimations().forEach(a=>a.cancel());
  element.style.transform=`scale(${scale})`;
  if(animate&&supported(element))element.animate([
    {transform:before}, {transform:element.style.transform}
  ],{duration:260,easing:'cubic-bezier(.22,1,.36,1)'});
}

export function captureProduct(element){
  if(!element)return null;
  return {element:element.cloneNode(true),rect:element.getBoundingClientRect()};
}

export function flyProduct(snapshot,target,{cart=false}={}){
  if(!snapshot||!target||!supported(target))return Promise.resolve();
  const ghost=snapshot.element,from=snapshot.rect,to=target.getBoundingClientRect();
  if(to.width===0||to.bottom<0||to.top>window.innerHeight)return Promise.resolve();
  const a=center(from),b=center(to),ratio=to.width/from.width;
  ghost.removeAttribute('role');ghost.setAttribute('aria-hidden','true');
  ghost.className='pizza-art flying-product';
  Object.assign(ghost.style,{position:'fixed',top:from.top+'px',left:from.left+'px',width:from.width+'px',height:from.height+'px',margin:'0',transform:'none',zIndex:'80',pointerEvents:'none'});
  document.body.append(ghost);
  const animation=ghost.animate([
    {transform:'translate(0,0) scale(1)',opacity:1},
    {transform:`translate(${(b.x-a.x)*.55}px,${(b.y-a.y)*.3-12}px) scale(.75)`,opacity:1,offset:.45},
    {transform:`translate(${b.x-a.x}px,${b.y-a.y}px) scale(${cart ? .13 : ratio})`,opacity:cart?0:1}
  ],{duration:cart?400:300,easing:'cubic-bezier(.32,.02,.31,1)',fill:'forwards'});
  return finished(animation).then(()=>{ghost.remove();if(cart&&supported(target))target.animate([{transform:'scale(1)'},{transform:'scale(1.06)',offset:.4},{transform:'scale(1)'}],{duration:300,easing:'ease-out'});});
}

const priceFrames=new WeakMap();
export function animatePrice(element,value,format){
  if(!element)return;
  cancelAnimationFrame(priceFrames.get(element));
  const before=Number(element.dataset.amount);
  if(!element.dataset.amount||before===value||reduceMotion()){
    element.innerHTML=format(value);element.dataset.amount=String(value);return;
  }
  const start=performance.now();
  const tick=now=>{const progress=Math.min(1,(now-start)/260),eased=1-Math.pow(1-progress,3),amount=Math.round(before+(value-before)*eased);element.innerHTML=format(amount);element.dataset.amount=String(amount);if(progress<1)priceFrames.set(element,requestAnimationFrame(tick));};
  priceFrames.set(element,requestAnimationFrame(tick));
}
