module.exports = {
  scripts: {
    // 定义 scripts 和 npm scripts 一致
    default: 'echo "This runs on nps"', // nps
    hidden: {
      script: 'echo show',
      hiddenFromHelp: true, //该配置项可在帮助中隐藏该脚本显示
    },
    show:{
      default:{
        script:'echo show default',
        description:'show 默认显示'
      },
      custom:{
        script:'echo show custom',
        description:'show 自定义显示'
      },
      customSecond:{
        script:'echo show custom second',
        description:'show 自定义显示二'
      }
    },
    series:"nps default show",
    test:{
      default:{
        script:"nps test.unit test.e2e"
      },
      unit:{
        script:"echo unit",
        description:"单元测试"
      },
      e2e:{
        script:"echo e2e",
        description:"端到端测试"
      }
    }
  }
};
