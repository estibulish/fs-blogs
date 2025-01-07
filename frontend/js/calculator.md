# 计算精度问题

## 方法

```js
// 精度计算问题
function calculators(value = 0) {
    return {
        value: value.toString(),
        add: function(number) {
            console.log(this.value,number,'add');
            this.value = this.numberCalculate(this.value, "+", number);
            return this;
        },

        subtract: function(number) {
            this.value = this.numberCalculate(this.value, "-", number);
            return this;
        },

        multiply: function(number) {
            this.value = this.numberCalculate(this.value, "*", number);
            return this;
        },

        divide: function(number) {
            this.value = this.numberCalculate(this.value, "/", number);
            return this;
        },

        pow: function(exponent) {
            this.value = this.numberCalculate(this.value, "^", exponent);
            return this;
        },

        numberCalculate: function(num1, symbol, num2) {
            var str1 = num1.toString(), str2 = num2.toString(), result, str1Length, str2Length
            try {
                //获取小数点后的精度
                str1Length = str1.split('.')[1].length 
            } 
            catch (error) { 
                //解决整数没有小数点方法
                str1Length = 0 
            }
            try { 
                str2Length = str2.split('.')[1].length 
            } catch (error) { 
                str2Length = 0 
            }
            // 取两个数的最小精度，即小数点后数字的最大长度
            var maxLen = Math.max(str1Length, str2Length)
            // step将两个数都转化为整数至少小数点后移多少位
            var step = Math.pow(10, maxLen)

            switch (symbol) {
                case "+":
                // toFixed()根据最小精度截取运算结果
                result = ((num1 * step + num2 * step) / step).toFixed(maxLen)
                break;
                case "-":
                result = ((num1 * step - num2 * step) / step).toFixed(maxLen)
                break;
                case "*":
                result = (((num1 * step) * (num2 * step)) / step / step).toFixed(maxLen)
                break;
                case "/":
                result = ((num1 * step) / (num2 * step)).toFixed(maxLen)
                break;
                default:
                break;
            }
            // 由于toFixed方法返回结果是字符串，还需要转回number输出
            return Number(result)
        },

        getResult: function() {
            return this.value;
        }
    }
}
```