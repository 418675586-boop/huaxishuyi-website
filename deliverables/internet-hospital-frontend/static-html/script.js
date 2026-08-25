(() => {
  const toast = document.querySelector("#hospital-toast");
  let toastTimer;

  const showNotice = (message) => {
    if (!toast) return;

    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 1800);
  };

  document.querySelectorAll("[data-notice]").forEach((button) => {
    button.addEventListener("click", () => {
      showNotice(button.dataset.notice || "");
    });
  });

  const searchForm = document.querySelector("#hospital-search");
  const searchInput = document.querySelector("#hospital-query");

  searchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput?.value.trim();
    showNotice(query ? `正在搜索：${query}` : "请输入症状、科室或医生");
  });

  const filterButtons = document.querySelectorAll(".science-filters button");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-selected", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-selected", "true");
    });
  });

  document.querySelectorAll(".like-button").forEach((button) => {
    button.addEventListener("click", () => {
      const liked = button.classList.toggle("liked");
      button.setAttribute("aria-label", liked ? "取消点赞" : "点赞");
      const count = button.querySelector("span");
      if (count) count.textContent = liked ? "2.4K" : "2.3K";
    });
  });

  const navButtons = document.querySelectorAll(".hospital-bottom-nav button");
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      navButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      showNotice(button.dataset.navLabel || "");
    });
  });
})();
