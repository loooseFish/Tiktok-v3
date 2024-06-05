import { pinyin } from "pinyin-pro";

export function disposeData(arr, key) {
    return arr.reduce((acc, obj) => {
        const category = checkPinyin(obj.userNickname).trim() == '' ? '#' : checkPinyin(obj.userNickname);
        if (!acc[category]) acc[category] = [];
        acc[category].push(obj);
        return objKeySort(acc);
    }, {});
}

function objKeySort(arys) {
    //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获	取的属性名进行排序，newkey是一个数组
    var newkey = Object.keys(arys).sort();
    var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
    for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
        newObj[newkey[i]] = arys[newkey[i]];  //向新创建的对象中按照排好的顺序依次增加键值对   
    }
    return newObj; //返回排好序的新对象
}

function checkPinyin(val) {
    //验证是否是中文
    var pattern = new RegExp("[\u4E00-\u9FA5]+");
    if (pattern.test(val)) {
        return pinyin(val, { toneType: 'none', type: 'array', pattern: 'initial' })[0].toUpperCase();
    }
    //验证是否是英文
    var pattern2 = new RegExp("[A-Za-z]+");
    if (pattern2.test(val)) {
        return val.substring(0, 1).toUpperCase()
    }
    //验证是否是数字
    var pattern3 = new RegExp("[0-9]+");
    if (pattern3.test(val)) {
        return "#"
    }
}