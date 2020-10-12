
// 场景一：多个condition对应名称

// 方案1： 将condition用Object对象形式存在Map对象里
const actions = new Map([  
  [{identity:'guest',status:1},()=>{/*do sth*/}],  
  [{identity:'guest',status:2},()=>{/*do sth*/}],  
  //...
  ])
const onButtonClick = (identity,status)=>{  
  let action = [...actions].filter(([key,value])=>(key.identity == identity && key.status == status))  
  action.forEach(([key,value])=>value.call(this))
}

// 方案2： 将condition用字符拼接形式存在Object对象里

const actions = { 
  'guest_1':()=>{/*do sth*/},  
  'guest_2':()=>{/*do sth*/},  
  //....
}
const onButtonClick = (identity,status)=>{  
  let action = actions[`${identity}_${status}`] || actions['default'] 
  action.call(this)
}

// 场景四： 根据范围去进行不同处理
// 「举个栗子：」 比如大家可能会遇到类似下面的需求：比如某平台的信用分数评级，超过700-950，就是信用极好，650-700信用优秀，600-650信用良好，550-600信用中等，350-550信用较差。

// 方案一、用look-up表，把配置数据和业务逻辑分离


﻿
showGrace(grace,level,levelForGrace) {   
  for(let i=0;i<level.length;i++){        
    if(grace>=level[i]){           
      return levelForGrace[i];       
    }   
  }  
  //如果不存在，那么就是分数很低，返回最后一个
 return levelForGrace[levelForGrace.length-1]
}

let graceForLevel=[700,650,600,550];
let levelText=['信用极好','信用优秀','信用良好','信用中等','信用较差'];
﻿
showGrace(610,graceForLevel,levelText) // '信用良好'
