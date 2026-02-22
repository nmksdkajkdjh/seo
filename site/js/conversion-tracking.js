/**
 * 流量×转化×变现 - LINE登録ファネル計測 v1.1
 * Events: line_register_click, cta_visible, scroll_75
 * page_type: home=首页 / region=地域页 / topic=专题页
 */
(function(){
  window.dataLayer = window.dataLayer || [];
  var fired = { cta_visible: {}, scroll_75: false };
  var path = window.location.pathname;
  var pageType = (path === '/' || path === '/index.html') ? 'home' :
    /\/blog\/(tokyo|osaka|aichi|fukuoka|kanagawa|hokkaido|shizuoka|hiroshima|tokai|kansai|shutoken)-kouhaitou/.test(path) ? 'region' :
    /\/blog\/(rimawari|genpai|100man|nisa|2026-kouhaitou|nikkei|kabusui|bouraku)/.test(path) ? 'topic' : 'other';

  function evt(o){ return Object.assign({ page_url: path, page_type: pageType }, o); }

  // 1) LINE クリック
  document.querySelectorAll('a[href*="line.me"][href*="981czbkb"]').forEach(function(a){
    a.addEventListener('click', function(){
      var loc = a.id || a.getAttribute('data-cta') || (a.closest('.bg-[#f0f9f0]') ? 'line_content' : 'line_link');
      dataLayer.push(evt({ event: 'line_register_click', button_location: loc, conversion: 'line_add' }));
    });
  });

  // 2) CTA 露出 (IntersectionObserver)
  var ctaEls = document.querySelectorAll('a[href*="line.me"][href*="981czbkb"]');
  if (typeof IntersectionObserver !== 'undefined' && ctaEls.length) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (!e.isIntersecting) return;
        var a = e.target;
        var loc = a.id || a.getAttribute('data-cta') || (a.closest('.bg-[#f0f9f0]') ? 'line_content' : 'line_link');
        if (fired.cta_visible[loc]) return;
        fired.cta_visible[loc] = true;
        dataLayer.push(evt({ event: 'cta_visible', button_location: loc }));
      });
    }, { threshold: 0.5, rootMargin: '0px' });
    ctaEls.forEach(function(el){ io.observe(el); });
  }

  // 3) スクロール 75%
  window.addEventListener('scroll', function(){
    if (fired.scroll_75) return;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (h <= 0 || window.scrollY >= h * 0.75) {
      fired.scroll_75 = true;
      dataLayer.push(evt({ event: 'scroll_75' }));
    }
  }, { passive: true });
})();
