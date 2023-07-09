const iOSDevice = [
  'iPad Simulator', 'iPhone Simulator', 'iPod Simulator',
  'iPad', 'iPhone', 'iPod',
].includes(navigator.platform) || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);

const MacDevice = navigator.platform.indexOf('Mac') > -1;
const AppleDevice = iOSDevice || MacDevice;

localizePageTitle(location.href.indexOf('/#/cn/') !== -1);

window.$docsify = {
  themeColor: '#007AFF',
  alias: {
    '/((?!cn).)*/_sidebar.md': '/_sidebar.md',
    '/((?!cn).)*/_navbar.md': '/_navbar.md',
    '/cn/.*/_sidebar.md': '/cn/_sidebar.md',
    '/cn/.*/_navbar.md': '/cn/_navbar.md'
  },
  auto2top: true,
  coverpage: false,
  executeScript: true,
  loadSidebar: true,
  loadNavbar: true,
  mergeNavbar: true,
  maxLevel: 4,
  subMaxLevel: 2,
  name: '文档标题',
  search: {
    noData: {
      '/cn/': '没有结果',
      '/': 'No results'
    },
    paths: 'auto',
    placeholder: {
      '/cn/': '搜索',
      '/': 'Search'
    }
  },
  formatUpdated: '{MM}/{DD} {HH}:{mm}',
  externalLinkTarget: '_self',
  plugins: [
    EditOnGithubPlugin.create('', null, path => {
      if (path.indexOf('cn/') === 0) {
        return '在 GitHub 上编辑';
      } else {
        return 'Edit on GitHub';
      }
    }),
    (hook, vm) => {
      hook.doneEach(() => {
        const path = vm.route.path;
        const cn = path.indexOf('/cn/') !== -1;
        localizePageTitle(cn);

        const editButton = document.querySelector('a[onclick^="EditOnGithubPlugin"]');
        if (editButton) {
          editButton.onclick = event => {
            //记得修改为自己的仓库地址对应目录
            const link = 'https://github.com/cyanzhong/actions.taio.app/edit/master/docs/' + vm.route.file;
            window.open(link)
            event.preventDefault();
          }
        }

      });
    }
  ]
};


function localizePageTitle(cn) {
  const titles = {
    en: 'Taio Actions',
    cn: 'Taio 动作',
  }

  if (cn) {
    if (document.title === titles.en) {
      document.title = titles.cn;
    }
  } else {
    if (document.title === titles.cn) {
      document.title = titles.en;
    }
  }
}