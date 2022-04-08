import fs from 'fs'

const files = fs.readdirSync('../loader').filter(f => f.endsWith('.html'))

const menuItems = files.filter(f => !f.includes('index')).map(f => {
    return `<li><a href="${f}" target="displayIfrmae" class="hover:bg-gray-100 focus:underline">${f.replace(/.html$/, '')}</a></li>`
}).join('\n')

const htmlOutput = `
<html lang="en">
    <head>
        <title>EMS Plugin Examples</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <style type="text/css">
            iframe html { overflow-x: hidden}
        </style>
    </head>
    <body>
        <section class="min-h-screen xl:container xl:mx-auto">
            <h1 class="text-center text-5xl my-5">Event Management System - Examples</h1>
            <div class="grid grid-cols-12">
                <div class="col-span-3 xl:col-span-2">
                    <ul class="ml-2">
                        ${menuItems}
                    </ul>
                </div>
                <div class="col-span-8 xl:col-span-10 bg-slate-200 overflow-x-hidden">
                    <iframe id="displayIfrmae" name="displayIfrmae" class="w-full h-full"/>
                </div>
            </div>
        </section>
    </body>
</html>
`

fs.writeFileSync('../loader/index.html', htmlOutput)

