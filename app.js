/* Page behaviour for the café demo. Content comes from config.js. */
(() => {
  const { S, $, $$, esc, store, money, parseIso, longDate, time12, slots, dayPicker, timePicker, wizard, ticket, saveBooking, hash, reviews, stars, scrollSpy, toast, reduced } = Core;
  const img = (id, w, h) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=75`;
  const page = document.body.dataset.page;
  const items = S.menu.flatMap((c) => c.items);
  const item = (id) => items.find((i) => i.id === id);
  const mark = (veg) => `<span class="mark ${veg ? 'veg' : 'nonveg'}" role="img" aria-label="${veg ? 'Vegetarian' : 'Non-vegetarian'}"></span>`;
  const menuUrl = (t) => new URL(`menu.html?table=${t}`, location.href).href;
  const qr = (el, text, size) => {
    if (!window.QRCode) { el.innerHTML = `<a href="${text}">${esc(text)}</a>`; return; }
    new QRCode(el, { text, width: size, height: size, colorDark: '#2b1d14', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M });
    el.title = '';
  };

  /* ---------------- home ---------------- */
  if (page === 'home') {
    qr($('[data-hero-qr]'), menuUrl(4), 132);
    $('[data-popular]').innerHTML = items.filter((i) => i.pop).map((i, n) => `
      <li class="pop" data-reveal style="--i:${n}">
        <a href="menu.html#${S.menu.find((c) => c.items.includes(i)).id}">
          ${i.img ? `<img src="${img(i.img, 600, 600)}" alt="${esc(i.name)}" loading="lazy" width="600" height="600">` : '<span class="pop-blank" aria-hidden="true"></span>'}
          <span class="pop-name">${mark(i.veg)}${esc(i.name)}</span>
          <span class="pop-price">${money(i.price)}</span>
        </a></li>`).join('');
    $('[data-seats]').innerHTML = S.seating.map((s) => `<li><b>${esc(s.name)}</b><span>${esc(s.note)}</span></li>`).join('');
    $('[data-snip]').innerHTML = S.reviews.slice(0, 3).map((r) => `
      <li class="snip-card">${stars(r.rating)}<p>${esc(r.text)}</p><p class="snip-by">${esc(r.name)}, ${esc(r.tag.toLowerCase())}</p></li>`).join('');
  }

  /* ---------------- printable table codes ---------------- */
  if (page === 'tables') {
    const grid = $('[data-qr-grid]');
    grid.innerHTML = Array.from({ length: S.tableCount }, (_, k) => `
      <li class="qr-tent"><p class="qr-brand">${esc(S.name)}</p><div class="qr" data-t="${k + 1}"></div>
        <p class="qr-table">Table ${k + 1}</p><p class="qr-hint">Scan to see the menu and order</p></li>`).join('');
    $$('.qr', grid).forEach((el) => qr(el, menuUrl(el.dataset.t), 150));
    $('[data-print]').onclick = () => print();
  }

  /* ---------------- reviews ---------------- */
  if (page === 'reviews') reviews($('[data-reviews]'), S.reviews, { tags: ['Ordered at the table', 'Booked a table', 'Breakfast', 'Working from the café', 'Takeaway'] });

  /* ---------------- QR menu with table ordering ---------------- */
  if (page === 'menu') {
    const q = new URLSearchParams(location.search);
    let table = Math.min(+q.get('table') || 0, S.tableCount) || null;
    let cart = store.get('cart', {});
    const count = () => Object.values(cart).reduce((a, n) => a + n, 0);
    const total = () => Object.entries(cart).reduce((a, [id, n]) => a + item(id).price * n, 0);

    const qtyHtml = (id) => cart[id]
      ? `<div class="qty"><button type="button" data-sub="${id}" aria-label="Remove one ${esc(item(id).name)}">−</button><output>${cart[id]}</output><button type="button" data-add="${id}" aria-label="Add one more ${esc(item(id).name)}">+</button></div>`
      : `<button class="add" type="button" data-add="${id}">Add<span class="sr-only"> ${esc(item(id).name)}</span></button>`;

    $('[data-cat-tabs]').innerHTML = S.menu.map((c) => `<a href="#${c.id}">${esc(c.name)}</a>`).join('');
    $('[data-menu]').innerHTML = S.menu.map((c) => `
      <section class="menu-sec" id="${c.id}" aria-labelledby="m-${c.id}">
        <h2 id="m-${c.id}">${esc(c.name)}${c.note ? `<small>${esc(c.note)}</small>` : ''}</h2>
        <ul class="plain items">${c.items.map((i) => `
          <li class="item${i.img ? ' has-img' : ''}" data-text="${esc(`${i.name} ${i.desc}`.toLowerCase())}">
            ${i.img ? `<img src="${img(i.img, 300, 300)}" alt="" loading="lazy" width="300" height="300">` : ''}
            <div class="item-text"><h3>${mark(i.veg)}${esc(i.name)}${i.pop ? '<em>Popular</em>' : ''}</h3><p>${esc(i.desc)}</p><p class="item-price">${money(i.price)}</p></div>
            <div class="item-qty" data-qty="${i.id}">${qtyHtml(i.id)}</div>
          </li>`).join('')}</ul>
      </section>`).join('') + '<p class="empty" data-none hidden>Nothing matches that. Try another word.</p>';
    scrollSpy($('.cat-tabs'));

    $('[data-menu-search]').addEventListener('input', (e) => {
      const v = e.target.value.trim().toLowerCase();
      let any = false;
      $$('.menu-sec').forEach((sec) => {
        let n = 0;
        $$('.item', sec).forEach((li) => { li.hidden = v && !li.dataset.text.includes(v); n += !li.hidden; });
        sec.hidden = !n; any ||= n > 0;
      });
      $('[data-none]').hidden = any;
    });

    const banner = () => {
      const order = store.get('order', null);
      const live = order && Date.now() - order.at < 30 * 60000;
      $('[data-table-banner]').innerHTML = `<div class="wrap banner-row">
        ${table
          ? `<p><span class="table-chip">Table ${table}</span> Order from here. We bring it to your table.</p>
             <div class="banner-actions">${live ? '<button type="button" class="btn btn-link" data-track>Track your order</button>' : ''}
             <button type="button" class="btn btn-ghost" data-call="A server is on the way">Call a server</button>
             <button type="button" class="btn btn-ghost" data-call="Your bill is on the way">Ask for the bill</button></div>`
          : `<p>You are browsing the menu. To order, scan the code on your table, or tell us where you are sitting.</p>
             <label class="field table-pick"><span class="sr-only">Your table</span><select data-table-select><option value="">Choose your table</option>
             ${Array.from({ length: S.tableCount }, (_, k) => `<option value="${k + 1}">Table ${k + 1}</option>`).join('')}</select></label>`}
      </div>`;
    };
    const setTable = (t) => {
      table = t;
      history.replaceState(null, '', `?table=${t}${q.has('embed') ? '&embed=1' : ''}`);
      banner();
      toast(`Ordering for table ${t}`);
    };

    const sync = (id) => {
      store.set('cart', cart);
      if (id) $(`[data-qty="${id}"]`).innerHTML = qtyHtml(id);
      const bar = $('[data-tray-bar]');
      bar.hidden = !count();
      $('[data-tray-count]').textContent = `${count()} ${count() === 1 ? 'item' : 'items'}`;
      $('[data-tray-total]').textContent = money(total());
      if (id && !reduced) $('.tray-btn').animate([{ transform: 'scale(1)' }, { transform: 'scale(1.05)' }, { transform: 'scale(1)' }], { duration: 300 });
    };

    const sheet = $('[data-sheet]'), body = $('[data-sheet-body]');
    let ticker = 0;

    const renderTray = () => {
      body.innerHTML = `
        <div class="sheet-head"><h2 id="sheet-title">Your order${table ? ` for table ${table}` : ''}</h2><button type="button" class="x" data-close aria-label="Close">×</button></div>
        ${count() ? `<ul class="plain tray-list">${Object.entries(cart).map(([id, n]) => `
          <li><span class="tl-name">${esc(item(id).name)}</span><span data-qty="${id}">${qtyHtml(id)}</span><span class="tl-price">${money(item(id).price * n)}</span></li>`).join('')}</ul>
          <label class="field"><span>Notes for the counter <small>(optional)</small></span><textarea name="note" rows="2" placeholder="Oat milk, extra hot, no sugar…" data-note></textarea></label>
          ${table ? '' : `<label class="field"><span>Your table</span><select data-sheet-table required><option value="">Choose your table</option>${Array.from({ length: S.tableCount }, (_, k) => `<option value="${k + 1}">Table ${k + 1}</option>`).join('')}</select></label>`}
          <p class="step-error" aria-live="polite"></p>
          <button type="button" class="btn btn-primary place" data-place>Place order, ${money(total())}</button>
          <p class="muted small">Pay at the counter when you leave.</p>`
        : '<p class="empty">Your order is empty. Add something from the menu.</p>'}`;
    };

    const stages = [['Received', 0], ['Being made', 6], ['On its way', 16], ['Served', 26]];
    const renderTrack = () => {
      const o = store.get('order', null);
      if (!o) return renderTray();
      const s = (Date.now() - o.at) / 1000; // demo pace: seconds, not minutes
      const at = stages.filter(([, t]) => s >= t).length - 1;
      body.innerHTML = `
        <div class="sheet-head"><h2 id="sheet-title">Order ${o.ref}</h2><button type="button" class="x" data-close aria-label="Close">×</button></div>
        <p class="track-lede">Table ${o.table}. ${at === 3 ? 'Enjoy. Order again any time.' : 'We will bring it over.'}</p>
        <ol class="track" style="--p:${at / 3}">${stages.map(([label], k) => `<li${k <= at ? ' data-done' : ''}${k === at ? ' aria-current="step"' : ''}>${label}</li>`).join('')}</ol>
        <ul class="plain tray-list">${o.lines.map((l) => `<li><span class="tl-name">${l.qty} × ${esc(l.name)}</span><span class="tl-price">${money(l.qty * l.price)}</span></li>`).join('')}</ul>
        <p class="tray-total"><span>Total, pay at the counter</span><b>${money(o.total)}</b></p>
        <button type="button" class="btn btn-ghost" data-close>Back to the menu</button>`;
      if (at === 3) { clearInterval(ticker); ticker = 0; }
    };

    const openSheet = (track) => {
      track ? renderTrack() : renderTray();
      if (!sheet.open) sheet.showModal();
      clearInterval(ticker);
      if (track) ticker = setInterval(() => sheet.open && renderTrack(), 1000);
    };
    sheet.addEventListener('close', () => { clearInterval(ticker); ticker = 0; });
    sheet.addEventListener('click', (e) => { if (e.target === sheet) sheet.close(); });

    document.addEventListener('click', (e) => {
      const add = e.target.closest('[data-add]'), sub = e.target.closest('[data-sub]');
      if (add) { cart[add.dataset.add] = (cart[add.dataset.add] || 0) + 1; sync(add.dataset.add); }
      if (sub) { const id = sub.dataset.sub; cart[id] -= 1; if (cart[id] <= 0) delete cart[id]; sync(id); }
      if ((add || sub) && sheet.open) { renderTray(); if (!count()) sheet.close(); }
      if (e.target.closest('[data-open-tray]')) openSheet(false);
      if (e.target.closest('[data-track]')) openSheet(true);
      if (e.target.closest('[data-close]')) sheet.close();
      const call = e.target.closest('[data-call]');
      if (call) toast(`${call.dataset.call} to table ${table}.`);
      if (e.target.closest('[data-place]')) {
        const pick = $('[data-sheet-table]', body);
        if (pick && !pick.value) { $('.step-error', body).textContent = 'Choose your table so we know where to bring it.'; pick.focus(); return; }
        if (pick) setTable(+pick.value);
        const lines = Object.entries(cart).map(([id, qty]) => ({ name: item(id).name, price: item(id).price, qty }));
        store.set('order', { ref: S.refPrefix + Math.random().toString(36).slice(2, 6).toUpperCase(), table, lines, total: total(), note: $('[data-note]', body)?.value || '', at: Date.now() });
        Object.keys(cart).forEach((id) => { delete cart[id]; sync(id); });
        banner();
        openSheet(true);
      }
    });
    document.addEventListener('change', (e) => { if (e.target.matches('[data-table-select]') && e.target.value) setTable(+e.target.value); });

    banner();
    sync();
  }

  /* ---------------- booking ---------------- */
  if (page === 'book') {
    const form = $('#booking');
    const val = (n) => $(`[name="${n}"]:checked`, form)?.value || '';
    const partyIn = form.elements.party, party = () => +partyIn.value;
    const seat = (id) => S.seating.find((s) => s.id === id);
    const full = (s) => hash(val('date') + val('time') + s.id) < S.demo.busy || (s.id === 'window' && party() > 2) || (s.id === 'nook' && party() > 4);

    const update = () => {
      $('[data-sum-party]').textContent = party();
      $('[data-sum-day]').textContent = val('date') ? longDate(parseIso(val('date'))) : 'Not chosen';
      $('[data-sum-time]').textContent = val('time') ? time12(val('time')) : 'Not chosen';
      $('[data-sum-seat]').textContent = val('seat') ? seat(val('seat')).name : 'Not chosen';
    };
    const setParty = (n) => {
      partyIn.value = Math.max(1, Math.min(12, n));
      $('[data-party-out]').textContent = `${party()} ${party() === 1 ? 'person' : 'people'}`;
      $('[data-dec]').disabled = party() <= 1; $('[data-inc]').disabled = party() >= 12;
      update();
    };
    $('[data-dec]').onclick = () => setParty(party() - 1);
    $('[data-inc]').onclick = () => setParty(party() + 1);

    const renderTimes = () => {
      const keep = val('time');
      timePicker($('[data-times]'), slots(parseIso(val('date')), { step: 30, duration: 60 }));
      const t = keep && $(`[name=time][value="${keep}"]:not(:disabled)`, form);
      if (t) t.checked = true;
      update();
    };
    dayPicker($('[data-days]'), { days: 14, onChange: renderTimes });
    const first = $('[data-days] input:not(:disabled)');
    first.checked = true;
    renderTimes();

    const renderSeats = () => {
      const keep = val('seat');
      $('[data-seat-opts]').innerHTML = S.seating.map((s) => {
        const off = full(s);
        return `<label class="seat${off ? ' is-off' : ''}"><input type="radio" name="seat" value="${s.id}" required${off ? ' disabled' : ''}${!off && keep === s.id ? ' checked' : ''}>
          <span class="seat-name">${esc(s.name)}</span><span class="seat-note">${off ? (s.id === 'window' && party() > 2 ? 'Fits two at most' : s.id === 'nook' && party() > 4 ? 'Fits four at most' : 'Full at this time') : esc(s.note)}</span></label>`;
      }).join('');
    };

    form.addEventListener('change', update);
    wizard(form, {
      onEnter: (i) => { if (i === 1) renderSeats(); update(); },
      onSubmit: (fd) => {
        const day = val('date'), t = val('time');
        const start = parseIso(day); start.setHours(...t.split(':').map(Number));
        saveBooking({ date: day, time: t, key: val('seat') });
        form.hidden = true; $('[data-step-nav]').hidden = true;
        ticket($('[data-confirm]'), {
          heading: `See you soon, ${fd.get('name').trim().split(' ')[0]}.`,
          note: 'Your seat is held for 20 minutes. Scan the code on your table to order when you arrive.',
          start, minutes: 90, title: `Table at ${S.name}`,
          rows: [['People', String(party())], ['When', `${longDate(start)}, ${time12(t)}`], ['Seat', seat(val('seat')).name]],
          again: 'Book another table',
        });
      },
    });
    setParty(2);
  }
})();
