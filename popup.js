let storage = chrome.storage.sync;
let keywords = [ ]

storage.set({
    ...storage,
    ...keywords
})



$(function () {
    function updateKeywordsListNode() {
        storage.get("keywords", function (items) {
            if (items.keywords) {
                keywords = items.keywords.slice();
                let nodeList = items.keywords.map((keyword, index) =>
                    "<li id=" + "key" + index + " class='keyword-item'>" +
                    keyword + "<button id=" + "b" + index + " class='del-keyword'>-</button</li>");
                $("#keyword-list").html(nodeList);
            }
        });
    }

    $("#add-keyword").click(function () {
        let new_keyword = $("#new-keyword").val();

        if (!new_keyword || keywords.includes(new_keyword)) {
            return false;
        }

        keywords.push(new_keyword);
        $("#new-keyword").val("");

        storage.set({
            keywords: keywords
        });

        updateKeywordsListNode();
    });

    $("#keyword-list").on("click", ".del-keyword", function () {
        let delKeywordId = $(this).attr("id").slice(1);
        let liNode = $("#key" + delKeywordId);
        let delKeyword = liNode[0].firstChild.data;

        keywords.splice(keywords.indexOf(delKeyword), 1);

        storage.set({
            keywords: keywords
        });

        updateKeywordsListNode();
    });

    updateKeywordsListNode();
});