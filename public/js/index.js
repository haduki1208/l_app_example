import { API_URL } from './constants.js';

if (!localStorage.getItem('id')) {
  location.href = './users.html';
}

// メッセージを投稿する
function sendMassage() {
  const inputMessage = document.querySelector('.inputMessage');
  if (inputMessage.value.length === 0) {
    // 何も入力されていなければ送信しない
    return;
  }

  fetch(`${API_URL}/rooms/2/messages`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      message: {
        message: inputMessage.value,
        user_id: localStorage.getItem('id')
      }
    })
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      // 画面更新
      inputMessage.value = '';
      getComments();
      scrollScreen();
    });
}

// メッセージを取得
function getComments() {
  fetch(API_URL + '/rooms/2/messages', {
    method: 'GET'
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      document.querySelector('.threadWrapper').innerHTML = '';
      json.forEach(jsonObject => {
        const user_id = jsonObject.message.user_id;
        const message = jsonObject.message.message;
        const nickname = jsonObject.user.nickname;
        if (user_id.toString() === localStorage.getItem('id')) {
          createMyMassageDOM(message);
        } else {
          createOtherMassageDOM(nickname, message);
        }
      });
      scrollScreen();
    });
}

// 自分が投稿したメッセージを表示
function createMyMassageDOM(message) {
  const html = `<div class="content my-res">${message}</div>`;
  document.querySelector('.threadWrapper').innerHTML += html;
}

// 他人が投稿したメッセージを表示
function createOtherMassageDOM(userName, message) {
  const html = `
    <div class="from">${userName}</div>
    <div class="content">${message}</div>
  `;
  document.querySelector('.threadWrapper').innerHTML += html;
}

// 画面を下までスクロールする
function scrollScreen() {
  setTimeout(() => {
    document.querySelector('.threadWrapper').scrollTop = Number.MAX_SAFE_INTEGER;
  }, 100);
}

// 10秒おきにコメントを取得する
getComments();
setInterval(() => {
  getComments();
}, 1000 * 60);

// メッセージ送信ボタン
document.querySelector('.sendMassage').onclick = sendMassage;

// 顔文字ボタン
document.querySelector('.showSticker').onclick = function() {
  // alert('開発中');
};

// 設定ボタン
document.querySelector('.editSetting').onclick = function() {
  // alert('開発中');
};
