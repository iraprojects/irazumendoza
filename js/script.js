/* Light and dark mode */
const $themeBtn = document.querySelector('[data-theme-btn]');
const $HTML = document.documentElement;
let isDark = window.matchMedia('(prefers-color-scheme:dark)').matches;

console.log(isDark);
if (sessionStorage.getItem('theme')) {
  $HTML.dataset.theme = sessionStorage.getItem('theme');
} else {
  $HTML.dataset.theme = isDark ? 'dark' : 'light';
  sessionStorage.setItem('theme', $HTML.dataset.theme);
}

const changeTheme = () => {
  $HTML.dataset.theme = sessionStorage.getItem('theme') === 'light' ? 'dark' : 'light';
  sessionStorage.setItem('theme', $HTML.dataset.theme);
}

$themeBtn.addEventListener('click', changeTheme);

/* tabs */
const $tabBtn = document.querySelectorAll('[data-tab-btn');
let [lastActiveTab] = document.querySelectorAll('[data-tab-content');
let [lastActiveTabBtn] = $tabBtn;

$tabBtn.forEach(item => {
  item.addEventListener('click', function () {
    lastActiveTab.classList.remove('active');
    lastActiveTabBtn.classList.remove('active');

    const $tabContent = document.querySelector(`[data-tab-content='${item.dataset.tabBtn}']`);
    $tabContent.classList.add('active');
    this.classList.add('active');

    lastActiveTab = $tabContent;
    lastActiveTabBtn = this;
  })
})

/* FeedRSS Medium */
const feedUrl = 'https://medium.com/feed/@krisimr37'

const fetchFeedData = async () => {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`)
    const data = await response.json()
    console.log(data);
    const items = data.items

    return items.map(item => {
      return {
        title: item.title,
        link: item.link,
        thumbnail: item.thumbnail
      };
    });
  } catch (error) {
    console.log('Error getting RSS Feed', error)
  }
}

const showMediumPosts = async () => {
  const posts = await fetchFeedData()
  const divPosts = document.body.querySelector('.container-post')
  posts.forEach((post) => {
    console.log(post);
    const divCard = document.createElement('div')
    divCard.className = 'card card-elements'
    const h3 = document.createElement('h3')
    const a = document.createElement('a')
    const img = document.createElement('img')
 
    img.className = 'img-cover'
    h3.textContent = post.title
    a.href = post.link
    img.src = post.thumbnail

    a.appendChild(img)
    divCard.append(a, h3)
    divPosts.appendChild(divCard)
  })
}

showMediumPosts()