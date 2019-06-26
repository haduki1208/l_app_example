import { API_URL } from './constants.js';

// 設定ボタン
document.querySelector('.editSetting').onclick = function() {
  // alert('開発中');
};

document.querySelector('.userFormContainerSubmit').onclick = function(e) {
  e.preventDefault();

  const formEl = e.target.form;
  const name = formEl.querySelector('input[name="name"]').value;
  const userName = formEl.querySelector('input[name="nickname"]').value;

  if (!name.replace(/\s+/g, '') || !userName.replace(/\s+/g, '')) {
    alert('ちゃんと入力してください。');
    return false;
  }

  fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      user: {
        name: name,
        nickname: userName
      }
    })
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      localStorage.setItem('id', json.id);
      localStorage.setItem('name', json.name);
      localStorage.setItem('nickname', json.nickname);
      alert(`user登録しました。${json}`);
      location.href = './index.html';
    });
};
