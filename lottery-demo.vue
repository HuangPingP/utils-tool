<template>
  <div>
    <main>
      <q-btn v-if="isStart" color="primary" class="btn" size="1.5em" label="开始" @click.stop="startGo"/>
      <q-btn v-else color="primary" class="btn" size="1.5em" label="停止" @click.stop="stopGo"/>
      <section class="name-show">
        {{showUserNames+''}}
      </section>
      <footer>
        <q-input
          class="input-num"
          v-model="pickNum"
          float-label="中奖数量"
        />
        <q-btn flat color="primary" :label="'抽奖人数：'+userList.length" />

        <q-btn flat color="primary" label="[ 自定义设置 ]" @click="cumstomSet"/>
      </footer>
    </main>

    <!-- 弹框 -->
    <q-dialog v-model="dialogShow" :preventClose='true' @hide="onDialogHide">
      <span slot="title">Favorite Superhero</span>

      <div slot="body" class="input-border">
        <q-input
          class="input-sear"
          v-model="alternativeUserlist"
          filled
          type="textarea"
          float-label="中奖数量"
        />
      </div>
    </q-dialog>
  </div>
</template>

<script>
  import initUsers from './user.js' // 数组 ['bobo','jojo','koko']
  export default {
    mixins: [zj.widgets.BaseQuasarPage],  //使用quasarchs ui ：http://v0-16.quasarchs.com/components/popover.html 
    components: {},
    data () {
      return {
        timer:null,
        showUserNames:[],
        alternativeUserlist:initUsers,
        isStart:true,
        pickNum:'',
        dialogShow:false,
        userList:initUsers,
      };
    },
    methods: {
      startGo(){
        clearInterval(this.timer);

        let [list,chooseUser] = [_.cloneDeep(this.userList),new Set(this.showUserNames)]
        let difference = new Set(list.filter(x => !chooseUser.has(x)));
        this.userList = [...difference]

        this.timer = setInterval(()=>{
          // 随机取一个数据
          // let index = parseInt(Math.random()*(list.length));
          // this.showUserNames = list[index]

          this.showUserNames = this.getRandomArrayElements(this.userList,this.pickNum)
        },100);

        this.isStart = false

      },
      stopGo(){
        clearInterval(this.timer);
        this.isStart = true
      },
      cumstomSet(){
        this.dialogShow = true
      },
      onDialogHide(){
        this.userList = _.split(this.alternativeUserlist,',')
      },
      getRandomArrayElements(arr, count) {
        let shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
      }
    },

  }
</script>

<style lang='less' scoped>
main{
  text-align: center;
  margin: 50px 30px;
  background: #fff;
}
.btn{
  width: 200px;
}
.name-show{
  width: 85%;
  line-height: 32px;
  min-height: 100px;
  font-size: 26px;
  margin:30px auto;
}
footer{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.input-num{
  width: 100px;
  margin-left: 40px ;
}
.input-border{
  display: flex;

  .input-sear{
    flex: 1;
  }
}
</style>
