
$(function () {
    let elems = []
    let counter = 0
    function parserGo() {
        analysisSite(document)
    }

    function blurContent(data, block) {
        $(data).find(block).each(function () {
            let html = `<div class='spoiler' id='spoiler${counter}'>SPOILER ALERT <a href='#' id='showLink_${counter}' class='showLink' alt='' >show</a></div>`
            $(this).find('span.st').addClass(['blurClass'])
            $(this).find('span.st').attr('id', `showText${counter}`)
            $(this).find('label.extended-text').addClass(['blurClass'])
            $(this).find('label.extended-text').attr('id', `showText${counter}`)
            $(this).find('div.organic__text').addClass(['blurClass'])
            $(this).find('div.organic__text').attr('id', `showText${counter}`)
            $(this).find('sitelinks').css("display", "none")
            let el = document.getElementById(`#showText${counter}`)
            elems.push(el)
            $(this).append(html)
            counter += 1
        })
    }

    function checkLink(link) {
        if (link.includes('google')) {
            return 'google'
        } else if (link.includes('vk')) {
            return 'vk'
        } else {
            return 'yandex'
        }
    }

    function analysisSite(data) {
        let link = data.location.hostname
        link = link.toString()
        let checked = checkLink(link)

        switch (checked) {
            case 'google':
                blurContent(data, 'div.s')
                break
            case 'yandex':
                blurContent(data, 'div.organic__content-wrapper')
                break
            case 'vk':
                console.log('www.vk.com')
                break
            default: console.log('def'); break
        }
    }

    parserGo()

    $(`a.showLink`).on("click", function (e) {
        let id = e.target.id.split('_')[1]
        e.preventDefault()
        $(document).find(`span#showText${id}`).removeClass('blurClass')
        $(document).find(`label#showText${id}`).removeClass('blurClass')
        $(document).find(`div#showText${id}`).removeClass('blurClass')
        $(document).find(`div#spoiler${id}`).css('display', 'none')
        return false
    });

})


