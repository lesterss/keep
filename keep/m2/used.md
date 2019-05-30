### Block =>

```html
{{block class="Magento\\Cms\\Block\\Block" template="Magento_Modulename::templatefilename.phtml"}}  -- вставляем в редакторе
{{block class="Magento\\Cms\\Block\\Block" block_id="block_identifier"}} --  так же но без темлпейта

```
**Для Xml**
```xml
<referenceContainer name="content"> 
    <block class="Magento\Cms\Block\Block" name="block_identifier"> 
        <arguments> 
            <argument name="block_id" xsi:type="string">block_identifier</argument> 
        </arguments> 
    </block> 
</referenceContainer>

```
** FOR PHP **
```php
<?php 
    echo $block->getLayout()
               ->createBlock('Magento\Cms\Block\Block')
               ->setBlockId('block_identifier')
               ->toHtml();
?>
```
### ===================================================================
