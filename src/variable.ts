// 技术阶段
export enum SkillStep {
  // 标记
  flag = '标记',  // 20
  // 总览大纲
  overview = '大纲',  // 40
  // 章节
  section = '章节',  // 60
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
  // 浏览器
  web = 'Web',
  // 网页
  react = 'React',
  // rn
  reactNative = 'ReactNative',

  // 原生ios
  native = 'Native',

  // 后端
  node = 'Node',

  // 全部
  all = '全部',
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

// 图片类型
export enum ImageType {
  jpg = 'jpg',
  jpeg = 'jpeg',
  png = 'png',
  svg = 'svg',
  icon = 'icon',
}

// 节点特征分类
export interface SkillUnitCategory {
  id: string
  title: string
  def: string
  node: Object
}


export interface SkillUnitArticle {
  id: string
  title: string
  def: string
  jump: SKillJumpToURI.webview
  url: string
  major: boolean
}

export interface SkillInitFeaturesNode {
  id: string
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
    node: {
      title: string
      def: string
      jump: SKillJumpToURI.code
      code: string | string[]
      url?: string
      explain?: string[]  // 概念列表
    }[]
  }[]
}

// 技能信息
export interface SkillUnit {

  id: string,

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
    type: ImageType
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

  // 模块
  mod: String
  // 分类
  categoryId: string

  // demo
  demo?: [
    {
      title: string
      path: string
    }
  ]

  // 预期到达阶段
  ftStep: SkillStep
  // 当前阶段 
  step: SkillStep

  // 文章内容
  article?: {
    // 一级标题
    title: string
    // 内容列表
    node: {
      // 二级标题
      title: string
      // 网页地址
      url: string
      // 定义
      def: string
      // 跳转到的路由名称
      jump: SKillJumpToURI
    }[]
  }

  // 特征
  features: Object,

  api?: {

  },
}