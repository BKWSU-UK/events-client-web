const readline = require('readline');
const fs = require("fs");

const readInterface = readline.createInterface({
    input: fs.createReadStream('active_campaign_data.txt'),
    output: process.stdout,
    console: false
});

readInterface.on('line', function (line) {
    const splits = line.split('\t');
    const orgName = splits[0];
    const link = splits[2];
    const orgId = splits[4];
    if (orgName.indexOf('Events') > -1 && link && orgId) {
        const formId = link.replace(/.+\/(\d+)/, "$1");
        const newsletterInsert = `insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk) 
                    values((select max(id) + 1 from tb_newsletter_configuration), '${orgName}', '', ${formId}, 12, ${orgId});`;
        console.log(newsletterInsert);
        const organisationUpdate = `update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = ${orgId};`;
        console.log(organisationUpdate);
    }
});