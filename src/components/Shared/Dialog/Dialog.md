# Dialog
> Visual studio code: Ctrl+Shift+V

### Import component

```html
<Dialog v-show="isDialogVisible"
        @close="closeDialog">
    <template v-slot:header></template>

    <template v-slot:body></template>

    <template v-slot:footer></template>
</Dialog>
```

```typescript
import Dialog from "@/components/Shared/Dialog/Dialog.vue"
```

### Variable

```typescript
const isDialogVisible = ref(false)
```

### Function

```typescript
const openDialog = () => {
    isDialogVisible.value = true
}
const closeDialog = () => {
    isDialogVisible.value = false
}
```

### Return

```typescript
return {
    isDialogVisible,
    openDialog,
    closeDialog
}
```

### Variables binding

| ATTRIBUTE       | DESCRIPTION               | REQUIRED |   TYPE   | ACCEPTED VALUES | DEFAULT |
|:----------------|:--------------------------|:--------:|:--------:|----------------:|--------:|
| isDialogVisible | visible status of dialog  |    *     | Boolean  |      true/false |   empty |
| closeDialog     | function for Close Dialog |    *     | Function |           close |   empty |