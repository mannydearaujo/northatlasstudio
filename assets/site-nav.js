(function(){
  function track(eventName, params){
    if(typeof window.gtag !== 'function') return;
    window.gtag('event', eventName, params || {});
  }

  document.querySelectorAll('[data-mobile-nav]').forEach(function(nav){
    var toggle = nav.querySelector('.menu-toggle');
    var menu = nav.querySelector('.nav-links');
    var actions = nav.querySelector('.nav-actions, .nav-right');
    var primaryCta = actions ? actions.querySelector('.btn-primary') : null;
    if(!toggle || !menu) return;

    if(primaryCta && !nav.querySelector('.mobile-quick-cta')){
      var quickCta = primaryCta.cloneNode(false);
      var isPortuguese = (document.documentElement.lang || '').toLowerCase().indexOf('pt') === 0;
      quickCta.className = 'mobile-quick-cta';
      quickCta.textContent = isPortuguese ? 'Auditoria' : 'Audit';
      quickCta.setAttribute('aria-label', primaryCta.textContent.trim());
      nav.insertBefore(quickCta, toggle);
    }

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

  document.querySelectorAll('form.domain-audit-form').forEach(function(form){
    form.addEventListener('submit', function(){
      track('quote_request_click', {
        link_text: 'Get My Free Audit',
        destination: form.getAttribute('action') || '',
        form_id: form.id || 'domain_audit_form'
      });
    });
  });
})();
