(() => {
  'use strict';
  const api=window.Elguoshy,button=document.querySelector('#install-app');
  const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  let installPrompt=null,registration=null,activate=false;
  function refresh(){
    button.hidden=standalone();button.textContent=installPrompt?'تثبيت التطبيق':'طريقة تثبيت التطبيق';
    document.querySelector('#install-description').textContent=standalone()?'التطبيق مثبّت على جهازك.':ios?'من قائمة المشاركة اختار «إضافة إلى الشاشة الرئيسية».':'من قائمة المتصفح اختار «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية» إذا كان الخيار متاحًا.';
  }
  button.addEventListener('click',async()=>{
    if(installPrompt){await installPrompt.prompt();await installPrompt.userChoice;installPrompt=null;refresh();}
    else {refresh();api.showDialog('app-dialog');}
  });
  addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;refresh();});
  addEventListener('appinstalled',refresh);
  if('serviceWorker' in navigator&&location.protocol!=='file:'){
    navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).then(reg=>{
      registration=reg;const update=()=>{if(reg.waiting)document.querySelector('#app-update').hidden=false;};update();
      reg.addEventListener('updatefound',()=>reg.installing?.addEventListener('statechange',update));
    }).catch(()=>{});
    navigator.serviceWorker.addEventListener('controllerchange',()=>{if(activate)location.reload();});
  }
  document.querySelector('#apply-update').addEventListener('click',()=>{if(registration?.waiting){activate=true;registration.waiting.postMessage({type:'ACTIVATE_UPDATE'});}});
  refresh();
})();
