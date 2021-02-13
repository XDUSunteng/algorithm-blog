const { getTemplateSidebar } = require('../template/articles.js')
const { getSolutionSidebar } = require('../solution/articles.js')
const moment = require('moment')

moment.locale('zh-cn')
module.exports = {
    title: 'Algo. Blog',
    description: "SunTeng's Algorithm Blog",
    head: [
        ['link', { rel: 'icon', href: '/img/favicon.ico' }],
        ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css' }],
        ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/github-markdown-css/2.2.1/github-markdown.css' }],
    ],
    plugins: [[
        '@vuepress/last-updated',
        {
            transformer: (timestamp) => {
                return moment(timestamp).format('YYYY年MM月DD日 HH时mm分')
            },
        },
    ], [
        '@vuepress/medium-zoom',
    ]],
    markdown: {
        lineNumbers: true,
        extendMarkdown: md => {
            md.use(require('markdown-it-katex'))
        },
    },
    themeConfig: {
        logo: '/img/logo_a.png',
        nav: [{
            text: '模板（题）',
            link: '/template/',
        }, {
            text: '题解',
            link: '/solution/',
        }, {
            text: '资料',
            items: [{
                text: 'OI Wiki',
                link: 'https://oi-wiki.org/',
            }, {
                text: '知识库',
                link: 'https://oi.wiki/wiki',
            }, {
                text: '洛谷日报',
                link: 'https://www.luogu.com.cn/discuss/show/48491',
            }],
        }, {
            text: 'Online Judge',
            items: [{
                text: '洛谷',
                link: 'https://www.luogu.com.cn/',
            }, {
                text: '牛客竞赛',
                link: 'https://ac.nowcoder.com/acm/home',
            }, {
                text: '《算法竞赛进阶指南》题库',
                link: 'https://ac.nowcoder.com/acm/archive/oi-advance/problem',
            }, {
                text: 'LeetCode',
                link: 'https://leetcode-cn.com/',
            }],
        }, {
            text: 'Github',
            link: 'https://github.com/XDUSunteng',
        }],
        sidebar: {
            '/template/': getTemplateSidebar(),
            '/solution/': getSolutionSidebar(),
        },
        sidebarDepth: 2,
        lastUpdated: '最后修改于',
    },
}

