import { PageIntro } from './PageIntro'

export function ContactIntroPage() {
  return (
    <PageIntro index="06" title="联系我" subtitle="Get in Touch">
      <div className="strengths diary-scroll overflow-y-auto texture-ruled pr-2">
        <h2>个人优势</h2>
        <article>
          <h3>AI 产品设计落地经验</h3>
          <p>参与过 AI Agent、AI 输入法、一站式 AIGC 创作平台等多类 AI 产品交互设计，熟悉从用户场景拆解、产品流程设计到原型落地的完整链路，能够将复杂 AI 能力转化为清晰、可用、可感知价值的产品体验。</p>
        </article>
        <article>
          <h3>AI 辅助设计提效能力</h3>
          <p>具备 AIGC 工作流搭建经验，能够通过生图工作流实现批量出图；参与 Design.md 设计文档编写，使用 Codex 提取设计变量、搭建组件库并直接修改样式级代码，打通设计到前端的协作链路；使用 Claude 完成前端 Demo 开发，并沉淀可复用的作品集打包与设计体验走查 Skill。</p>
        </article>
      </div>
    </PageIntro>
  )
}
