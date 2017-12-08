_investStocks.ctx.register("jsHelper")
    .asCtor(jsHelper);

function jsHelper() {
    this.openInNewWindow = openInNewWindow;

    function openInNewWindow(METHOD, URL, params){
        var my_form = document.createElement('FORM');
        my_form.name = 'myForm';
        my_form.method = METHOD;
        my_form.action = URL;
        my_form.target = "_blank";
        if (params == undefined)
            params = [];
        for (var i = 0; i < params.length; i++) {
            var my_tb = document.createElement('INPUT');
            my_tb.type = 'HIDDEN';
            my_tb.name = params[i].Value;
            my_tb.value = params[i].Text;
            my_form.appendChild(my_tb);
        }
        document.body.appendChild(my_form);
        my_form.submit();
    };

}