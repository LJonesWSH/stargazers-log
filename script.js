const repositoryList = document.querySelector("#repository-list");
const listStatus = document.querySelector("#list-status");

function formatDate(dateString) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeZone: "UTC"
  }).format(new Date(`${dateString}T00:00:00Z`));
}

function createRepositoryItem(repository) {
  const item = document.createElement("li");
  item.className = "repository";

  const link = document.createElement("a");
  link.href = repository.url;
  link.textContent = repository.name;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const description = document.createElement("p");
  description.textContent = repository.description;

  const metadata = document.createElement("div");
  metadata.className = "repository-meta";

  const language = document.createElement("span");
  language.textContent = repository.language;

  const starredDate = document.createElement("time");
  starredDate.dateTime = repository.starredAt;
  starredDate.textContent = `Starred ${formatDate(repository.starredAt)}`;

  metadata.append(language, starredDate);
  item.append(link, description, metadata);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren(...repositories.map(createRepositoryItem));
    listStatus.hidden = true;
  } catch (error) {
    listStatus.textContent = "Repositories could not be loaded. Please try again later.";
    listStatus.setAttribute("role", "alert");
    console.error("Could not load starred repositories:", error);
  }
}

loadRepositories();
