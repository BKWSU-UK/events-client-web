insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Aberdeen Events', '', 125, 12, 159);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 159;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Bath Events', '', 127, 12, 398);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 398;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Birmingham Events', '', 123, 12, 160);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 160;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Bournemouth Events', '', 131, 12, 350);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 350;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Brighton Events', '', 135, 12, 161);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 161;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Bristol Events', '', 137, 12, 822);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 822;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Cardiff Events', '', 143, 12, 195);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 195;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Clapham Events', '', 149, 12, 309);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 309;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Colchester Events', '', 151, 12, 192);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 192;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Coventry Events', '', 155, 12, 178);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 178;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Crawley Events', '', 157, 12, 771);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 771;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Dundee Events', '', 159, 12, 183);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 183;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Eastbourne Events', '', 161, 12, 770);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 770;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Edinburgh Events', '', 163, 12, 158);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 158;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Enfield Events', '', 165, 12, 773);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 773;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Finchley Events', '', 167, 12, 406);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 406;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Global Retreat Centre Events (Oxford)', '', 171, 12, 5);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 5;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Harrow Events', '', 173, 12, 626);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 626;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Hounslow Events', '', 175, 12, 204);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 204;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Ilford Events', '', 177, 12, 211);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 211;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Isle of Man Events', '', 179, 12, 626);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 626;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Kensington Events', '', 181, 12, 197);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 197;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Kingston Events', '', 183, 12, 636);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 636;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Leeds Events', '', 185, 12, 154);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 154;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Leicester Events', '', 187, 12, 200);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 200;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Loughborough Events', '', 189, 12, 212);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 212;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Luton Events', '', 191, 12, 2895);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 2895;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Manchester Events', '', 193, 12, 176);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 176;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Newcastle Events', '', 195, 12, 185);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 185;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Newport Events', '', 197, 12, 491);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 491;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Nottingham Events', '', 199, 12, 186);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 186;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Peterborough Events', '', 203, 12, 201);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 201;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Sheffield Events', '', 207, 12, 139);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 139;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Slough - Langley Events', '', 209, 12, 807);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 807;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Slough Events', '', 211, 12, 187);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 187;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Southall Events', '', 213, 12, 202);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 202;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Stanmore Events', '', 215, 12, 347);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 347;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Sutton Coldfield Events', '', 217, 12, 163);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 163;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Swansea Events', '', 219, 12, 621);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 621;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Tunbridge Wells Events', '', 221, 12, 772);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 772;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Upton Park Events', '', 223, 12, 709);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 709;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Watford Events', '', 225, 12, 345);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 345;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Wellingborough Events', '', 227, 12, 191);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 191;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'West Bromwich Events', '', 231, 12, 190);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 190;
insert into tb_newsletter_configuration(id, name, list_id, form_id, type_fk, organisation_fk)
values((select max(id) + 1 from tb_newsletter_configuration), 'Worthing Lighthouse Events', '', 233, 12, 2824);
update tb_organisation set newsletter_configuration_fk = (select max(id) from tb_newsletter_configuration) where id = 2824;