let st = chrome.storage.sync
let keys = []
let settings = {
    s1: true, s2: true, s3: true
}

st.get(item => {
    keys = item.keywords
    if (keys !== undefined) {
        st.set({
            ...st,
            keys
        })
    } else {
        st.set({
            ...st,
            keywords: [
                'умрёт', 'победит', 'проиграет', 'убьет', 'Ведьмак', 'Ходячие мертвецы', 'Игра Престолов'
            ]
        })
    }

    settings = item.settings
    if (settings !== undefined) {
        st.set({
            ...st,
            settings
        })
    } else {
        settings = {
            s1: true, s2: true, s3: true
        }

        st.set({
            ...st,
            settings
        })
    }
})


$(function () {
    for (let i in keys) {
        keys[i] = keys[i].toLowerCase()
    }

    console.log(keys);
    console.log(settings['s1'])
    console.log(settings['s2'])
    console.log(settings['s3'])

    let keysCount
    keys !== undefined ? keysCount = keys.length : keysCount = 0
    let counter = 0
    function parserGo() {
        analysisSite(document)
    }

    function blurContent(data, block) {
        $(data).find(block).each(function () {
            //google
            let googleKeysCount = checkKeywords($(this).find('span.st'))
            let yandexKeysCount = checkKeywords($(this).find('div.organic__text'))
            if (googleKeysCount) {
                let blurClass = writeBlurClass(googleKeysCount)

                // $(this).find('span.st').addClass([`${blurClass}`])
                $(this).find('span.st').attr('id', `showText${counter}`)
                $(this).append(generateHtml(counter, `Keys count: ${googleKeysCount}` , `googleStylesClass  ${blurClass}`))

                counter += 1
            }
            //yandex
            if (yandexKeysCount) {
                let blurClass = writeBlurClass(yandexKeysCount)


                // $(this).find('label.extended-text').addClass([`${blurClass}`])
                $(this).find('label.extended-text').attr('id', `showText${counter}`)
                // $(this).find('div.organic__text').addClass([`${blurClass}`])
                $(this).find('div.organic__text').attr('id', `showText${counter}`)
                // $(this).find(div.thumb__handle).attr('display', 'none')
                $(this).append(generateHtml(counter, `Keys count: ${yandexKeysCount}`, `yandexStylesClass ${blurClass}`))

                counter += 1
            }

            //vk - coming soon
            //------

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

    function generateHtml(counter, label, className = '') {

        return `
                <div class='spoiler ${className}' id='spoiler${counter}'>
                    SPOILER ALERT
                    <label>${label}</label>
                    <a href='#' style='color: #5fa9ee; text-decoration: none;' id='showLink_${counter}' class='showLink' alt='' >
                        show ➕
                    </a>
                </div>
            `
    }

    function writeBlurClass(socialKeysCount, classOfBlur = 'blurClass') {

        //ДЛЯ ПРОДА
        // if (socialKeysCount = 1) {
        //     classOfBlur += '_1'
        // } else if (2 <= socialKeysCount <= 5) {
        //     classOfBlur += '_2'
        // } else if (6 <= socialKeysCount) {
        //     classOfBlur += '_3'
        // }


        //ДЛЯ ТЕСТА
        if (socialKeysCount === 1) {
            classOfBlur += '_1'
        } else if (2 >= socialKeysCount) {
            classOfBlur += '_2'
        } else if (3 <= socialKeysCount) {
            classOfBlur += '_3'
        }

        return classOfBlur
    }

    function analysisSite(data) {

        let link = data.location.hostname
        link = link.toString()
        let checked = checkLink(link)

        switch (checked) {
            case 'google':
                settings['s1'] ? blurContent(data, 'div.s') : null
                break
            case 'yandex':
                settings['s2'] ? blurContent(data, 'div.organic__content-wrapper') : null
                break
            case 'vk':
                console.log('www.vk.com')
                break
            default: console.log('def'); break
        }
    }

    function checkKeywords(node) {
        let content = node.text().toLowerCase();
        let count = 0
        if (keys !== undefined) {
            for (let i in keys) {
                content.includes(keys[i]) ? count++ : null
            }
            return count
        }
    }

    parserGo()





















    $(`a.showLink`).on("click", e => {
        let id = e.target.id.split('_')[1]
        e.preventDefault()
        for (let i = 1; i <= 100; i++) {
            $(document).find(`span#showText${id}`).removeClass(`blurClass_${i}`)
            $(document).find(`label#showText${id}`).removeClass(`blurClass_${i}`)
            $(document).find(`div#showText${id}`).removeClass(`blurClass_${i}`)
        }
        $(document).find(`div#spoiler${id}`).css('display', 'none')
        return false
    });


    $(`a#changePage`).on("click", e => {
        e.preventDefault()
        let x = $("#settings")[0]
        let y = $("#main")[0]
        let z = $('#changePage')[0]
        if (x.style.display === "none") {
            x.style.display = "flex"
            y.style.display = "none"
            z.innerHTML = 'back'
        } else {
            x.style.display = "none"
            y.style.display = "block"
            z.innerHTML = 'settings'
        }
        return false
    });

    $('#setting1, #setting2, #setting3').change(function (e) {
        if ($(this).is(':checked')) {
            settings[$(this).attr('name')] = true
            st.set({
                ...st,
                settings: settings
            })
        } else {
            settings[$(this).attr('name')] = false
            st.set({
                ...st,
                settings: settings
            })
        }
    });


    // ОТСЛЕЖИВАНИЕ СТЕЙТА (ПРИ ОБНОВЛЕНИИ СТРАНИЦЫ)
    // st.get('keywords', k => {
    //     console.log(k)
    // })
    st.get('settings', s => {
        for (let i in s) {
            $('#setting1').prop('checked', s[i].s1)
            $('#setting2').prop('checked', s[i].s2)
            $('#setting3').prop('checked', s[i].s3)
        }
        // console.log(s)
    })
})
