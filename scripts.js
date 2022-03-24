/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "startpage"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"fYpyop9Wyd8mZgsO","label":"Content","bookmarks":[{"id":"1jhjrcYvyy9ibqh2","label":"Twitch","url":"https://www.twitch.tv/directory"},{"id":"22QhvcCM5V77LSKF","label":"Youtube","url":"https://www.youtube.com/"},{"id":"jl34wQz7H1c1ZWzl","label":"Twitter","url":"https://www.twitter.com/"},{"id":"SipgbtC2ytBd2QI2","label":"Instagram","url":"https://www.instagram.com/"}]},{"id":"S8kPVdYFQYuFNSkP","label":"Info","bookmarks":[{"id":"7IbK3cpNJhJ5ednf","label":"Reddit","url":"https://www.reddit.com/"},{"id":"KRhETl22oX8RLAuX","label":"Chan","url":"https://www.4chan.org/c"},{"id":"LB2iFvTgN6H093Z6","label":"YComb","url":"news.ycombinator.com/"}]},{"id":"lXhDR1ldF3ygi0Lx","label":"Music","bookmarks":[{"id":"jpPFB47r4PFpKQ9J","label":"HHH","url":"https://www.reddit.com/r/Hiphopheads"},{"id":"Y7va44JmS2grMgM4","label":"Leaked","url":"https://leaked.cx/forums/hiphopleaks/"},{"id":"SftOFwpfk15POW1J","label":"UKDrill","url":"https://www.reddit.com/r/UKDrill"}]},{"id":"kaBaACkhdXgvN3eC","label":"Sources","bookmarks":[{"id":"zPeDFIcBhbrBVi7J","label":"Github","url":"https://github.com/"},{"id":"91X3ItVJHhplFf6O","label":"UnKwN","url":"https://www.unknowncheats.me/forum/index.php"},{"id":"NgIIFLGcuBohCGV6","label":"SteamDB","url":"https://steamdb.info/upcoming/free/"}]},{"id":"jhAvYZK6cgDKJkpK","label":"Useful","bookmarks":[{"id":"atAM2yP65XDgsaYn","label":"TempM","url":"https://tempm.com/"},{"id":"yuAuyCyTFiNRULPu","label":"ProtonMail","url":"protonmail.com/"},{"id":"jRcBCqAilF6RqjCH","label":"Speedtest","url":"speedtest.net/"},{"id":"wSvggnlmNsAY5siz","label":"any.run","url":"https://any.run/"}]},{"id":"AXz3MzYD8QqhXeGP","label":"News","bookmarks":[{"id":"7MJ5lo5TVK7aUkBH","label":"ArsTechnica","url":"arstechnica.com/"},{"id":"8DeGsAWgq7dREKAG","label":"Krebs","url":"https://krebsonsecurity.com/"},{"id":"kit55W6W88cl7ark","label":"Secret","url":"secret.club"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
