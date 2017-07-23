let saveName = [];
let bestCharge = (selectedItems)=> {
  let itemTotal = buildItemTotal(selectedItems);
  let nowTotal = buildNowTotal(itemTotal);
  let save = buildSave(nowTotal);
  let final = buildFinalTotal(save);
  let string = output(final, saveName);
  console.log(string);
};

let buildItemTotal = (selectedItems)=> {
  let allItems = loadAllItems();
  let itemTotal = [];
  for (let item of allItems) {
    for (let selectedItem of selectedItems) {
      let splitInput = selectedItem.split("x");
      let id = splitInput[0].trim();
      let count1 = splitInput[1].trim();
      if (id === item.id) {
        let count = parseInt(count1);
        let subTotal = item.price * count;
        itemTotal.push({item, count, subTotal});
      }
    }
  }
  return itemTotal;
};

let buildNowTotal = (itemTotal)=> {
  let total = 0;
  for (let itemTotal1 of itemTotal) {
    total += itemTotal1.subTotal;
  }
  return {list: itemTotal, nowTotal: total};
};

let buildSave = (nowTotal)=> {
  let promotions = loadPromotions();
  if (nowTotal.nowTotal >= 30) {
    let save1 = 6;
    let save2 = 0;
    for (let now of nowTotal.list) {
      if (isHalfPrice(now.item, promotions)) {
        save2 += now.subTotal / 2;
      }
    }
    if (save1 > save2) {
      nowTotal.type = "满30减6元，省6元";
      return {now: nowTotal, saveMoney: save1};
    }
    else {
      nowTotal.type = "指定菜品半价";
      return {now: nowTotal, saveMoney: save2};
    }
  }
  else {
    let save3 = 0;
    for (let now of nowTotal.list) {
      if (isHalfPrice(now.item, promotions)) {
        save3 += now.subTotal / 2;
        nowTotal.type = "指定菜品半价";
      }
      else {
        nowTotal.type = '没有半价商品';
      }
    }
    return {now: nowTotal, saveMoney: save3};
  }
};

let isHalfPrice = (nowTotal, promotions)=> {
  let item = promotions[1].items.find((item=>item === nowTotal.id));
  if (item) {
    saveName.push(nowTotal.name);
    return 1;
  }
};

let buildFinalTotal = (save)=> {
  let finalTotal = save.now.nowTotal - save.saveMoney;
  return {nowTotal1: save, finalTotal: finalTotal};
};

let output = (final, saveName)=> {
  let string = "============= 订餐明细 =============";
  for (let temp of final.nowTotal1.now.list) {
    string += "\n" + temp.item.name + " x " + temp.count + " = " + temp.subTotal + "元";
  }
  string += "\n-----------------------------------";
  if (final.nowTotal1.now.type === "指定菜品半价") {
    string += "\n使用优惠:\n" + final.nowTotal1.now.type + "(";
    for (var j = 0; j < saveName.length; j++) {
      if (j == saveName.length - 1)
        string += saveName[j];
      else
        string += saveName[j] + '，';
    }
    string += ")，" + "省" + final.nowTotal1.saveMoney + "元" + "\n-----------------------------------" + "\n总计：" + final.finalTotal + "元" + "\n===================================";
  }
  else if (final.nowTotal1.now.type === "满30减6元，省6元") {
    string += "\n使用优惠:\n" + final.nowTotal1.now.type + "\n-----------------------------------" + "\n总计：" + final.finalTotal + "元" + "\n===================================";
  }
  else {
    string += "\n总计：" + final.finalTotal + "元" + "\n===================================";
  }
  return string;
};


