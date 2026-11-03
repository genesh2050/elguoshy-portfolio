(() => {
  'use strict';
  const CONTENT_KEY='elguoshy-content-v8', DRAFT_KEY='elguoshy-draft-v8';
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const clone=o=>JSON.parse(JSON.stringify(o));
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const iconPaths={
    arrow:'<path d="M19 12H5m6-6-6 6 6 6"/>', diagonal:'<path d="M17 17V7H7m10 0L6 18"/>', down:'<path d="M12 4v16m-6-6 6 6 6-6"/>',
    bag:'<path d="M5 8h14l1 13H4L5 8Z"/><path d="M8 9V6a4 4 0 0 1 8 0v3"/>', menu:'<path d="M4 7h16M4 12h16M4 17h16"/>', close:'<path d="m6 6 12 12M18 6 6 18"/>',
    check:'<path d="m5 12 4 4 10-10"/>', plus:'<path d="M12 5v14M5 12h14"/>', edit:'<path d="m15 4 5 5M4 20l4-1 12-12a2.1 2.1 0 0 0-3-3L5 16l-1 4Z"/>',
    building:'<path d="M4 21V3h11v18M15 9h5v12M2 21h20M8 7h3M8 11h3M8 15h3M8 21v-3h3v3M18 13v1M18 17v1"/>',
    store:'<path d="M4 10v11h16V10M3 4h18l1 6a3 3 0 0 1-5 2 3 3 0 0 1-5 0 3 3 0 0 1-5 0 3 3 0 0 1-5-2l1-6Z"/><path d="M8 21v-6h8v6M8 4l-1 6M16 4l1 6"/>',
    graduation:'<path d="m2 8 10-5 10 5-10 5L2 8Zm4 3v7a13 13 0 0 0 12 0v-7M22 8v9"/>', medical:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z"/>',
    spark:'<path d="m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z"/>', search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    sliders:'<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="currentColor"/><circle cx="16" cy="12" r="2" fill="currentColor"/><circle cx="8" cy="18" r="2" fill="currentColor"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.2"/>', trash:'<path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7"/>',
    download:'<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>', upload:'<path d="M12 16V4m-5 5 5-5 5 5M4 16v5h16v-5"/>',
    whatsapp:'<path d="M20 11.7A8.3 8.3 0 0 1 7.5 19l-5 1 1.3-4.8A8.3 8.3 0 1 1 20 11.7Z"/><path d="M8 7c-2 2 3 7 5 7l2-1-2-2-1 1-3-3 1-1-2-1Z"/>',
    sign:'<path d="M3 5h18v11H3zM7 16v5M17 16v5M7 9h10M9 12h6"/>',
    print:'<path d="M6 8V3h12v5M6 17H3V8h18v9h-3M6 14h12v7H6zM17 11h1"/>',
    layers:'<path d="m12 2 10 6-10 6L2 8l10-6ZM2 12l10 6 10-6M2 16l10 6 10-6"/>',
    social:'<path d="M3 3h18v14H9l-6 5V3Z"/><path d="m10 7 6 3-6 3V7Z"/>',
    gift:'<path d="M3 9h18v4H3zM5 13v8h14v-8M12 9v12"/><path d="M12 9H8a3 3 0 1 1 3-3l1 3Zm0 0h4a3 3 0 1 0-3-3l-1 3Z"/>',
    calendar:'<path d="M3 5h18v16H3zM7 2v6M17 2v6M3 10h18M7 14h2M12 14h2M7 18h2"/>',
    web:'<rect x="2" y="3" width="20" height="14" rx="1"/><path d="M8 21h8M12 17v4M2 7h20"/>',
    flag:'<path d="M5 22V2m0 1h14l-3 4 3 4H5M2 22h6"/>'
  };
  const icon=name=>`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name]||iconPaths.spark}</svg>`;
  function hydrateIcons(root=document){root.querySelectorAll('[data-icon]').forEach(n=>{n.innerHTML=icon(n.dataset.icon);});}
  const num=n=>new Intl.NumberFormat('ar-EG').format(n);
  const normalize=s=>String(s).normalize('NFKD').replace(/[\u064B-\u065F\u0670]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').toLowerCase().trim();
  function externalURL(raw){try{const u=new URL(String(raw||''));return /^https?:$/.test(u.protocol)&&!u.username&&!u.password?u.href:'';}catch{return '';}}
  function mediaURL(raw){const value=window.PORTFOLIO_V6_UPGRADE.assetPaths[String(raw||'')]||String(raw||'');if(/^assets\/[a-zA-Z0-9._-]+$/.test(value)||/^\/api\/media\/[a-f0-9]{64}\.webp$/.test(value))return value;if(/^data:image\/(?:png|jpeg|webp|gif);base64,[a-zA-Z0-9+/=]+$/.test(value))return value;return externalURL(value);}
  function validPhoto(p){const atlas=p&&window.PORTFOLIO_ATLASES[p.atlas];return Boolean(atlas&&Number.isInteger(p.index)&&p.index>=0&&p.index<atlas.cols*atlas.rows);}
  let photoObserver,photoHydrationQueued=false;
  const observedPhotos=new Set();
  function schedulePhotos(){
    if(photoHydrationQueued)return;photoHydrationQueued=true;
    queueMicrotask(()=>{
      photoHydrationQueued=false;
      if(!photoObserver)photoObserver=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){for(const img of entry.target.querySelectorAll('image[data-src]')){img.setAttribute('href',img.dataset.src);delete img.dataset.src;}photoObserver.unobserve(entry.target);observedPhotos.delete(entry.target);}},{rootMargin:'240px'});
      for(const node of observedPhotos)if(!node.isConnected){photoObserver.unobserve(node);observedPhotos.delete(node);}
      for(const img of document.querySelectorAll('image[data-src]')){const node=img.closest('.media-photo');if(!observedPhotos.has(node)){photoObserver.observe(node);observedPhotos.add(node);}}
    });
  }
  function photoHTML(p,label,className=''){
    if(!validPhoto(p))return `<div class="media-fallback ${esc(className)}" role="img" aria-label="${esc(label)}">${icon('layers')}</div>`;
    const lazy=typeof window.IntersectionObserver==='function';if(lazy)schedulePhotos();
    const a=window.PORTFOLIO_ATLASES[p.atlas],col=p.index%a.cols,row=Math.floor(p.index/a.cols);
    const xs=a.xs||Array.from({length:a.cols+1},(_,i)=>i/a.cols),ys=a.ys||Array.from({length:a.rows+1},(_,i)=>i/a.rows);
    const inset=a.inset||0,x=xs[col]*a.width+inset,y=ys[row]*a.height+inset,width=(xs[col+1]-xs[col])*a.width-2*inset,height=(ys[row+1]-ys[row])*a.height-2*inset;
    return `<svg class="media-photo ${esc(className)}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid ${className.includes('contain')?'meet':'slice'}" role="img" aria-label="${esc(label)}"><svg x="0" y="0" width="${width}" height="${height}" viewBox="${x} ${y} ${width} ${height}" overflow="hidden" aria-hidden="true"><image ${lazy?'data-src':'href'}="${esc(mediaURL(a.src))}" width="${a.width}" height="${a.height}"/></svg></svg>`;
  }
  function artworkHTML(src,label){return `<div class="original-art-showcase"><img src="${esc(mediaURL(src))}" alt="${esc(label)}" loading="lazy" decoding="async"></div>`;}
  function migrateData(v){
    if(!v||typeof v!=='object')throw Error('ملف النسخة غير متوافق.');
    if(v.version===8)return scrubRemovedModes(clone(v));
    if(v.version===7){
      const out=clone(v);out.version=8;if(!out.brand)throw Error('ملف النسخة غير متوافق.');
      const previous=out.brand.facebook||'',isGroup=/^https?:\/\/(?:www\.)?facebook\.com\/groups\//i.test(previous);
      if(typeof out.brand.facebookGroup!=='string')out.brand.facebookGroup=isGroup?previous:window.PORTFOLIO_DEFAULTS.brand.facebookGroup;
      if(isGroup)out.brand.facebook=window.PORTFOLIO_DEFAULTS.brand.facebook;
      return scrubRemovedModes(out);
    }
    if(v.version===6){
      const out=clone(v);out.version=7;
      if(!Array.isArray(out.services))throw Error('ملف النسخة غير متوافق.');
      const stamp=out.services.find(s=>s.id==='crystal-stamps');
      if(stamp&&!stamp.images?.length&&!validPhoto(stamp.photo)){stamp.photo=clone(window.PORTFOLIO_DEFAULTS.services.find(s=>s.id==='crystal-stamps').photo);stamp.awaitingReference=false;}
      return migrateData(out);
    }
    if(v.version===5){
      const out=clone(v),patch=window.PORTFOLIO_V6_UPGRADE;out.version=6;
      if(!Array.isArray(out.services)||!Array.isArray(out.projects))throw Error('ملف النسخة غير متوافق.');
      for(const change of patch.services){const item=out.services.find(s=>s.id===change.id);if(change.add){if(!item)out.services.push(clone(change.add));}else if(item)Object.assign(item,clone(change.set));}
      for(const item of [...out.services,...out.projects])if(Array.isArray(item.images))item.images=item.images.map(src=>patch.assetPaths[src]||src);
      for(const service of out.services)if(service.galleryProject){const project=out.projects.find(p=>p.id===service.galleryProject);if(project){if(project.images?.length&&(!service.images?.length||project.images.some(src=>!src.startsWith('assets/'))))service.images=clone(project.images);project.galleryService=service.id;project.images=[];project.photos=[];}}
      return migrateData(out);
    }
    if(v.version===4){
      const out=clone(v);out.version=5;
      for(const key of ['services','projects']){if(!Array.isArray(out[key]))throw Error('ملف النسخة غير متوافق.');for(const change of window.PORTFOLIO_V5_UPGRADE[key]){const item=out[key].find(x=>x.id===change.id);if(change.add){if(!item)out[key].push(clone(change.add));}else if(item)Object.assign(item,clone(change.set||{}));}}
      return migrateData(out);
    }
    if(v.version===3){
      const out=clone(v),patch=window.PORTFOLIO_V4_UPGRADE;out.version=4;
      for(const key of ['families','services','projects']){if(!Array.isArray(out[key]))throw Error('ملف النسخة غير متوافق.');for(const change of patch[key]){const item=out[key].find(x=>x.id===change.id);if(change.add){if(!item)out[key].push(clone(change.add));}else if(item){Object.assign(item,clone(change.set||{}));for(const field of change.remove||[])delete item[field];}}}
      return migrateData(out);
    }
    if(![1,2].includes(v.version))throw Error('ملف النسخة غير متوافق.');
    const base=window.PORTFOLIO_DEFAULTS,out=clone(base);
    delete out.marketingRevision;
    out.brand={...base.brand,...v.brand,headline:base.brand.headline,intro:base.brand.intro,about:base.brand.about,accent:base.brand.accent};
    if(/^https?:\/\/(?:www\.)?facebook\.com\/groups\//i.test(v.brand?.facebook||'')){out.brand.facebookGroup=v.brand.facebook;out.brand.facebook=base.brand.facebook;}
    out.sectors=Array.isArray(v.sectors)?clone(v.sectors):clone(base.sectors);
    if(Array.isArray(v.packages)){out.packages=clone(v.packages);if(v.version===1)for(const id of ['company-gifts','shop-seasonal']){const p=base.packages.find(p=>p.id===id);if(p&&!out.packages.some(x=>x.id===id))out.packages.push(clone(p));}}
    for(const f of v.families||[])if(!out.families.some(x=>x.id===f.id))out.families.push({...clone(f),photo:validPhoto(f.photo)?f.photo:base.families[3].photo});
    for(const s of v.services||[]){const current=out.services.find(x=>x.id===s.id);if(current){if(s.price)current.price=s.price;}else out.services.push({...clone(s),photo:validPhoto(s.photo)?s.photo:(out.families.find(f=>f.id===s.family)?.photo||base.families[3].photo)});}
    // The owner rejected the old client-named gallery and its images. Older copies
    // retain their original storage key, but never repopulate the new public UI.
    for(const p of base.packages.filter(p=>p.kind==='marketing'))if(!out.packages.some(x=>x.id===p.id))out.packages.push(clone(p));
    out.projects=clone(base.projects);
    return scrubRemovedModes(out);
  }
  function upgradeMarketingContent(v){
    if(v.marketingRevision===1||!Array.isArray(v.packages))return v;
    const stories=/(?:ستوري|ستورى|استوري|استورى|\bstor(?:y|ies)\b)/i;
    for(const p of v.packages){
      if(p.kind!=='marketing'||!Array.isArray(p.features))continue;
      p.features=p.features.map(f=>typeof f==='string'?f.split(/\s*\+\s*/).filter(part=>!stories.test(part)).join(' + ').trim():f).filter(f=>typeof f!=='string'||f.length);
      if(p.id==='marketing-start'){
        const count=p.features.findIndex(f=>typeof f==='string'&&/^\s*[\d٠-٩۰-۹]+\s+منشور/.test(f));
        if(count>=0)p.features[count]='١٢ منشورًا ثابتًا شهريًا';
        else p.features.splice(Math.min(1,p.features.length),0,'١٢ منشورًا ثابتًا شهريًا');
      }
    }
    v.marketingRevision=1;
    return v;
  }
  function scrubRemovedModes(v){if(v.brand?.headline==='خلّي شغلك يتشاف.')v.brand.headline=v.brand.name==='محمد الجيوشي'?'محمد|الجيوشي':v.brand.name;if(v.brand?.intro==='تصميم يعبّر عنك. وطباعة تليق بشغلك.')v.brand.intro='تصميم جرافيك ودعاية وإعلان';if(Array.isArray(v.services))for(const item of v.services)if(Array.isArray(item.modes))item.modes=item.modes.filter(m=>typeof m!=='string'||!m.includes('ملف جاهز'));return upgradeMarketingContent(v);}
  function validateData(value){
    const v=migrateData(value);
    if(v.version!==8||!v.brand||!Array.isArray(v.sectors)||!Array.isArray(v.packages)||!Array.isArray(v.projects)||!Array.isArray(v.families)||!Array.isArray(v.services))throw Error('ملف النسخة غير متوافق.');
    if(!v.brand.name||!v.brand.studio||!v.brand.headline||!/^#[0-9a-f]{6}$/i.test(v.brand.accent||''))throw Error('راجع اسم الهوية والعنوان واللون.');
    if(!externalURL(v.brand.facebook))throw Error('رابط صفحة فيسبوك غير صحيح.');
    if(v.brand.facebookGroup&&!externalURL(v.brand.facebookGroup))throw Error('رابط جروب الأعمال غير صحيح.');
    if(!normalizePhone(v.brand.whatsapp))throw Error('رقم واتساب غير صحيح. استخدم كود الدولة.');
    const sectorIds=v.sectors.map(s=>s.id), required=['companies','shops','teachers','clinics'];
    if(sectorIds.length!==4||!required.every(s=>sectorIds.includes(s))||!v.sectors.every(s=>s.name&&s.description&&s.icon&&s.note))throw Error('فئات الخدمات غير متوافقة.');
    if(v.packages.length>100||v.projects.length>100||v.services.length>250||v.families.length>30||!v.families.length)throw Error('عدد العناصر أكبر من نطاق النسخة.');
    const unique=items=>new Set(items.map(i=>i.id)).size===items.length;
    if(!unique(v.packages)||!unique(v.projects)||!unique(v.services)||!unique(v.families))throw Error('الملف يحتوي على عناصر مكررة.');
    const ids=v.families.map(f=>f.id),validId=id=>/^[a-z0-9-]+$/i.test(id);
    for(const f of v.families)if(!validId(f.id)||!f.name||!f.description||!f.icon)throw Error('راجع بيانات قسم الخدمات.');
    for(const s of v.services)if(!validId(s.id)||!ids.includes(s.family)||!s.name||!s.description||!Array.isArray(s.features)||!s.features.every(f=>typeof f==='string')||!Array.isArray(s.audiences)||!s.audiences.length||!s.audiences.every(a=>sectorIds.includes(a))||!Array.isArray(s.modes)||!s.modes.length||!s.modes.every(m=>typeof m==='string'&&m.length>0)||!Array.isArray(s.aliases)||!s.aliases.every(a=>typeof a==='string')||typeof s.needsSize!=='boolean'||!['','مضيء','غير مضيء','حسب التكوين'].includes(s.lighting))throw Error('راجع تصنيف الخدمة ومواصفاتها.');
    for(const item of v.services)if(item.measurement&&!['count','linear'].includes(item.measurement))throw Error('راجع وحدة احتساب الخدمة.');
    for(const item of v.services)if(item.measurement==='linear'&&(item.needsSize||!Number.isFinite(item.fixedHeightCm)||item.fixedHeightCm<=0||item.fixedHeightCm>10000))throw Error('راجع الارتفاع الثابت وتسعير المتر الطولي.');
    for(const item of v.services){if(item.shapes&&(!Array.isArray(item.shapes)||!item.shapes.length||item.shapes.length>10||new Set(item.shapes).size!==item.shapes.length||!item.shapes.every(x=>typeof x==='string'&&x.trim()&&x.length<=40)))throw Error('راجع أشكال الخدمة.');if(item.images&&(!Array.isArray(item.images)||item.images.length>10||!item.images.every(mediaURL)))throw Error('راجع صور الخدمة.');if(item.source&&!externalURL(item.source))throw Error('رابط مصدر الخدمة غير صحيح.');}
    for(const item of [...v.families,...v.services])if(item.photo&&!validPhoto(item.photo))throw Error('راجع الصورة المختارة للخدمة أو القسم.');
    for(const p of v.packages){if(p.kind&&!['marketing','activity'].includes(p.kind))throw Error('راجع نوع الباقة.');if(!/^[a-z0-9-]+$/i.test(p.id)||!sectorIds.includes(p.sector)||!p.name||!p.description||!Array.isArray(p.features)||p.features.length>20||!p.features.every(f=>typeof f==='string'))throw Error('بيانات إحدى الباقات غير مكتملة.');}
    for(const p of v.projects){if(!/^[a-z0-9-]+$/i.test(p.id)||!p.name||!p.description||!['social','print','brand','packaging','signs','gifts','seasonal','exhibitions','awards','digital'].includes(p.category)||!sectorIds.includes(p.sector)||!['design','execution','both','concept','showcase'].includes(p.stage)||!Array.isArray(p.related)||!Array.isArray(p.images)||p.images.length>10||!p.images.every(mediaURL)||!Array.isArray(p.services)||!p.services.every(s=>typeof s==='string')||!/^#[0-9a-f]{6}$/i.test(p.color))throw Error('بيانات أحد الأعمال غير صحيحة.');if(p.photos&&(!Array.isArray(p.photos)||p.photos.length>10||!p.photos.every(validPhoto)))throw Error('راجع صور النموذج.');if(p.source&&!externalURL(p.source))throw Error('رابط مصدر أحد الأعمال غير صحيح.');}
    for(const p of v.projects)if(p.galleryService&&!v.services.some(s=>s.id===p.galleryService))throw Error('خدمة صور المشروع غير موجودة.');
    return clone(v);
  }
  function normalizePhone(raw){let s=String(raw||'').replace(/[٠-٩]/g,c=>String(c.charCodeAt(0)-1632)).replace(/[۰-۹]/g,c=>String(c.charCodeAt(0)-1776)).replace(/[^0-9]/g,'');if(s.startsWith('00'))s=s.slice(2);if(s.length===11&&s.startsWith('01'))s='20'+s.slice(1);return /^\d{10,15}$/.test(s)?s:'';}
  const readLocal=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))||fallback;}catch{return fallback;}};
  let data;try{data=validateData(window.PORTFOLIO_DEFAULTS);}catch{data=clone(window.PORTFOLIO_DEFAULTS);}
  let activeSector='companies', workSearch='', workAudience='all', search='', toastTimer, activeFamily=null, familyView='services';
  const savedDraft=readLocal(DRAFT_KEY,null)||readLocal('elguoshy-draft-v7',null)||readLocal('elguoshy-draft-v6',null)||readLocal('elguoshy-draft-v5',null)||readLocal('elguoshy-draft-v4',null)||readLocal('elguoshy-draft-v3',null)||readLocal('elguoshy-draft-v2',null)||readLocal('elguoshy-draft-v1',{});
  const selected=new Set((Array.isArray(savedDraft.packages)?savedDraft.packages:[]).filter(id=>data.packages.some(p=>p.id===id)));
  const categories={digital:'مواقع وتطبيقات',signs:'يفط وواجهات المحلات',brand:'هوية بصرية',print:'مطبوعات',social:'سوشيال ومحتوى',packaging:'هوية وتغليف',gifts:'هدايا دعائية',seasonal:'دعاية موسمية',awards:'تكريم وشهادات',exhibitions:'معارض واستاندات'};
  const stages={showcase:'نماذج معروضة',concept:'نموذج توضيحي',design:'تصميم',execution:'تنفيذ',both:'تصميم وتنفيذ'};
  function makeId(prefix='line'){return prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8);}
  function cleanServiceLine(raw){
    const s=data.services.find(s=>s.id===raw.serviceId);if(!s)throw Error('الخدمة مش موجودة في الدليل.');
    const numeric=x=>String(x??'').replace(/[٠-٩]/g,c=>c.charCodeAt(0)-1632).replace(/[٫,]/g,'.').trim(),linear=s.measurement==='linear';
    const width=s.needsSize?numeric(raw.width):'',height=s.needsSize?numeric(raw.height):'';
    if(Boolean(width)!==Boolean(height))throw Error('اكتب العرض والارتفاع مع بعض، أو سيب المقاسات لوقت المعاينة.');
    for(const value of [width,height])if(value&&(!Number.isFinite(Number(value))||Number(value)<=0||Number(value)>100000))throw Error('راجع المقاسات المكتوبة.');
    let quantity=Number(numeric(raw.quantity??1));
    if(linear&&raw.quantityUnit!=='linear-m'&&raw.width){const previousWidth=Number(numeric(raw.width));if(!Number.isFinite(previousWidth)||previousWidth<=0)throw Error('راجع الطول المطلوب.');quantity=Math.round(previousWidth*(raw.unit==='m'?1:.01)*quantity*100)/100;}
    if(linear){if(!Number.isFinite(quantity)||quantity<.01||quantity>1000000||Math.abs(quantity*100-Math.round(quantity*100))>1e-7)throw Error('اكتب الطول بالمتر الطولي، بحد أقصى رقمين بعد العلامة العشرية.');}
    else if(!Number.isInteger(quantity)||quantity<1||quantity>1000000)throw Error('الكمية لازم تكون عدد صحيح أكبر من صفر.');
    const mode=s.modes.includes(raw.mode)?raw.mode:s.modes[0];
    const shape=s.shapes?.length?(raw.shape||s.shapes[0]):'';if(shape&&!s.shapes.includes(shape))throw Error('اختار شكلًا متاحًا للختم.');
    return {id:raw.id&&/^[a-z0-9-]+$/i.test(raw.id)?raw.id:makeId(),serviceId:s.id,width,height,unit:linear?'m':raw.unit==='m'?'m':'cm',quantity,quantityUnit:linear?'linear-m':'count',mode,shape,location:mode.includes('تركيب')?String(raw.location||'').trim().slice(0,200):'',notes:String(raw.notes||'').trim().slice(0,1000)};
  }
  let serviceLines=(Array.isArray(savedDraft.services)?savedDraft.services:[]).flatMap(x=>{try{return [cleanServiceLine(x)];}catch{return [];}});
  function serviceLineText(line){const s=data.services.find(s=>s.id===line.serviceId);return [s?.material,line.shape?`الشكل: ${line.shape}`:'',s?.lightingDetail||s?.lighting,s?.measurement==='linear'?`الطول ${num(line.quantity)} متر طولي · ارتفاع الحروف ${num(s.fixedHeightCm)} سم`:line.width?`العرض ${line.width} × الارتفاع ${line.height} ${line.unit==='m'?'متر':'سم'}`:'',s?.measurement==='linear'?'':`${s?.quantityLabel||'الكمية'}: ${num(line.quantity)}`,line.mode].filter(Boolean).join(' · ');}
  function upsertServiceLine(raw){const line=cleanServiceLine(raw),i=serviceLines.findIndex(l=>l.id===line.id);if(i<0)serviceLines.push(line);else serviceLines[i]=line;renderCart();saveDraft();document.dispatchEvent(new CustomEvent('elguoshy:selection'));return line;}
  const price=p=>p.price?(/^\d+(?:\.\d+)?$/.test(String(p.price))?`${num(Number(p.price))} ج.م`:String(p.price)):'حسب الطلب';
  function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),4200);}
  function renderBrand(){
    $$('[data-brand]').forEach(n=>n.textContent=data.brand[n.dataset.brand]||'');
    document.title=`${data.brand.studio} — تصميم ودعاية وطباعة`;
    document.documentElement.style.setProperty('--accent',data.brand.accent);
    const c=data.brand.accent.slice(1);document.documentElement.style.setProperty('--accent-rgb',[0,2,4].map(i=>parseInt(c.slice(i,i+2),16)).join(','));
    const h=$('#hero-title'), lines=data.brand.headline.split('|').filter(Boolean);h.replaceChildren(document.createTextNode(lines[0]||''));if(lines.length>1){h.append(document.createElement('br'));const span=document.createElement('span');span.textContent=lines.slice(1).join(' ');h.append(span);}
    $('#facebook-page-link').href=externalURL(data.brand.facebook);$('#footer-facebook').href=externalURL(data.brand.facebook);
    const archive=$('#archive-link');archive.href=externalURL(data.brand.facebookGroup);archive.hidden=!data.brand.facebookGroup;$('#year').textContent=new Date().getFullYear();
  }
  function renderSectors(){
    $('#sector-grid').innerHTML=data.sectors.map((s,i)=>`<button class="sector-card ${s.id===activeSector&&!search?'active':''}" data-sector="${esc(s.id)}" aria-pressed="${s.id===activeSector&&!search}"><div class="sector-top">${icon(s.icon)}<span class="sector-no">0${i+1}</span></div><h3>${esc(s.name)}</h3><p>${esc(s.note)}</p><div class="sector-bottom"><small dir="ltr">${esc(s.en)}</small>${icon('diagonal')}</div></button>`).join('');
  }
  function matchingPackages(){const q=normalize(search);return data.packages.filter(p=>{if(p.kind==='marketing')return false;if(!q)return p.sector===activeSector;const s=data.sectors.find(s=>s.id===p.sector);return normalize([p.name,p.description,p.label,...p.features,s?.name].join(' ')).includes(q);});}
  function renderPackages(){
    const list=matchingPackages(), sector=data.sectors.find(s=>s.id===activeSector);
    $('#package-kicker').textContent=search?'بحث في كل الفئات':`اختيارات ${sector.name==='الشركات'?'للشركات':sector.name==='المحلات'?'للمحلات':sector.name==='المدرسين'?'للمدرسين':'للعيادات'}`;
    $('#package-heading').textContent=search?`نتائج البحث (${num(list.length)})`:sector.description;
    $('#package-results').textContent=`${num(list.length)} باقات متاحة`;
    $('#package-grid').classList.toggle('searching',Boolean(search));
    let cards=list.map(p=>`<article class="package-card ${selected.has(p.id)?'chosen':''}" data-package-card="${esc(p.id)}"><p class="package-label">${esc(p.label||data.sectors.find(s=>s.id===p.sector)?.name)}</p><h4>${esc(p.name)}</h4><p class="package-description">${esc(p.description)}</p><ul class="package-features">${p.features.map(f=>`<li>${icon('check')}<span>${esc(f)}</span></li>`).join('')}</ul><div class="package-bottom"><p class="package-price">${esc(price(p))}</p><p class="price-note">${esc(p.scope||'التفاصيل تُعتمد في عرض السعر.')}</p><button class="button" data-select-package="${esc(p.id)}" aria-pressed="${selected.has(p.id)}">${selected.has(p.id)?'تمت إضافتها للطلب':'اختار الباقة'}${icon(selected.has(p.id)?'check':'plus')}</button></div></article>`).join('');
    if(!list.length)cards='<div class="empty-state"><h4>مفيش باقة بالوصف ده حاليًا.</h4><p>جرّب كلمة تانية أو احكي لنا عن طلبك.</p><button class="button primary small" data-action="order">طلب مخصص</button></div>';
    if(!search)cards+=`<article class="custom-card"><div class="custom-orb" aria-hidden="true">${icon('spark')}</div><h4>فكرتك مختلفة؟<br>نعملها مخصوص.</h4><p>باقة تجمع أكتر من خدمة، أو مقاس خاص، أو فكرة لسه بتتكوّن.</p><button class="text-link" data-action="order">احكي عن مشروعك ${icon('diagonal')}</button></article>`;
    $('#package-grid').innerHTML=cards;renderMarketing();
  }
  function renderMarketing(){
    const plans=data.packages.filter(p=>p.kind==='marketing');
    $('#marketing-plans').innerHTML=plans.map((p,i)=>`<article class="marketing-plan ${i===1?'featured':''} ${selected.has(p.id)?'chosen':''}"><p class="plan-label">${esc(p.label)}</p><h3>${esc(p.name)}</h3><p class="marketing-price">${esc(price(p))}</p><p class="plan-description">${esc(p.description)}</p><ul>${p.features.map(f=>`<li>${icon('check')}<span>${esc(f)}</span></li>`).join('')}</ul><p class="plan-scope">${esc(p.scope)}</p><button class="button ${i===1?'primary':'outline'} full" data-select-package="${esc(p.id)}" aria-pressed="${selected.has(p.id)}">${selected.has(p.id)?'اتضافت لطلبك':'اختار الخطة'} ${icon(selected.has(p.id)?'check':'plus')}</button></article>`).join('');
    const m=data.marketing||window.PORTFOLIO_DEFAULTS.marketing;
    $('#marketing-notice').textContent=m.notice;
    $('#marketing-workplan').innerHTML=m.workplan.map((step,i)=>`<li><span class="marketing-step-number">0${i+1}</span><small>${esc(step.time)}</small><h4>${esc(step.title)}</h4><p>${esc(step.text)}</p></li>`).join('');
  }
  function getServiceGroups(services=data.services){
    const grouped=new Map();for(const item of services){const key=item.family+':'+(item.collection||item.id);if(!grouped.has(key))grouped.set(key,{id:key,family:item.family,name:item.collectionName||item.name,description:item.collectionDescription||item.description,items:[]});grouped.get(key).items.push(item);}
    return [...grouped.values()].map(g=>{g.items.sort((a,b)=>(a.collectionOrder||0)-(b.collectionOrder||0));return g;});
  }
  function familyForProject(p){return {print:'printing',packaging:'identity',brand:'identity',digital:'web'}[p.category]||p.category;}
  function familyProjects(id){return data.projects.filter(p=>familyForProject(p)===id);}
  function renderWorks(){
    const words=normalize(workSearch).split(/\s+/).filter(Boolean);
    const list=data.families.filter(f=>{const services=data.services.filter(s=>s.family===f.id),projects=familyProjects(f.id);return (workAudience==='all'||services.some(s=>s.audiences.includes(workAudience))||projects.some(p=>p.sector===workAudience))&&words.every(word=>normalize([f.name,f.description,f.note,...services.flatMap(s=>[s.name,s.collectionName,s.description,...s.aliases]),...projects.map(p=>p.name)].join(' ')).includes(word));});
    $('#work-grid').innerHTML=list.map((f,i)=>{const groups=getServiceGroups(data.services.filter(s=>s.family===f.id));return `<button class="work-card parent-service-card" data-open-family="${esc(f.id)}" aria-label="افتح أقسام ${esc(f.name)}"><div class="work-cover">${photoHTML(f.photo,f.name)}<span class="work-category">${num(groups.length)} أقسام وخدمات</span><span class="work-open">${icon('diagonal')}</span></div><div class="work-info"><div><h3>${esc(f.name)}</h3><p class="work-project-title">${esc(f.note||f.description)}</p></div><span class="work-number" dir="ltr">${String(i+1).padStart(2,'0')}</span></div></button>`;}).join('')||'<div class="empty-state"><h3>مفيش خدمة بالاختيارات دي.</h3><p>جرّب كلمة تانية أو نشاط مختلف.</p></div>';
    $('#work-results').textContent=`${num(list.length)} خدمات رئيسية معروضة`;
  }
  function showFamily(id,view='services'){
    if(!data.families.some(f=>f.id===id))return;activeFamily=id;familyView=view==='models'?'models':'services';renderFamily();showDialog('family-dialog');
  }
  function renderFamily(){
    const f=data.families.find(f=>f.id===activeFamily);if(!f)return;
    const groups=getServiceGroups(data.services.filter(s=>s.family===f.id)),projects=familyProjects(f.id);
    if(!projects.length)familyView='services';
    const models=projects.map(p=>`<button class="family-model-card" data-project="${esc(p.id)}" aria-label="استعرض ${esc(p.name)}"><div class="family-model-cover">${p.photos?.length?photoHTML(p.photos[0],p.name):projectImages(p).length?(p.presentation==='artwork'?artworkHTML(projectImages(p)[0],p.name):`<img src="${esc(mediaURL(projectImages(p)[0]))}" alt="${esc(p.name)}" loading="lazy">`):icon(f.icon)}<span class="illustration-caption">${esc(stages[p.stage])}</span></div><div><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><span class="text-link">الصور والتفاصيل ${icon('arrow')}</span></div></button>`).join('');
    $('#family-content').innerHTML=`<div class="family-intro"><p class="section-kicker">الخدمات والأقسام</p><h2 id="family-title">${esc(f.name)}</h2><p>${esc(f.description)}</p></div><div class="family-view-tabs" role="tablist" aria-label="استكشاف ${esc(f.name)}"><button id="family-services-tab" role="tab" aria-controls="family-services-panel" aria-selected="${familyView==='services'}" tabindex="${familyView==='services'?0:-1}" data-family-view="services">الأقسام والخدمات <span>${num(groups.length)}</span></button>${projects.length?`<button id="family-models-tab" role="tab" aria-controls="family-models-panel" aria-selected="${familyView==='models'}" tabindex="${familyView==='models'?0:-1}" data-family-view="models">نماذج مرتبطة <span>${num(projects.length)}</span></button>`:''}</div><div id="family-services-panel" class="family-service-grid service-grid" role="tabpanel" aria-labelledby="family-services-tab" ${familyView!=='services'?'hidden':''}>${groups.map(g=>window.ElguoshyCatalog.groupCard(g)).join('')||'<div class="empty-state"><p>احكي لنا عن المطلوب ونرتّب الخدمة معاك.</p><button class="button primary" data-action="order">طلب مخصص</button></div>'}</div><div id="family-models-panel" role="tabpanel" aria-labelledby="family-models-tab" class="family-model-grid" ${familyView!=='models'?'hidden':''}>${models}</div><div class="family-detail-footer"><p>اختار القسم، وبعدها حدّد النوع والمواصفات المناسبة.</p><a href="#market" class="text-link" data-family="${esc(f.id)}" data-close="family-dialog">دليل القسم بالتفصيل ${icon('arrow')}</a></div>`;
  }
  function renderCart(){
    for(const id of selected)if(!data.packages.some(p=>p.id===id))selected.delete(id);
    serviceLines=serviceLines.flatMap(l=>{try{return [cleanServiceLine(l)];}catch{return [];}});
    const items=data.packages.filter(p=>selected.has(p.id));
    const count=items.length+serviceLines.length;
    $('#request-kind-wrap').hidden=serviceLines.length>0;
    $('#cart-count').textContent=num(count);$('#cart-count').hidden=!count;
    $('.bag-button').setAttribute('aria-label',`ملخص طلبك، ${num(count)} اختيارات`);
    $('#order-title').textContent=count?'اختياراتك، في طلب واحد.':'خلّينا نجهّز طلبك.';
    const services=serviceLines.map(l=>{const s=data.services.find(s=>s.id===l.serviceId);return `<article class="cart-row service-cart-row"><span class="cart-row-icon">${icon(data.families.find(f=>f.id===s.family)?.icon)}</span><div><h3>${esc(s.name)}</h3><p>${esc(serviceLineText(l))}</p><button class="cart-edit" data-edit-service-line="${esc(l.id)}">تعديل المواصفات ${icon('edit')}</button></div><button class="remove-package" data-remove-service="${esc(l.id)}" aria-label="حذف ${esc(s.name)} من الطلب">${icon('close')}</button></article>`;}).join('');
    const packages=items.map(p=>`<article class="cart-row"><span class="cart-row-icon">${icon(data.sectors.find(s=>s.id===p.sector)?.icon)}</span><div><h3>${esc(p.name)}</h3><p>باقة · ${esc(data.sectors.find(s=>s.id===p.sector)?.name)} · ${esc(price(p))}</p></div><button class="remove-package" data-remove-package="${esc(p.id)}" aria-label="حذف ${esc(p.name)} من الطلب">${icon('close')}</button></article>`).join('');
    $('#cart-items').innerHTML=count?`<p class="cart-count-label">${num(count)} اختيارات في طلبك</p>`+services+packages:'<div class="cart-empty"><h3>مساحة لفكرتك.</h3><p>اختار خدمة بمواصفاتها أو باقة، أو اكتب المطلوب هنا.</p></div>';
  }
  function draftValues(){return {packages:[...selected],services:clone(serviceLines),client:$('#client-name').value,business:$('#client-business').value,phone:$('#client-phone').value,kind:$('#request-kind').value,date:$('#client-date').value,details:$('#client-details').value};}
  function updateDatePlaceholder(){const input=$('#client-date');input.closest('.date-field')?.classList.toggle('is-empty',!input.value&&!input.validity.badInput);}
  function saveDraft(){updateDatePlaceholder();try{localStorage.setItem(DRAFT_KEY,JSON.stringify(draftValues()));}catch{/* The form still works when browser storage is unavailable. */}}
  function restoreDraft(){const mapping={client:'#client-name',business:'#client-business',phone:'#client-phone',kind:'#request-kind',date:'#client-date',details:'#client-details'};for(const [k,selector]of Object.entries(mapping))if(typeof savedDraft[k]==='string')$(selector).value=savedDraft[k];if(!$('#request-kind').value)$('#request-kind').selectedIndex=0;updateDatePlaceholder();}
  function showDialog(id){const d=$('#'+id);if(!d||d.open)return;if(d.showModal)d.showModal();else d.setAttribute('open','');document.body.classList.add('modal-open');}
  function closeDialog(id){const d=$('#'+id);if(d.close)d.close();else d.removeAttribute('open');if(!document.querySelector('dialog[open]'))document.body.classList.remove('modal-open');}
  function openOrder(){renderCart();showDialog('order-dialog');}
  function projectImages(p,content=data){return p.galleryService?(content.services.find(s=>s.id===p.galleryService)?.images||[]):(p.images||[]);}
  function showProject(id){
    const p=data.projects.find(p=>p.id===id);if(!p)return;
    const related=(p.related||[]).map(id=>data.services.find(s=>s.id===id)).filter(Boolean);
    const visuals=(p.photos||[]).map((photo,i)=>`<figure class="project-photo">${photoHTML(photo,`${p.name} — صورة ${num(i+1)}`,'contain')}</figure>`).join('')+projectImages(p).map((src,i)=>p.presentation==='artwork'?`<figure class="original-artwork-figure"><a href="${esc(mediaURL(src))}" target="_blank" rel="noopener noreferrer" aria-label="افتح ${esc(p.name)}، نموذج ${num(i+1)} بالحجم الكامل"><img src="${esc(mediaURL(src))}" alt="${esc(p.name)} — نموذج ${num(i+1)}" loading="lazy" decoding="async"></a><figcaption>${esc(p.name)} · نموذج ${num(i+1)}</figcaption></figure>`:`<figure><img src="${esc(mediaURL(src))}" alt="${esc(p.name)} — صورة ${num(i+1)}" loading="lazy"></figure>`).join('');
    $('#project-content').innerHTML=`<div class="project-modal-intro"><p class="section-kicker">${esc(categories[p.category])}</p><h2 id="project-title">${esc(p.name)}</h2><span class="stage-pill">${p.stage==='concept'?'نموذج توضيحي للخدمة':p.stage==='showcase'?esc(stages[p.stage]):'دوري: '+esc(stages[p.stage])}</span><p>${esc(p.description)}</p><div class="project-service-tags">${p.services.map(t=>`<span>${esc(t)}</span>`).join('')}</div></div>${visuals?`<div class="project-modal-gallery">${visuals}</div>`:''}${p.source?`<div class="project-original"><a class="button outline small" href="${esc(externalURL(p.source))}" target="_blank" rel="noopener noreferrer">المصدر الأصلي ${icon('diagonal')}</a></div>`:''}${related.length?`<div class="project-related"><h3>اطلب خدمة مشابهة</h3><div>${related.map(s=>`<button data-service="${esc(s.id)}">${esc(s.name)} ${icon('diagonal')}</button>`).join('')}</div></div>`:''}`;
    showDialog('project-dialog');
  }
  function renderAll(){renderBrand();renderSectors();renderPackages();renderWorks();renderCart();if($('#family-dialog').open)renderFamily();document.dispatchEvent(new CustomEvent('elguoshy:content'));}
  function applyPublished(next){data=validateData(next);renderAll();saveDraft();return true;}
  function setData(next){return applyPublished(next);}
  function composeRequest(draft){
    const chosen=data.packages.filter(p=>draft.packages.includes(p.id));
    const lines=(draft.services||[]).filter(l=>data.services.some(s=>s.id===l.serviceId));
    const services=lines.map((l,i)=>{const s=data.services.find(s=>s.id===l.serviceId);return `${i+1}. ${s.name}\n${serviceLineText(l)}${l.location?'\nمكان التركيب: '+l.location:''}${l.notes?'\nملاحظات: '+l.notes:''}${s.transportNote&&l.mode.includes('تنفيذ')?'\nالنقل: '+s.transportNote:''}`;}).join('\n\n');
    return ['أهلًا '+data.brand.name+'، عايز أطلب عرض سعر.','الاسم: '+draft.client.trim(),'النشاط: '+draft.business.trim(),draft.phone.trim()?'رقم التواصل: '+draft.phone.trim():'',services?'الخدمات والمواصفات:\n'+services:'',chosen.length?'الباقات المختارة:\n'+chosen.map((p,i)=>p.kind==='marketing'?`${i+1}. خطة التسويق: ${p.name} — ${price(p)}\n${p.features.join('؛ ')}\n${p.scope}`:`${i+1}. ${p.name} (${data.sectors.find(s=>s.id===p.sector)?.name})`).join('\n'):'',!lines.length&&!chosen.length?'طلب مخصص':'',!lines.length?'نطاق عام للطلب: '+draft.kind:'',draft.date?'موعد التسليم المفضل: '+draft.date:'',draft.details.trim()?'تفاصيل إضافية:\n'+draft.details.trim():'','برجاء تحديد التكلفة ومدة التنفيذ بعد مراجعة التفاصيل.'].filter(Boolean).join('\n\n');
  }
  document.addEventListener('click',event=>{
    const target=event.target.closest?.('button,a');if(!target)return;
    if(target.dataset.openFamily){showFamily(target.dataset.openFamily);return;}
    if(target.dataset.familyView){familyView=target.dataset.familyView;renderFamily();$('#family-'+familyView+'-tab')?.focus();return;}
    if(target.dataset.close){closeDialog(target.dataset.close);return;}
    if(target.dataset.action==='order'||target.dataset.action==='cart'){openOrder();return;}
    if(target.dataset.sector){activeSector=target.dataset.sector;search='';$('#package-search').value='';renderSectors();renderPackages();return;}
    if(target.dataset.selectPackage){const id=target.dataset.selectPackage,p=data.packages.find(p=>p.id===id);if(!p)return;selected.has(id)?selected.delete(id):selected.add(id);renderPackages();renderCart();saveDraft();toast(selected.has(id)?`أضفنا «${p.name}» لطلبك. افتح الشنطة لمراجعة التفاصيل.`:'اتشالت الباقة من الطلب.');return;}
    if(target.dataset.removePackage){selected.delete(target.dataset.removePackage);renderPackages();renderCart();saveDraft();return;}
    if(target.dataset.removeService){serviceLines=serviceLines.filter(l=>l.id!==target.dataset.removeService);renderCart();saveDraft();document.dispatchEvent(new CustomEvent('elguoshy:selection'));return;}
    if(target.dataset.project){showProject(target.dataset.project);return;}
    if(target.closest('#main-nav')){$('#main-nav').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');}
  });
  $('#family-content').addEventListener('keydown',e=>{if(!e.target.closest('.family-view-tabs')||!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;const hasModels=familyProjects(activeFamily).length>0;if(!hasModels)return;e.preventDefault();familyView=e.key==='Home'?'services':e.key==='End'?'models':familyView==='services'?'models':'services';renderFamily();$('#family-'+familyView+'-tab').focus();});
  document.addEventListener('elguoshy:selection',()=>{if($('#family-dialog').open)renderFamily();});
  $('#package-search').addEventListener('input',e=>{search=e.target.value.trim();renderSectors();renderPackages();});
  $('#work-search').addEventListener('input',e=>{workSearch=e.target.value.trim();renderWorks();});
  $('#work-audience').addEventListener('change',e=>{workAudience=e.target.value;renderWorks();});
  $('#menu-toggle').addEventListener('click',()=>{const open=$('#main-nav').classList.toggle('open');$('#menu-toggle').setAttribute('aria-expanded',String(open));});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#main-nav').classList.remove('open');$('#menu-toggle').setAttribute('aria-expanded','false');}});
  $$('dialog').forEach(d=>{d.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('modal-open');});d.addEventListener('click',e=>{if(e.target===d)closeDialog(d.id);});});
  $('#order-form').addEventListener('input',()=>{$('#client-details').setCustomValidity('');saveDraft();});
  $('#order-form').addEventListener('change',saveDraft);
  $('#order-form').addEventListener('submit',e=>{
    e.preventDefault();const draft=draftValues(),details=$('#client-details');
    if(!selected.size&&!serviceLines.length&&draft.details.trim().length<8){details.setCustomValidity('اكتب وصف مختصر لطلبك، أو اختار خدمة أو باقة.');details.reportValidity();return;}
    if(!draft.client.trim()||!draft.business.trim()){toast('اكتب اسمك واسم النشاط الأول.');return;}
    const phone=normalizePhone(data.brand.whatsapp);if(!phone){toast('رقم واتساب محتاج يتراجع من تعديل المعاينة.');return;}
    saveDraft();const url=`https://wa.me/${phone}?text=${encodeURIComponent(composeRequest(draft))}`;
    window.open(url,'_blank','noopener,noreferrer');toast('جهّزنا ملخص طلبك على واتساب؛ راجعه قبل الإرسال.');
  });
  $('#client-date').addEventListener('change',saveDraft);
  $('#client-date').addEventListener('keyup',updateDatePlaceholder);
  $('#order-form').addEventListener('reset',()=>queueMicrotask(updateDatePlaceholder));
  $('#clear-draft').addEventListener('click',()=>{selected.clear();serviceLines=[];$('#order-form').reset();$('#client-details').setCustomValidity('');try{localStorage.removeItem(DRAFT_KEY);localStorage.removeItem('elguoshy-draft-v1');localStorage.removeItem('elguoshy-draft-v2');localStorage.removeItem('elguoshy-draft-v3');localStorage.removeItem('elguoshy-draft-v4');localStorage.removeItem('elguoshy-draft-v5');localStorage.removeItem('elguoshy-draft-v6');localStorage.removeItem('elguoshy-draft-v7');}catch{}renderCart();renderPackages();document.dispatchEvent(new CustomEvent('elguoshy:selection'));toast('تم تفريغ مسودة الطلب.');});
  $('#work-grid').addEventListener('error',e=>{if(e.target.tagName==='IMG'){const img=e.target;img.style.opacity='.3';img.alt='تعذر عرض الصورة — افتح المشروع للمزيد';}},true);
  window.Elguoshy={getData:()=>clone(data),setData,applyPublished,clone,esc,icon,toast,showDialog,closeDialog,mediaURL,externalURL,normalizePhone,normalize,num,validPhoto,photoHTML,artworkHTML,projectImages,categories,stages,getServiceGroups,familyForProject,showFamily,validateData,migrateData,makeId,hydrateIcons,defaults:()=>clone(window.PORTFOLIO_DEFAULTS),composeRequest,matchingPackages,getServiceLines:()=>clone(serviceLines),upsertServiceLine,cleanServiceLine,serviceLineText};
  restoreDraft();hydrateIcons();renderAll();
})();
