(function(){
  function track(eventName, params){
    if(typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params || {});
  }

  document.querySelectorAll('[data-mobile-nav]').forEach(function(nav){
    var toggle = nav.querySelector('.menu-toggle');
    var menu = nav.querySelector('.nav-links');
    if(!toggle || !menu) return;

    function setOpen(open){
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    toggle.addEventListener('click', function(){
      setOpen(!nav.classList.contains('is-open'));
    });

    menu.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', function(){ setOpen(false); });
    });

    document.addEventListener('keydown', function(event){
      if(event.key === 'Escape') setOpen(false);
    });
  });

  document.querySelectorAll('a[href]').forEach(function(link){
    var href = link.getAttribute('href') || '';
    var label = (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);

    if(/^tel:/i.test(href)){
      link.addEventListener('click', function(){ track('phone_tap', { link_text: label }); });
      return;
    }
    if(/^sms:/i.test(href)){
      link.addEventListener('click', function(){ track('sms_tap', { link_text: label }); });
      return;
    }
    if(/^mailto:/i.test(href)){
      link.addEventListener('click', function(){ track('email_click', { link_text: label }); });
      return;
    }
    if(/(^|\/)(contact|contato)\/?($|[#?])/.test(href)){
      link.addEventListener('click', function(){ track('quote_request_click', { link_text: label, destination: href }); });
    }
  });

  document.querySelectorAll('form').forEach(function(form){
    var started = false;
    function markStart(){
      if(started) return;
      started = true;
      track('form_start', { form_id: form.id || 'site_form' });
    }
    form.addEventListener('focusin', markStart);
    form.addEventListener('input', markStart);
  });
})();
