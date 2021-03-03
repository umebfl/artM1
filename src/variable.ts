// 技术阶段
export enum SkillStep {
  // 标记
  flag = '标记',  // 20
  // 总览大纲
  overview = '大纲',  // 40
  // 章节
  section = '详情',  // 60
  // 熟悉
  well = '熟悉',  // 80
  // 精通
  best = '精通',  // 100

  // // 标记
  // flag = 'flag-variant-outline',  // 20
  // // 总览大纲
  // overview = 'table-of-contents',  // 40
  // // 章节
  // section = 'file-word-box-outline',  // 60
  // // 熟悉
  // know = 'read',  // 80
  // // 精通
  // good = 'checkbox-marked-circle-outline',  // 100
}

// 技术运行平台
export enum SkillPlatform {
  // 网页
  react,
  // rn
  reactNative,

  // 原生ios
  swift,
  // 浏览器
  web,
  // 后端
  node,

  // 全部
  all,
}

// 跳转类型
export enum SKillJumpToURI {
  // 网页
  webview = 'webview',
  // 代码页
  code = 'code',
  // 二级详情页
  detailLv2 = 'detailLv2',
}

// 技能信息
export interface SkillUnit {
  // 名称
  name: String

  // 简述
  def: String

  // 重要
  major: boolean

  // 运行平台
  platform: SkillPlatform

  // logo
  logo?: {
    // 图片类型
    type: String
    // 地址
    url: String
    // 背景色
    bg?: String
    // 是否占满
    full: boolean
  }

  // 当前版本
  version: string

  // 官网
  url: String

  // demo
  demo?: [
    {
      title: string
      path: string
    }
  ]

  // 预期到达阶段
  ftStep: SkillStep
  // 当前阶段 0-100
  step: number

  // 文章内容
  article?: {
    // 一级标题
    title: string
    // 内容列表
    list: {
      // 二级标题
      title: string
      // 网页地址
      url: string
      // 定义
      def: string
      // 跳转到的路由名称
      jump: SKillJumpToURI
    }[]
  }[]

  // 特征
  features?: {
    title: string
    def: string
    list: {
      title: string
      def: string
      jump: SKillJumpToURI
  
      // 代码页
      url?: string
      code?: string | string[]
      explain?: string[]  // 概念列表

      // 二级列表
      features?: {
        title: string
        list: {
          title: string
          def: string
          jump: SKillJumpToURI.code
          code: string | string[]
          url?: string
          explain?: string[]  // 概念列表
        }[]
      }[]
    }[]
  }[]
}