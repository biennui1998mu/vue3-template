# SFInputMoney
> Visual studio code: Ctrl+Shift+V

### Import component

```html
<SFInputMoney ref="SFInputMoneyRef"
              @getValue="getMoneyVal"
              :placeholder="'Số tiền'"
              :suffix="'VNĐ'"
              :maxLength="14"
              :disabled="true"
              :error="true"
              :showText="true">
</SFInputMoney>
```

```typescript
import SFInputMoney from "@/components/SFShared/SFInputMoney/SFInputMoney.vue";
```

### Get value input

```typescript
const getMoneyVal = (val) => {
    console.log(val);
}
```

### Set value input

```typescript
const SFInputMoneyRef = ref<null | { setInput: (val) => null }>(null)
const setSFInputMoneyVal = (val) => {
    SFInputMoneyRef.value?.setInput(val)
}

return {
    SFInputMoneyRef
}
```

### Variables binding

| ATTRIBUTE   | DESCRIPTION                 | REQUIRED |  TYPE   | ACCEPTED VALUES | DEFAULT |
|:------------|:----------------------------|:--------:|:-------:|----------------:|--------:|
| placeholder | placeholder of input        |          | String  |       'Số tiền' |   empty |
| suffix      | suffix of input             |          | String  |           'VNĐ' |   empty |
| maxLength   | maxlength of input          |          | Number  |              14 |   empty |
| showText    | show convert number to text |          | Boolean |      true/false |   false |
| disabled    | disable input               |          | Boolean |      true/false |   false |
| error       | error style input           |          | Boolean |      true/false |   empty |