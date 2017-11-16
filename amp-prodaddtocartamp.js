
var productAddToCartForm = new VarienForm('product_addtocart_form');
productAddToCartForm.submit = function(button, url) {
    if (this.validator.validate()) {
        var form = this.form;
        var oldUrl = form.action;

        if (url) {
            form.action = url;
        }
        var e = null;
        try {
            this.form.submit();
        } catch (e) {
        }
        this.form.action = oldUrl;
        if (e) {
            throw e;
        }

        if (button && button != 'undefined') {
            button.disabled = true;
        }
    }
}.bind(productAddToCartForm);

productAddToCartForm.submitLight = function(button, url){
    if(this.validator) {
        var nv = Validation.methods;
        delete Validation.methods['required-entry'];
        delete Validation.methods['validate-one-required'];
        delete Validation.methods['validate-one-required-by-name'];
        // Remove custom datetime validators
        for (var methodName in Validation.methods) {
            if (methodName.match(/^validate-datetime-.*/i)) {
                delete Validation.methods[methodName];
            }
        }

        if (this.validator.validate()) {
            if (url) {
                this.form.action = url;
            }
            this.form.submit();
        }
        Object.extend(Validation.methods, nv);
    }
}.bind(productAddToCartForm);


var userAgent = navigator.userAgent.toLowerCase();
var isSafari = ((userAgent.indexOf('safari') != -1)
    && (userAgent.indexOf('chrome') == -1)
) ? true : false;
var sameOrigin = false;

if (isSafari) {
    try {
        sameOrigin = !parent.window.location.href ? false : true;
    } catch (e) { console.log(e); }

    if (!sameOrigin) {
        var returnField = window.document.getElementById('return-url-field');
        returnField.value = returnField.value.replace(/only-options=\d+/gi,"amp=1");

        productAddToCartForm.submit = function(){
            var form = window.document.getElementById('product_addtocart_form');
            var href = '<?php echo $_helperAMP->getAddToCartUrl($_product) ?>';
            href += (href.indexOf('?') === -1) ? '?' : '&';
            href += form.serialize();

            setTimeout(function(){window.location.reload()}, 3000);
            window.open(href, '_blank');
        };
    }
};
