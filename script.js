async function renderStarred() {
  const list = document.getElementById("starred-list");

  try {
    const response = await fetch("events.json");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const repos = await response.json();

    for (const repo of repos) {
      const item = document.createElement("li");

      const link = document.createElement("a");
      link.href = repo.url;
      link.textContent = repo.name;

      const description = document.createElement("p");
      description.textContent = repo.description;

      const meta = document.createElement("span");
      meta.className = "meta";
      meta.textContent = `${repo.language} · starred ${repo.starred_at}`;

      item.append(link, description, meta);
      list.append(item);
    }
  } catch (error) {
    const item = document.createElement("li");
    item.textContent = `Could not load starred repositories (${error.message}).`;
    list.append(item);
  }
}

document.addEventListener("DOMContentLoaded", renderStarred);
