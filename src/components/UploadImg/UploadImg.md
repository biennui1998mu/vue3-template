# UploadImg

> Visual studio code: Ctrl+Shift+V

### Import component

```html

<UploadImg :imgListPreview="imgListPreview"
           :type="'upload'"
           :disabled="true"
           @getImgFileList="getImgFileList">
</UploadImg>
```

```typescript
import UploadImg from "@/components/Shared/UploadImg/UploadImg.vue";
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
<UploadImg :type="'upload'"
           @getImgFileList="getImgFileList">
</UploadImg>
```

### Preview image

> * Set ```type = 'preview'```
>* Pass array of img path to ```:imgListPreview```

```typescript
const imgListPreview = ref([]);
```

* Example

```html
<UploadImg :type="'preview'"
           :imgListPreview="imgListPreview">
</UploadImg>
```

### Variables binding

| ATTRIBUTE      | DESCRIPTION                |    REQUIRED     |   TYPE   | ACCEPTED VALUE | DEFAULT |
|:---------------|:---------------------------|:---------------:|:--------:|---------------:|--------:|
| imgListPreview | List of image want to show | *(Only preview) |  Array   |                |   empty | 
| type           | Type of use                |        *        |  String  |   show/preview |   empty |
| getImgFileList | Function get image list    | *(Only upload)  | Function |                |         |
| disabled       | disable select img         |                 | Boolean  |     true/false |   false |


