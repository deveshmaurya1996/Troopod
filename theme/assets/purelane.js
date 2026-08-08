(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initReveal(root) {
    var nodes = root.querySelectorAll('.pl-rv:not([data-pl-bound])');
    if (!nodes.length) return;
    if (!('IntersectionObserver' in window) || reduce) {
      nodes.forEach(function (el) {
        el.classList.add('is-in');
        el.setAttribute('data-pl-bound', '1');
      });
      return;
    }
    root.setAttribute('data-pl-anim', '1');
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );
    nodes.forEach(function (el) {
      el.setAttribute('data-pl-bound', '1');
      io.observe(el);
    });
  }

  function initHeroStage(root) {
    var stage = root.querySelector('[data-pl-hstage]');
    if (!stage || stage.getAttribute('data-pl-bound')) return;
    stage.setAttribute('data-pl-bound', '1');
    var slides = [].slice.call(stage.querySelectorAll('[data-pl-hslide]'));
    var dotsWrap = root.querySelector('[data-pl-hdots]');
    var dots = dotsWrap ? [].slice.call(dotsWrap.querySelectorAll('button')) : [];
    if (!slides.length) return;
    var index = 0;
    var timer = null;

    function go(n) {
      index = (n + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle('is-on', i === index);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-on', i === index);
        dot.setAttribute('aria-pressed', i === index ? 'true' : 'false');
      });
    }

    function play() {
      if (!timer && !reduce) {
        timer = setInterval(function () {
          go(index + 1);
        }, 3800);
      }
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        stop();
        go(i);
        play();
      });
    });

    stage.addEventListener('mouseenter', stop);
    stage.addEventListener('mouseleave', play);

    go(0);
    play();

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) play();
            else stop();
          });
        },
        { threshold: 0.15 }
      ).observe(stage);
    }
  }

  function initHeroParallax(root) {
    var prod = root.querySelector('[data-pl-hero-prod]');
    if (!prod || prod.getAttribute('data-pl-parallax') || reduce) return;
    prod.setAttribute('data-pl-parallax', '1');
    var mx = 0;
    var my = 0;
    var raf = null;

    function frame() {
      raf = null;
      var y = window.scrollY || window.pageYOffset;
      var f = Math.min(y / 700, 1);
      prod.style.transform =
        'translate3d(' +
        (mx * -16).toFixed(2) +
        'px,' +
        (-f * 54 + my * -10).toFixed(2) +
        'px,0) scale(' +
        (1 - f * 0.06).toFixed(3) +
        ')';
      prod.style.opacity = (1 - f * 0.55).toFixed(3);
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(frame);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    if (window.matchMedia('(min-width: 1024px)').matches) {
      window.addEventListener(
        'mousemove',
        function (e) {
          mx = (e.clientX / window.innerWidth - 0.5) * 2;
          my = (e.clientY / window.innerHeight - 0.5) * 2;
          onScroll();
        },
        { passive: true }
      );
    }
    frame();
  }

  function initAtmosphere(root) {
    var atm = root.querySelector('[data-pl-atm]');
    if (!atm || atm.getAttribute('data-pl-bound')) return;
    atm.setAttribute('data-pl-bound', '1');
    var scenes = [].slice.call(atm.querySelectorAll('[data-pl-scene]'));
    var zones = [].slice.call(document.querySelectorAll('[data-pl-scene-zone]'));
    var layers = [].slice.call(atm.querySelectorAll('[data-pl-water] .pl-atm__wl'));
    var current = 0;
    var mx = 0;
    var my = 0;
    var raf = null;

    function setScene(n) {
      if (n === current) return;
      current = n;
      scenes.forEach(function (scene, i) {
        scene.classList.toggle('is-on', i + 1 === n);
      });
      atm.setAttribute('data-d', String(n));
    }

    function pick() {
      var focus = window.scrollY + window.innerHeight * 0.5;
      var n = 1;
      zones.forEach(function (zone) {
        var top = 0;
        var el = zone;
        while (el) {
          top += el.offsetTop;
          el = el.offsetParent;
        }
        if (top <= focus) n = parseInt(zone.getAttribute('data-pl-scene-zone'), 10) || n;
      });
      setScene(n);
    }

    function frame() {
      raf = null;
      var y = window.scrollY || window.pageYOffset;
      if (!reduce && layers.length) {
        for (var i = 0; i < layers.length; i++) {
          var d = [0.05, 0.09, 0.03, 0.02][i] || 0.05;
          layers[i].style.setProperty('--px', (mx * d * 130).toFixed(1) + 'px');
          layers[i].style.setProperty('--py', (-y * d + my * d * 90).toFixed(1) + 'px');
        }
      }
      pick();
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(frame);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    if (!reduce && window.matchMedia('(min-width: 1024px)').matches) {
      window.addEventListener(
        'mousemove',
        function (e) {
          mx = (e.clientX / window.innerWidth - 0.5) * 2;
          my = (e.clientY / window.innerHeight - 0.5) * 2;
          onScroll();
        },
        { passive: true }
      );
    }
    frame();
  }

  function initMarquee(root) {
    var rail = root.querySelector('[data-pl-revrail]');
    if (!rail || rail.getAttribute('data-pl-bound')) return;
    rail.setAttribute('data-pl-bound', '1');
    var track = rail.querySelector('[data-pl-revtrack]');
    if (!track || track.getAttribute('data-pl-dup')) return;
    var cards = [].slice.call(track.children);
    if (cards.length < 2) return;
    track.setAttribute('data-pl-dup', '1');
    cards.forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.removeAttribute('data-shopify-editor-block');
      [].slice.call(clone.querySelectorAll('a, button')).forEach(function (el) {
        el.setAttribute('tabindex', '-1');
      });
      track.appendChild(clone);
    });
  }

  function initAddToCart(root) {
    root.querySelectorAll('[data-pl-atc]:not([data-pl-bound])').forEach(function (btn) {
      btn.setAttribute('data-pl-bound', '1');
      btn.addEventListener('click', function () {
        if (btn.disabled || btn.getAttribute('aria-disabled') === 'true') return;
        var id = btn.getAttribute('data-variant-id');
        if (!id) return;
        btn.disabled = true;
        fetch(window.routes.cart_add_url + '.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ id: Number(id), quantity: 1 }),
        })
          .then(function (res) {
            if (!res.ok) throw new Error('add failed');
            return res.json();
          })
          .then(function () {
            document.dispatchEvent(new CustomEvent('cart:refresh'));
            if (typeof window.publish === 'function' && window.PUB_SUB_EVENTS) {
              window.publish(window.PUB_SUB_EVENTS.cartUpdate, { source: 'purelane-shop' });
            }
            return fetch(window.routes.cart_url + '?section_id=cart-drawer')
              .then(function (r) {
                return r.text();
              })
              .then(function (html) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');
                var drawer = document.querySelector('cart-drawer');
                var next = doc.querySelector('cart-drawer');
                if (drawer && next) drawer.innerHTML = next.innerHTML;
                if (drawer && typeof drawer.open === 'function') drawer.open();
              })
              .catch(function () {});
          })
          .catch(function () {})
          .finally(function () {
            btn.disabled = false;
          });
      });
    });
  }

  function initHeader(root) {
    var hdr = root.matches && root.matches('[data-pl-hdr]') ? root : root.querySelector('[data-pl-hdr]');
    if (!hdr || hdr.getAttribute('data-pl-bound')) return;
    hdr.setAttribute('data-pl-bound', '1');

    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      hdr.classList.toggle('is-up', y > 90);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var toggle = hdr.querySelector('[data-pl-menu-toggle]');
    var menu = hdr.querySelector('[data-pl-menu]');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var open = menu.hasAttribute('hidden');
        if (open) menu.removeAttribute('hidden');
        else menu.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          menu.setAttribute('hidden', '');
          toggle.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  function boot(scope) {
    var roots = (scope || document).querySelectorAll('[data-purelane]');
    roots.forEach(function (root) {
      initReveal(root);
      initHeroStage(root);
      initHeroParallax(root);
      initAtmosphere(root);
      initMarquee(root);
      initAddToCart(root);
      initHeader(root);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    boot(document);
  });

  document.addEventListener('shopify:section:load', function (event) {
    boot(event.target);
  });
})();
