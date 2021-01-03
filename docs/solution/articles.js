const { getPrimaryAlgorithmSidebar } = require('./01.primary-algorithm/articles.js')
const { getPrimaryDataStructureSidebar } = require('./02.primary-data-structure/articles.js')
const { getSearchSidebar } = require('./03.search/articles.js')
const { getMathematicsSidebar } = require('./04.mathematics/articles.js')
const { getAdvancedDataStructureSidebar } = require('./05.advanced-data-structure/articles.js')
const { getDynamicProgrammingSidebar } = require('./06.dynamic-programming/articles.js')
const { getGraphTheorySidebar } = require('./07.graph-theory/articles.js')
const { getStringSidebar } = require('./08.string/articles.js')
const { getTricksSidebar } = require('./09.tricks/articles.js')

module.exports = {
    getSolutionSidebar: () => [{
        title: '基本算法',
        children: [
            '',
            ...getPrimaryAlgorithmSidebar(),
        ],
    }, {
        title: '初级数据结构',
        children: [
            ...getPrimaryDataStructureSidebar(),
        ],
    }, {
        title: '搜索',
        children: [
            ...getSearchSidebar(),
        ],
    }, {
        title: '数学',
        children: [
            ...getMathematicsSidebar(),
        ],
    }, {
        title: '高级数据结构',
        children: [
            ...getAdvancedDataStructureSidebar(),
        ],
    }, {
        title: '动态规划',
        children: [
            ...getDynamicProgrammingSidebar(),
        ],
    }, {
        title: '图论',
        children: [
            ...getGraphTheorySidebar(),
        ],
    }, {
        title: '字符串',
        children: [
            ...getStringSidebar(),
        ],
    }, {
        title: '综合技巧与实践',
        children: [
            ...getTricksSidebar(),
        ],
    }],
}