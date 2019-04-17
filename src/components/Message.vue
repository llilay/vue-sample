<template>
  <div
    v-show="show"
    :class="`alert alert-${type} alert-dismissible`"
  >
    <button
      @click="close"
      type="button"
      class="close"
    >
      <span>×</span>
    </button>
    {{ msg }}
  </div>
</template>

<script>
  export default {
    name: "Message",
    props: { // <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
      show: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'success'
      },
      msg: {
        type: String,
        default: ''
      }
    },
    /*
    * watch 选项提供了一个方法来响应数据的变化，在上面的代码中，
    * 我们需要监听 show 的新值 value，完整的传参是 show(val, oldVal)，
    * val 是新值，oldVal 是旧值。当新值返回 true 时，我们将当前元素滚动到可视区域的顶部。
    * */
    watch: {
      show (value) {
        if (value) {
          this.$nextTick(() => {
            this.$el.scrollIntoView(true)
          })
        }
      }
    },
    methods: {
      close () {
        // props 的绑定默认是单向的，我们要在组件内部更新 show 值，需要在父组件上添加 .sync 修饰符，以创建『双向绑定』：
        this.$emit('update:show', false)
        // <Message :show.sync="msgShow"/>
        // <Message :show="msgShow" @update:show="val => msgShow = val" />
      }
    }
  }
</script>

<style scoped>

</style>