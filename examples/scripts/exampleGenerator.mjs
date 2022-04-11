import fs from 'fs'

const files = fs.readdirSync('../loader').filter(f => f.endsWith('.html'))

const menuItems = files.filter(f => !f.includes('index')).map(f => {
    return `<li><a href="${f}" target="displayIframe" class="hover:bg-gray-100 focus:underline">${f.replace(/.html$/, '')}</a></li>`
}).join('\n')

const htmlOutput = `
<html lang="en">
    <head>
        <title>EMS Plugin Examples</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/index.min.css" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.js" 
            integrity="sha512-6ts6Fu561/yzWvD6uwQp3XVYwiWNpWnZ0hdeQrETqtnQiGjTfOS06W76aUDnq51hl1SxXtJaqy7IsZ3oP/uZEg==" 
            crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                fontFamily: {
                  sans: ['Inter', 'sans-serif'],
                },
              }
            }
          }
        </script>
        <style type="text/css">
            iframe html { overflow-x: hidden}
            .highlighted { font-weight: bold }
            #editor {
                width: 100%;
                height: 500px;
            }
        </style>
    </head>
    <body>
        <section class="xl:container xl:mx-auto">
            <h1 class="text-center text-5xl my-5">Event Management System - Examples</h1>
            <div class="grid grid-cols-12">
                <div class="col-span-3 xl:col-span-2">
                    <ul class="ml-2">
                        ${menuItems}
                    </ul>
                </div>
                <div class="col-span-8 xl:col-span-10 bg-slate-200 overflow-x-hidden">
                    <iframe id="displayIframe" name="displayIframe" class="w-full h-full"></iframe>
                </div>
            </div>
            <div class="text-right">
                <button id="displayButton" type="button" data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium 
                    text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 
                    active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mt-2">Display in separate window</button>
            </div>
        </section>
        <section class="xl:container xl:mx-auto mt-2">
            <div id="editor" />
        </section>
        <script>
            const editor = ace.edit("editor");
            editor.getSession().setMode("ace/mode/html");
            // const HtmlMode = ace.require("ace/mode/html").Mode;
            // editor.session.setMode(new HtmlMode());
            const displayButton = document.querySelector('#displayButton')
            displayButton.disabled = true
            
            var previousElement = null;
            let currentExample = null
            document.querySelectorAll('a[target=displayIframe]').forEach(e => {
                e.onclick = async (e) => {
                    const element = e.target
                    currentExample = e.target.href
                    displayButton.disabled = false
                    const res = await fetch(currentExample)
                    const text = await res.text();
                    editor.setValue(text)
                    element.classList.add('highlighted')
                    if(!!previousElement && previousElement !== element) {
                        previousElement.classList.remove('highlighted')
                    }
                    previousElement = element
                    return true
                }
            })

            displayButton.onclick = () => {
                console.log('currentExample', currentExample)
                window.open(currentExample)
            }
        </script>
    </body>
</html>
`

fs.writeFileSync('../loader/index.html', htmlOutput)

