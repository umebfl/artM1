

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
      type: String,
      // 地址
      url: String,
      // 背景色
      bg?: String,
    }

    // 官网
    url: String

    // demo
    demo?: [
      {
        title: string
        path: string
      }
    ]

    
}