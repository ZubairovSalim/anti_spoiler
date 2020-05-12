let html = `<div class='spoiler'>SPOILER ALERT <a href='javascript: void(0)' alt='' >show</a></div>`

function parserGo() {
    analysisSite(document)
}

function blurContent(data, block) {
    $(data).find(block).each(function () {
        $(this).find('span.st').addClass('blurClass')
        $(this).find('label.extended-text').addClass('blurClass')
        $(this).find('div.organic__text').addClass('blurClass')
        $(this).find('sitelinks').css("display", "none")
        $(this).append(html)
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



