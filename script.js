document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("guestbook-form");
  const entriesList = document.getElementById("entries-list");

  // ▶ 기존 메시지를 localStorage에서 불러오기
  let entries = JSON.parse(localStorage.getItem("guestbookEntries")) || [];
  renderEntries();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = form.name.value.trim();
    const message = form.message.value.trim();

    if (name && message) {
      const entry = {
        name,
        message,
        timestamp: new Date().toLocaleString()
      };
      entries.unshift(entry); // 최신 항목을 앞에 추가
      localStorage.setItem("guestbookEntries", JSON.stringify(entries));
      renderEntries();
      form.reset();
    }
  });

  // ▶ 방명록 렌더링 함수
  function renderEntries() {
    entriesList.innerHTML = "";
    entries.forEach(entry => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${entry.name}</strong> (${entry.timestamp}):<br>${entry.message}`;
      entriesList.appendChild(li);
    });
  }
});
