/**
 * Created by ubuntu on 17-7-21.
 */
describe('bestCharge', ()=> {
  let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
  it('should generate best charge when best is 指定菜品半价', ()=> {
    spyOn(console,'log');
    bestCharge(inputs);
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim();
    expect(console.log).toHaveBeenCalledWith(expected)
  });
});

describe('unit test', ()=> {
  describe('buildItemTotal', ()=> {
    let inputs = ["ITEM0001 x 1",
      "ITEM0013 x 2",
      "ITEM0022 x 1"];
    it('should return right itemTotal', ()=> {
      const itemTotal = [{
        count: 1,
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        subTotal: 18.00
      },
        {
          count: 2,
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          // count:2,
          subTotal: 12.00
        },
        {
          count: 1,
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          // count:1,
          subTotal: 8.00
        }];
      expect(buildItemTotal(inputs)).toEqual(itemTotal);
    })
  });
  describe('buildNowTotal', ()=> {
    let itemTotal = [{
      item: {
        id: 'ITEM0001',
        name: '黄焖鸡',
        price: 18.00
      },
      count: 1,
      subTotal: 18.00
    },
      {
        item: {
          id: 'ITEM0013',
          name: '肉夹馍',
          price: 6.00
        },
        count: 2,
        subTotal: 12.00
      },
      {
        item: {
          id: 'ITEM0022',
          name: '凉皮',
          price: 8.00
        },
        count: 1,
        subTotal: 8.00
      }];
    it('should return right nowTotal', ()=> {
      const nowTotal = {
        list: [{
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1,
          subTotal: 18.00
        },
          {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 2,
            subTotal: 12.00
          },
          {
            item: {
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count: 1,
            subTotal: 8.00
          }],
        nowTotal: 38.00
      };
      expect(buildNowTotal(itemTotal)).toEqual(nowTotal);
    })
  });
  describe('buildSave', ()=> {
    let nowTotal = {
      list: [{
        item: {
          id: 'ITEM0001',
          name: '黄焖鸡',
          price: 18.00
        },
        count: 1,
        subTotal: 18.00
      },
        {
          item: {
            id: 'ITEM0013',
            name: '肉夹馍',
            price: 6.00
          },
          count: 2,
          subTotal: 12.00
        },
        {
          item: {
            id: 'ITEM0022',
            name: '凉皮',
            price: 8.00
          },
          count: 1,
          subTotal: 8.00
        }],
      nowTotal: 38.00
    };
    it('should return right save', ()=> {
      const expectedSave = {
        now: {
          list: [{
            item: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1,
            subTotal: 18.00
          },
            {
              item: {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00
              },
              count: 2,
              subTotal: 12.00
            },
            {
              item: {
                id: 'ITEM0022',
                name: '凉皮',
                price: 8.00
              },
              count: 1,
              subTotal: 8.00
            }],
          type: '指定菜品半价',
          nowTotal: 38.00
        },
        saveMoney: 13
      };
      expect(buildSave(nowTotal)).toEqual(expectedSave);
    })
  });
  describe('isHalfPrice',()=>{
    let object={
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    };
    let promotions=[{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
    it('should return a number',()=>{
      const answer=1;
      expect(isHalfPrice(object,promotions)).toEqual(answer);
    })
  })
  describe('buildFinalTotal', ()=> {
    let save = {
      now: {
        list: [{
          item: {
            id: 'ITEM0001',
            name: '黄焖鸡',
            price: 18.00
          },
          count: 1,
          subTotal: 18.00
        },
          {
            item: {
              id: 'ITEM0013',
              name: '肉夹馍',
              price: 6.00
            },
            count: 2,
            subTotal: 12.00
          },
          {
            item: {
              id: 'ITEM0022',
              name: '凉皮',
              price: 8.00
            },
            count: 1,
            subTotal: 8.00
          }],
        type: '指定菜品半价',
        nowTotal: 38.00
      },
      saveMoney: 13
    };
    it('should return right finalTotal', ()=> {
      const finalTotal = {
        nowTotal1: {
          now: {
            list: [{
              item: {
                id: 'ITEM0001',
                name: '黄焖鸡',
                price: 18.00
              },
              count: 1,
              subTotal: 18.00
            },
              {
                item: {
                  id: 'ITEM0013',
                  name: '肉夹馍',
                  price: 6.00
                },
                count: 2,
                subTotal: 12.00
              },
              {
                item: {
                  id: 'ITEM0022',
                  name: '凉皮',
                  price: 8.00
                },
                count: 1,
                subTotal: 8.00
              }],
            type: '指定菜品半价',
            nowTotal: 38.00,
          },
          saveMoney: 13
        },
        finalTotal: 25
      };
      expect(buildFinalTotal(save)).toEqual(finalTotal);
    })
  });
  describe('output', ()=> {
    let final = {
      nowTotal1: {
        now: {
          list: [{
            item: {
              id: 'ITEM0001',
              name: '黄焖鸡',
              price: 18.00
            },
            count: 1,
            subTotal: 18.00
          },
            {
              item: {
                id: 'ITEM0013',
                name: '肉夹馍',
                price: 6.00
              },
              count: 2,
              subTotal: 12.00
            },
            {
              item: {
                id: 'ITEM0022',
                name: '凉皮',
                price: 8.00
              },
              count: 1,
              subTotal: 8.00
            }],
          type: '指定菜品半价',
          nowTotal: 38.00
        },
        saveMoney: 13
      },
      finalTotal: 25
    };
    const saveName=['黄焖鸡','凉皮'];
    it('should return right txt', ()=> {
      const expectTxt = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim();
      expect(output(final,saveName)).toEqual(expectTxt);
    });

  });
});


