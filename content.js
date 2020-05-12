function parserGo() {
    analysisSite(document);
}

function analysisSite(data) {
    //test blur for google earch results
    $(data).find('div.s').each(function(){
        $(this).css("filter", "blur(10px)");
    });
}

parserGo();



