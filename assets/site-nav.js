(function(){
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
})();
