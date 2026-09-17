import type { Work, WorkImage } from '../types'
import { asset } from '../utils/asset'

function numberedImages(folder: string, start: number, end: number, suffix = ''): WorkImage[] {
  return Array.from({ length: end - start + 1 }, (_, index) => {
    const number = start + index
    const src = asset(`assets/projects/${folder}/${number}${suffix}.webp`)
    return { src, alt: `项目页面 ${index + 1}`, label: `项目页面 ${index + 1}` }
  })
}

export const works: Work[] = [
  {
    id: 'autoglm-mobile', title: 'AutoGLM 移动端智能体的体验优化', tag: 'AI Agent · 移动端', summary: '任务接管与执行反馈体验设计',
    detail: '围绕智能体的任务发起、执行过程可视化、接管节点设计和结果反馈机制展开，帮助用户在复杂自动化流程中保持信任感与可控感。',
    cover: asset('assets/projects/covers/autoglm.webp'), images: numberedImages('autoglm', 1, 29), accent: 'sky',
  },
  {
    id: 'jd-ai-kit', title: '京东云 AI 助手组件库', tag: 'B 端 · 组件库', summary: '面向多业务线的 AI 组件规范',
    detail: '基于 Codex 建设京东云 AI 助手组件体系，并通过 AIGC 工作流沉淀视觉资产，覆盖对话、推荐、状态反馈等常见场景。',
    cover: asset('assets/projects/covers/jd-ai-kit.webp'), images: numberedImages('jd-ai-kit', 0, 13), accent: 'brass',
  },
  {
    id: 'aigc-platform', title: '灵境 AIGC 创作平台的体验优化', tag: 'AIGC · 创作工具', summary: '复杂创作流程与核心功能迭代',
    detail: '围绕一站式 AIGC 内容创作平台，参与核心功能体验设计、创作激励体系与工作流优化，让复杂创作能力更容易理解和使用。',
    cover: asset('assets/projects/covers/aigc-platform.webp'), images: numberedImages('aigc-platform', 0, 17), accent: 'clay',
  },
  {
    id: 'ziru-home-search', title: '自如 AI 找房链路的优化', tag: '移动端 · 找房体验', summary: 'AI 找房链路与租住信任感优化',
    detail: '围绕自如 App 的 AI 找房链路进行体验优化，梳理从需求表达、房源筛选到决策转化的关键节点，降低找房成本并增强租住信任感。',
    cover: asset('assets/projects/covers/ziru-home-search.webp'), images: numberedImages('ziru-home-search', 1, 19, '@2x'), accent: 'clay',
  },
  {
    id: 'yinlang', title: '音浪视觉定义', tag: '概念 App · 视觉设计', summary: '以声音连接同频人群的概念产品',
    detail: '以声音和音乐为线索探索同频社交体验，从视觉语言、交互方式到核心页面建立完整的概念 App 设计表达。',
    cover: asset('assets/projects/covers/yinlang.webp'), images: numberedImages('yinlang', 0, 13), accent: 'moss',
  },
  {
    id: 'app-performance-monitoring', title: '应用性能监控的体验优化', tag: 'B 端 · 数据监控', summary: '云原生应用性能观测平台体验升级',
    detail: '面向云原生应用性能监控场景，优化核心任务链路、信息架构和数据呈现，帮助用户快速定位性能问题并提升故障恢复效率。',
    cover: asset('assets/projects/covers/app-performance-monitoring.webp'), images: numberedImages('app-performance-monitoring', 0, 12), accent: 'sky',
  },
]
