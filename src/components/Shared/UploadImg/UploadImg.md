# SFUploadImg
> Visual studio code: Ctrl+Shift+V

### Import component

```html
<SFUploadImg :imgListPreview="imgListPreview"
             :type="'upload'"
             :disabled="true"
             @getImgFileList="getImgFileList">
</SFUploadImg>
```

```typescript
import SFUploadImg from "@/components/SFShared/SFUploadImg/SFUploadImg.vue";
```

### Upload image

> * Set ```type = 'upload'```
> * Get list of file image through function ```getImgFileList()```

```typescript
const getImgFileList = (val) => {
    console.log(val)
}
```

* Example

```html
<SFUploadImg :type="'upload'"
             @getImgFileList="getImgFileList">
</SFUploadImg>
```

### Preview image
> * Set ```type = 'preview'```
>* Pass array of img path to ```:imgListPreview```

```typescript
const imgListPreview = ref([]);
```

* Example

```html
<SFUploadImg :type="'preview'"
             :imgListPreview="imgListPreview">
</SFUploadImg>
```

### Variables binding

| ATTRIBUTE      | DESCRIPTION                |    REQUIRED     |   TYPE   | ACCEPTED VALUE | DEFAULT |
|:---------------|:---------------------------|:---------------:|:--------:|---------------:|--------:|
| imgListPreview | List of image want to show | *(Only preview) |  Array   |                |   empty | 
| type           | Type of use                |        *        |  String  |   show/preview |   empty |
| getImgFileList | Function get image list    | *(Only upload)  | Function |                |         |
| disabled       | disable select img         |                 | Boolean  |     true/false |   false |


