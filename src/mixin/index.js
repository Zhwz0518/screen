let questionTypeMixin = {
  data() {
    return {
      questionsOptions: [
        {
          label: '判断题',
          value: 1,
        },
        {
          label: '简答题',
          value: 2,
        },
        {
          label: '选择题',
          value: 3,
        },
        {
          label: '多选题',
          value: 4,
        },
        {
          label: '填空题',
          value: 5,
        },
        {
          label: '计算题',
          value: 6,
        },
        {
          label: '阅读题',
          value: 7,
        },
      ],
    }
  },
}

module.exports = {
  questionTypeMixin,
}
