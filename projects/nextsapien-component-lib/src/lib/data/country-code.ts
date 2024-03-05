import {Injectable} from '@angular/core';
import {CountryISO} from '../enums/country-iso.enum';

@Injectable()
export class CountryCode {
  public allCountries = [
    ['Afghanistan (‫افغانستان‬‎)', CountryISO.Afghanistan, '93'],
    ['Albania (Shqipëri)', CountryISO.Albania, '355'],
    ['Algeria (‫الجزائر‬‎)', CountryISO.Algeria, '213'],
    ['American Samoa', 'as', '1', 1, ['684']],
    ['Andorra', CountryISO.Andorra, '376'],
    ['Angola', CountryISO.Angola, '244'],
    ['Anguilla', 'ai', '1', 1, ['264']],
    ['Antigua and Barbuda', 'ag', '1', 1, ['268']],
    ['Argentina', CountryISO.Argentina, '54'],
    ['Armenia (Հայաստան)', CountryISO.Armenia, '374'],
    ['Aruba', CountryISO.Aruba, '297'],
    ['Australia', CountryISO.Australia, '61', 0],
    ['Austria (Österreich)', CountryISO.Austria, '43'],
    ['Azerbaijan (Azərbaycan)', CountryISO.Azerbaijan, '994'],
    ['Bahamas', 'bs', '1', 1, ['242']],
    ['Bahrain (‫البحرين‬‎)', CountryISO.Bahrain, '973'],
    ['Bangladesh (বাংলাদেশ)', CountryISO.Bangladesh, '880'],
    ['Barbados', 'bb', '1', 1, ['246']],
    ['Belarus (Беларусь)', CountryISO.Belarus, '375'],
    ['Belgium (België)', CountryISO.Belgium, '32'],
    ['Belize', CountryISO.Belize, '501'],
    ['Benin (Bénin)', CountryISO.Benin, '229'],
    ['Bermuda', 'bm', '1', 1, ['441']],
    ['Bhutan (འབྲུག)', CountryISO.Bhutan, '975'],
    ['Bolivia', CountryISO.Bolivia, '591'],
    ['Bosnia and Herzegovina (Босна и Херцеговина)', CountryISO.BosniaAndHerzegovina, '387'],
    ['Botswana', CountryISO.Botswana, '267'],
    ['Brazil (Brasil)', CountryISO.Brazil, '55'],
    ['British Indian Ocean Territory', CountryISO.BritishIndianOceanTerritory, '246'],
    ['British Virgin Islands', 'vg', '1', 1, ['284']],
    ['Brunei', CountryISO.Brunei, '673'],
    ['Bulgaria (България)', CountryISO.Bulgaria, '359'],
    ['Burkina Faso', CountryISO.BurkinaFaso, '226'],
    ['Burundi (Uburundi)', CountryISO.Burundi, '257'],
    ['Cambodia (កម្ពុជា)', CountryISO.Cambodia, '855'],
    ['Cameroon (Cameroun)', CountryISO.Cameroon, '237'],
    [
      'Canada',
      CountryISO.Canada,
      '1',
      1,
      [
        '204',
        '226',
        '236',
        '249',
        '250',
        '289',
        '306',
        '343',
        '365',
        '387',
        '403',
        '416',
        '418',
        '431',
        '437',
        '438',
        '450',
        '506',
        '514',
        '519',
        '548',
        '579',
        '581',
        '587',
        '604',
        '613',
        '639',
        '647',
        '672',
        '705',
        '709',
        '742',
        '778',
        '780',
        '782',
        '807',
        '819',
        '825',
        '867',
        '873',
        '902',
        '905',
      ],
    ],
    ['Cape Verde (Kabu Verdi)', CountryISO.CapeVerde, '238'],
    ['Caribbean Netherlands', CountryISO.CaribbeanNetherlands, '599', 1],
    ['Cayman Islands', 'ky', '1', 1, ['345']],
    ['Central African Republic (République centrafricaine)', CountryISO.CentralAfricanRepublic, '236'],
    ['Chad (Tchad)', CountryISO.Chad, '235'],
    ['Chile', CountryISO.Chile, '56'],
    ['China (中国)', CountryISO.China, '86'],
    ['Christmas Island', CountryISO.ChristmasIsland, '61', 2],
    ['Cocos (Keeling) Islands', CountryISO.Cocos, '61', 1],
    ['Colombia', CountryISO.Colombia, '57'],
    ['Comoros (‫جزر القمر‬‎)', CountryISO.Comoros, '269'],
    ['Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)', CountryISO.CongoDRCJamhuriYaKidemokrasiaYaKongo, '243'],
    ['Congo (Republic) (Congo-Brazzaville)', CountryISO.CongoRepublicCongoBrazzaville, '242'],
    ['Cook Islands', CountryISO.CookIslands, '682'],
    ['Costa Rica', CountryISO.CostaRica, '506'],
    ['Côte d’Ivoire', CountryISO.CôteDIvoire, '225'],
    ['Croatia (Hrvatska)', CountryISO.Croatia, '385'],
    ['Cuba', CountryISO.Cuba, '53'],
    ['Curaçao', CountryISO.Curaçao, '599', 0],
    ['Cyprus (Κύπρος)', CountryISO.Cyprus, '357'],
    ['Czech Republic (Česká republika)', CountryISO.CzechRepublic, '420'],
    ['Denmark (Danmark)', CountryISO.Denmark, '45'],
    ['Djibouti', CountryISO.Djibouti, '253'],
    ['Dominica', CountryISO.Dominica, '1767'],
    ['Dominican Republic (República Dominicana)', CountryISO.DominicanRepublic, '1', 2, ['809', '829', '849']],
    ['Ecuador', CountryISO.Ecuador, '593'],
    ['Egypt (‫مصر‬‎)', CountryISO.Egypt, '20'],
    ['El Salvador', CountryISO.ElSalvador, '503'],
    ['Equatorial Guinea (Guinea Ecuatorial)', CountryISO.EquatorialGuinea, '240'],
    ['Eritrea', CountryISO.Eritrea, '291'],
    ['Estonia (Eesti)', CountryISO.Estonia, '372'],
    ['Ethiopia', CountryISO.Ethiopia, '251'],
    ['Falkland Islands (Islas Malvinas)', CountryISO.FalklandIslands, '500'],
    ['Faroe Islands (Føroyar)', CountryISO.FaroeIslands, '298'],
    ['Fiji', CountryISO.Fiji, '679'],
    ['Finland (Suomi)', CountryISO.Finland, '358', 0],
    ['France', CountryISO.France, '33'],
    ['French Guiana (Guyane française)', CountryISO.FrenchGuiana, '594'],
    ['French Polynesia (Polynésie française)', CountryISO.FrenchPolynesia, '689'],
    ['Gabon', CountryISO.Gabon, '241'],
    ['Gambia', CountryISO.Gambia, '220'],
    ['Georgia (საქართველო)', CountryISO.Georgia, '995'],
    ['Germany (Deutschland)', CountryISO.Germany, '49'],
    ['Ghana (Gaana)', CountryISO.Ghana, '233'],
    ['Gibraltar', CountryISO.Gibraltar, '350'],
    ['Greece (Ελλάδα)', CountryISO.Greece, '30'],
    ['Greenland (Kalaallit Nunaat)', CountryISO.Greenland, '299'],
    ['Grenada', CountryISO.Grenada, '1473'],
    ['Guadeloupe', CountryISO.Guadeloupe, '590', 0],
    ['Guam', 'gu', '1', 1, ['671']],
    ['Guatemala', CountryISO.Guatemala, '502'],
    ['Guernsey', CountryISO.Guernsey, '44', 1, [1481]],
    ['Guinea (Guinée)', CountryISO.Guinea, '224'],
    ['Guinea-Bissau (Guiné Bissau)', CountryISO.GuineaBissau, '245'],
    ['Guyana', CountryISO.Guyana, '592'],
    ['Haiti', CountryISO.Haiti, '509'],
    ['Honduras', CountryISO.Honduras, '504'],
    ['Hong Kong (香港)', CountryISO.HongKong, '852'],
    ['Hungary (Magyarország)', CountryISO.Hungary, '36'],
    ['Iceland (Ísland)', CountryISO.Iceland, '354'],
    ['India (भारत)', CountryISO.India, '91'],
    ['Indonesia', CountryISO.Indonesia, '62'],
    ['Iran (‫ایران‬‎)', CountryISO.Iran, '98'],
    ['Iraq (‫العراق‬‎)', CountryISO.Iraq, '964'],
    ['Ireland', CountryISO.Ireland, '353'],
    ['Isle of Man', CountryISO.IsleOfMan, '44', 2, [1624]],
    ['Israel (‫ישראל‬‎)', CountryISO.Israel, '972'],
    ['Italy (Italia)', CountryISO.Italy, '39', 0],
    ['Jamaica', 'jm', '1', 1, ['876']],
    ['Japan (日本)', CountryISO.Japan, '81'],
    ['Jersey', CountryISO.Jersey, '44', 3, [1534]],
    ['Jordan (‫الأردن‬‎)', CountryISO.Jordan, '962'],
    ['Kazakhstan (Казахстан)', CountryISO.Kazakhstan, '7', 1],
    ['Kenya', CountryISO.Kenya, '254'],
    ['Kiribati', CountryISO.Kiribati, '686'],
    ['Kosovo', CountryISO.Kosovo, '383'],
    ['Kuwait (‫الكويت‬‎)', CountryISO.Kuwait, '965'],
    ['Kyrgyzstan (Кыргызстан)', CountryISO.Kyrgyzstan, '996'],
    ['Laos (ລາວ)', CountryISO.Laos, '856'],
    ['Latvia (Latvija)', CountryISO.Latvia, '371'],
    ['Lebanon (‫لبنان‬‎)', CountryISO.Lebanon, '961'],
    ['Lesotho', CountryISO.Lesotho, '266'],
    ['Liberia', CountryISO.Liberia, '231'],
    ['Libya (‫ليبيا‬‎)', CountryISO.Libya, '218'],
    ['Liechtenstein', CountryISO.Liechtenstein, '423'],
    ['Lithuania (Lietuva)', CountryISO.Lithuania, '370'],
    ['Luxembourg', CountryISO.Luxembourg, '352'],
    ['Macau (澳門)', CountryISO.Macau, '853'],
    ['Macedonia (FYROM) (Македонија)', CountryISO.Macedonia, '389'],
    ['Madagascar (Madagasikara)', CountryISO.Madagascar, '261'],
    ['Malawi', CountryISO.Malawi, '265'],
    ['Malaysia', CountryISO.Malaysia, '60'],
    ['Maldives', CountryISO.Maldives, '960'],
    ['Mali', CountryISO.Mali, '223'],
    ['Malta', CountryISO.Malta, '356'],
    ['Marshall Islands', CountryISO.MarshallIslands, '692'],
    ['Martinique', CountryISO.Martinique, '596'],
    ['Mauritania (‫موريتانيا‬‎)', CountryISO.Mauritania, '222'],
    ['Mauritius (Moris)', CountryISO.Mauritius, '230'],
    ['Mayotte', CountryISO.Mayotte, '262', 1],
    ['Mexico (México)', CountryISO.Mexico, '52'],
    ['Micronesia', CountryISO.Micronesia, '691'],
    ['Moldova (Republica Moldova)', CountryISO.Moldova, '373'],
    ['Monaco', CountryISO.Monaco, '377'],
    ['Mongolia (Монгол)', CountryISO.Mongolia, '976'],
    ['Montenegro (Crna Gora)', CountryISO.Montenegro, '382'],
    ['Montserrat', 'ms', '1', 1, ['664']],
    ['Morocco (‫المغرب‬‎)', CountryISO.Morocco, '212', 0],
    ['Mozambique (Moçambique)', CountryISO.Mozambique, '258'],
    ['Myanmar (Burma) (မြန်မာ)', CountryISO.Myanmar, '95'],
    ['Namibia (Namibië)', CountryISO.Namibia, '264'],
    ['Nauru', CountryISO.Nauru, '674'],
    ['Nepal (नेपाल)', CountryISO.Nepal, '977'],
    ['Netherlands (Nederland)', CountryISO.Netherlands, '31'],
    ['New Caledonia (Nouvelle-Calédonie)', CountryISO.NewCaledonia, '687'],
    ['New Zealand', CountryISO.NewZealand, '64'],
    ['Nicaragua', CountryISO.Nicaragua, '505'],
    ['Niger (Nijar)', CountryISO.Niger, '227'],
    ['Nigeria', CountryISO.Nigeria, '234'],
    ['Niue', CountryISO.Niue, '683'],
    ['Norfolk Island', CountryISO.NorfolkIsland, '672'],
    ['North Korea (조선 민주주의 인민 공화국)', CountryISO.NorthKorea, '850'],
    ['Northern Mariana Islands', CountryISO.NorthernMarianaIslands, '1670'],
    ['Norway (Norge)', CountryISO.Norway, '47', 0],
    ['Oman (‫عُمان‬‎)', CountryISO.Oman, '968'],
    ['Pakistan (‫پاکستان‬‎)', CountryISO.Pakistan, '92'],
    ['Palau', CountryISO.Palau, '680'],
    ['Palestine (‫فلسطين‬‎)', CountryISO.Palestine, '970'],
    ['Panama (Panamá)', CountryISO.Panama, '507'],
    ['Papua New Guinea', CountryISO.PapuaNewGuinea, '675'],
    ['Paraguay', CountryISO.Paraguay, '595'],
    ['Peru (Perú)', CountryISO.Peru, '51'],
    ['Philippines', CountryISO.Philippines, '63'],
    ['Poland (Polska)', CountryISO.Poland, '48'],
    ['Portugal', CountryISO.Portugal, '351'],
    ['Puerto Rico', CountryISO.PuertoRico, '1', 3, ['787', '939']],
    ['Qatar (‫قطر‬‎)', CountryISO.Qatar, '974'],
    ['Réunion (La Réunion)', CountryISO.Réunion, '262', 0],
    ['Romania (România)', CountryISO.Romania, '40'],
    ['Russia (Россия)', CountryISO.Russia, '7', 0],
    ['Rwanda', CountryISO.Rwanda, '250'],
    ['Saint Barthélemy (Saint-Barthélemy)', CountryISO.SaintBarthélemy, '590', 1],
    ['Saint Helena', CountryISO.SaintHelena, '290'],
    ['Saint Kitts and Nevis', CountryISO.SaintKittsAndNevis, '1869'],
    ['Saint Lucia', 'lc', '1', 1, ['758']],
    ['Saint Martin (Saint-Martin (partie française))', CountryISO.SaintMartin, '590', 2],
    ['Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)', CountryISO.SaintPierreAndMiquelon, '508'],
    ['Saint Vincent and the Grenadines', 'vc', '1', 1, ['784']],
    ['Samoa', CountryISO.Samoa, '685'],
    ['San Marino', CountryISO.SanMarino, '378'],
    ['São Tomé and Príncipe (São Tomé e Príncipe)', CountryISO.SãoToméAndPríncipe, '239'],
    ['Saudi Arabia (‫المملكة العربية السعودية‬‎)', CountryISO.SaudiArabia, '966'],
    ['Senegal (Sénégal)', CountryISO.Senegal, '221'],
    ['Serbia (Србија)', CountryISO.Serbia, '381'],
    ['Seychelles', CountryISO.Seychelles, '248'],
    ['Sierra Leone', CountryISO.SierraLeone, '232'],
    ['Singapore', CountryISO.Singapore, '65'],
    ['Sint Maarten', 'sx', '1', 1, ['721']],
    ['Slovakia (Slovensko)', CountryISO.Slovakia, '421'],
    ['Slovenia (Slovenija)', CountryISO.Slovenia, '386'],
    ['Solomon Islands', CountryISO.SolomonIslands, '677'],
    ['Somalia (Soomaaliya)', CountryISO.Somalia, '252'],
    ['South Africa', CountryISO.SouthAfrica, '27'],
    ['South Korea (대한민국)', CountryISO.SouthKorea, '82'],
    ['South Sudan (‫جنوب السودان‬‎)', CountryISO.SouthSudan, '211'],
    ['Spain (España)', CountryISO.Spain, '34'],
    ['Sri Lanka (ශ්‍රී ලංකාව)', CountryISO.SriLanka, '94'],
    ['Sudan (‫السودان‬‎)', CountryISO.Sudan, '249'],
    ['Suriname', CountryISO.Suriname, '597'],
    ['Svalbard and Jan Mayen', CountryISO.SvalbardAndJanMayen, '47', 1],
    ['Swaziland', CountryISO.Swaziland, '268'],
    ['Sweden (Sverige)', CountryISO.Sweden, '46'],
    ['Switzerland (Schweiz)', CountryISO.Switzerland, '41'],
    ['Syria (‫سوريا‬‎)', CountryISO.Syria, '963'],
    ['Taiwan (台灣)', CountryISO.Taiwan, '886'],
    ['Tajikistan', CountryISO.Tajikistan, '992'],
    ['Tanzania', CountryISO.Tanzania, '255'],
    ['Thailand (ไทย)', CountryISO.Thailand, '66'],
    ['Timor-Leste', CountryISO.TimorLeste, '670'],
    ['Togo', CountryISO.Togo, '228'],
    ['Tokelau', CountryISO.Tokelau, '690'],
    ['Tonga', CountryISO.Tonga, '676'],
    ['Trinidad and Tobago', 'tt', '1', 1, ['868']],
    ['Tunisia (‫تونس‬‎)', CountryISO.Tunisia, '216'],
    ['Turkey (Türkiye)', CountryISO.Turkey, '90'],
    ['Turkmenistan', CountryISO.Turkmenistan, '993'],
    ['Turks and Caicos Islands', CountryISO.TurksAndCaicosIslands, '1649'],
    ['Tuvalu', CountryISO.Tuvalu, '688'],
    ['U.S. Virgin Islands', 'vi', '1', 1, ['340']],
    ['Uganda', CountryISO.Uganda, '256'],
    ['Ukraine (Україна)', CountryISO.Ukraine, '380'],
    ['United Arab Emirates (‫الإمارات العربية المتحدة‬‎)', CountryISO.UnitedArabEmirates, '971'],
    ['United Kingdom', CountryISO.UnitedKingdom, '44', 0],
    ['United States', CountryISO.UnitedStates, '1', 0],
    ['Uruguay', CountryISO.Uruguay, '598'],
    ['Uzbekistan (Oʻzbekiston)', CountryISO.Uzbekistan, '998'],
    ['Vanuatu', CountryISO.Vanuatu, '678'],
    ['Vatican City (Città del Vaticano)', CountryISO.VaticanCity, '39', 1],
    ['Venezuela', CountryISO.Venezuela, '58'],
    ['Vietnam (Việt Nam)', CountryISO.Vietnam, '84'],
    ['Wallis and Futuna', CountryISO.WallisAndFutuna, '681'],
    ['Western Sahara (‫الصحراء الغربية‬‎)', CountryISO.WesternSahara, '212', 1],
    ['Yemen (‫اليمن‬‎)', CountryISO.Yemen, '967'],
    ['Zambia', CountryISO.Zambia, '260'],
    ['Zimbabwe', CountryISO.Zimbabwe, '263'],
    ['Åland Islands', CountryISO.ÅlandIslands, '358', 1],
  ];
  public phoneMasks = [
    {
      ISOCode: "AD",
      InputMasking: "000 000",
      CountryPhoneCode: "+376 "
    },
    {
      ISOCode: "AE",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+971"
    },
    {
      ISOCode: "AF",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+93"
    },
    {
      ISOCode: "AG",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (268)"
    },
    {
      ISOCode: "AI",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (264)"
    },
    {
      ISOCode: "AL",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+355"
    },
    {
      ISOCode: "AM",
      InputMasking: "000 000000",
      CountryPhoneCode: "+374"
    },
    {
      ISOCode: "AN",
      InputMasking: "000 0000",
      CountryPhoneCode: "+599"
    },
    {
      ISOCode: "AO",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+244"
    },
    {
      ISOCode: "AQ",
      InputMasking: "0 00000",
      CountryPhoneCode: "+672"
    },
    {
      ISOCode: "AR",
      InputMasking: "000 00-0000-0000",
      CountryPhoneCode: "+54"
    },
    {
      ISOCode: "AS",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (684)"
    },
    {
      ISOCode: "AT",
      InputMasking: "0000 000000",
      CountryPhoneCode: "+43"
    },
    {
      ISOCode: "AU",
      InputMasking: "0000 000 000",
      CountryPhoneCode: "+61"
    },
    {
      ISOCode: "AW",
      InputMasking: "000 0000",
      CountryPhoneCode: "+297"
    },
    {
      ISOCode: "AZ",
      InputMasking: "000 000 00 00",
      CountryPhoneCode: "+994"
    },
    {
      ISOCode: "BA",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+387"
    },
    {
      ISOCode: "BB",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (246)"
    },
    {
      ISOCode: "BD",
      InputMasking: "00000-000000",
      CountryPhoneCode: "+880"
    },
    {
      ISOCode: "BE",
      InputMasking: "0000 00 00 00",
      CountryPhoneCode: "+32"
    },
    {
      ISOCode: "BF",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+226"
    },
    {
      ISOCode: "BG",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+359"
    },
    {
      ISOCode: "BH",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+973"
    },
    {
      ISOCode: "BI",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+257"
    },
    {
      ISOCode: "BJ",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+229"
    },
    {
      ISOCode: "BL",
      InputMasking: "0000 00 00 00",
      CountryPhoneCode: "+590"
    },
    {
      ISOCode: "BM",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (441)"
    },
    {
      ISOCode: "BN",
      InputMasking: "000 0000",
      CountryPhoneCode: "+673"
    },
    {
      ISOCode: "BO",
      InputMasking: "00000000",
      CountryPhoneCode: "+591"
    },
    {
      ISOCode: "BR",
      InputMasking: "(00) 00000-0000",
      CountryPhoneCode: "+55"
    },
    {
      ISOCode: "BS",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (242)"
    },
    {
      ISOCode: "BT",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+975"
    },
    {
      ISOCode: "BW",
      InputMasking: "00 000 000",
      CountryPhoneCode: "+267"
    },
    {
      ISOCode: "BY",
      InputMasking: "0 000 000-00-00",
      CountryPhoneCode: "+375"
    },
    {
      ISOCode: "BZ",
      InputMasking: "000-0000",
      CountryPhoneCode: "+501"
    },
    {
      ISOCode: "CA",
      InputMasking: "(000) 000-0000",
      CountryPhoneCode: "+1"
    },
    {
      ISOCode: "CC",
      InputMasking: "0000 000 000",
      CountryPhoneCode: "+61"
    },
    {
      ISOCode: "CD",
      InputMasking: "0000 000 000",
      CountryPhoneCode: "+243"
    },
    {
      ISOCode: "CF",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+236"
    },
    {
      ISOCode: "CG",
      InputMasking: " 00 000 0000",
      CountryPhoneCode: "+242"
    },
    {
      ISOCode: "CH",
      InputMasking: "000 000 00 00",
      CountryPhoneCode: "+41"
    },
    {
      ISOCode: "CI",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+225"
    },
    {
      ISOCode: "CK",
      InputMasking: "00 0000",
      CountryPhoneCode: "+682"
    },
    {
      ISOCode: "CL",
      InputMasking: "0 0000 0000",
      CountryPhoneCode: "+56"
    },
    {
      ISOCode: "CM",
      InputMasking: "0 00 00 00 00",
      CountryPhoneCode: "+237"
    },
    {
      ISOCode: "CN",
      InputMasking: "000 0000 0000",
      CountryPhoneCode: "+86"
    },
    {
      ISOCode: "CO",
      InputMasking: "000 0000000",
      CountryPhoneCode: "+57"
    },
    {
      ISOCode: "CR",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+506"
    },
    {
      ISOCode: "CU",
      InputMasking: "00 0000000",
      CountryPhoneCode: "+53"
    },
    {
      ISOCode: "CV",
      InputMasking: "000 00 00",
      CountryPhoneCode: "+238"
    },
    {
      ISOCode: "CW",
      InputMasking: "000 0000",
      CountryPhoneCode: "+599"
    },
    {
      ISOCode: "CX",
      InputMasking: "0000 000 000",
      CountryPhoneCode: "+61"
    },
    {
      ISOCode: "CY",
      InputMasking: "00 000000",
      CountryPhoneCode: "+357"
    },
    {
      ISOCode: "CZ",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+420"
    },
    {
      ISOCode: "DE",
      InputMasking: "00000 0000000",
      CountryPhoneCode: "+49"
    },
    {
      ISOCode: "DJ",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+253"
    },
    {
      ISOCode: "DK",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+45"
    },
    {
      ISOCode: "DM",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (767)"
    },
    {
      ISOCode: "DO",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (809)"
    },
    {
      ISOCode: "DZ",
      InputMasking: "0000 00 00 00",
      CountryPhoneCode: "+213"
    },
    {
      ISOCode: "EC",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+593"
    },
    {
      ISOCode: "EE",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+372"
    },
    {
      ISOCode: "EG",
      InputMasking: "0000 000 0000",
      CountryPhoneCode: "+20"
    },
    {
      ISOCode: "EH",
      InputMasking: "0000-000000",
      CountryPhoneCode: "+212"
    },
    {
      ISOCode: "ER",
      InputMasking: "00 000 000",
      CountryPhoneCode: "+291"
    },
    {
      ISOCode: "ES",
      InputMasking: "000 00 00 00",
      CountryPhoneCode: "+34"
    },
    {
      ISOCode: "ET",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+251"
    },
    {
      ISOCode: "FI",
      InputMasking: "000 0000000",
      CountryPhoneCode: "+358"
    },
    {
      ISOCode: "FJ",
      InputMasking: "000 0000",
      CountryPhoneCode: "+679"
    },
    {
      ISOCode: "FK",
      InputMasking: "00000",
      CountryPhoneCode: "+500"
    },
    {
      ISOCode: "FM",
      InputMasking: "000 0000",
      CountryPhoneCode: "+691"
    },
    {
      ISOCode: "FO",
      InputMasking: "000000",
      CountryPhoneCode: "+298"
    },
    {
      ISOCode: "FR",
      InputMasking: "00 00 00 00 00",
      CountryPhoneCode: "+33"
    },
    {
      ISOCode: "GA",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+241"
    },
    {
      ISOCode: "GB",
      InputMasking: "00000 00000",
      CountryPhoneCode: "+44"
    },
    {
      ISOCode: "GD",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (473)"
    },
    {
      ISOCode: "GE",
      InputMasking: "000 00 00 00",
      CountryPhoneCode: "+995"
    },
    {
      ISOCode: "GG",
      InputMasking: "00000 000000",
      CountryPhoneCode: "+44"
    },
    {
      ISOCode: "GH",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+233"
    },
    {
      ISOCode: "GI",
      InputMasking: "00000000",
      CountryPhoneCode: "+350"
    },
    {
      ISOCode: "GL",
      InputMasking: "00 00 00",
      CountryPhoneCode: "+299"
    },
    {
      ISOCode: "GM",
      InputMasking: "000 0000",
      CountryPhoneCode: "+220"
    },
    {
      ISOCode: "GN",
      InputMasking: "000 00 00 00",
      CountryPhoneCode: "+224"
    },
    {
      ISOCode: "GQ",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+240"
    },
    {
      ISOCode: "GR",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+30"
    },
    {
      ISOCode: "GT",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+502"
    },
    {
      ISOCode: "GU",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (671)"
    },
    {
      ISOCode: "GW",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+245"
    },
    {
      ISOCode: "GY",
      InputMasking: "000 0000",
      CountryPhoneCode: "+592"
    },
    {
      ISOCode: "HK",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+852"
    },
    {
      ISOCode: "HN",
      InputMasking: "0000-0000",
      CountryPhoneCode: "+504"
    },
    {
      ISOCode: "HR",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+385"
    },
    {
      ISOCode: "HT",
      InputMasking: "00 00 0000",
      CountryPhoneCode: "+509"
    },
    {
      ISOCode: "HU",
      InputMasking: "(00) 000 0000",
      CountryPhoneCode: "+36"
    },
    {
      ISOCode: "ID",
      InputMasking: "0000-000-000",
      CountryPhoneCode: "+62"
    },
    {
      ISOCode: "IE",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+353"
    },
    {
      ISOCode: "IL",
      InputMasking: "000-000-0000",
      CountryPhoneCode: "+972"
    },
    {
      ISOCode: "IM",
      InputMasking: "00000 000000",
      CountryPhoneCode: "+44"
    },
    {
      ISOCode: "IN",
      InputMasking: "00000 00000",
      CountryPhoneCode: "+91"
    },
    {
      ISOCode: "IO",
      InputMasking: "000 0000",
      CountryPhoneCode: "+246"
    },
    {
      ISOCode: "IQ",
      InputMasking: "0000 000 0000",
      CountryPhoneCode: "+964"
    },
    {
      ISOCode: "IR",
      InputMasking: "0000 000 0000",
      CountryPhoneCode: "+98"
    },
    {
      ISOCode: "IS",
      InputMasking: "000 0000",
      CountryPhoneCode: "+354"
    },
    {
      ISOCode: "IT",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+39"
    },
    {
      ISOCode: "JE",
      InputMasking: "00000 000000",
      CountryPhoneCode: "+44"
    },
    {
      ISOCode: "JM",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (876)"
    },
    {
      ISOCode: "JO",
      InputMasking: "00 0000 0000",
      CountryPhoneCode: "+962"
    },
    {
      ISOCode: "JP",
      InputMasking: "000 0000-0000",
      CountryPhoneCode: "+81"
    },
    {
      ISOCode: "KE",
      InputMasking: "0000 000000",
      CountryPhoneCode: "+254"
    },
    {
      ISOCode: "KG",
      InputMasking: "0000 000 000",
      CountryPhoneCode: "+996"
    },
    {
      ISOCode: "KH",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+855"
    },
    {
      ISOCode: "KI",
      InputMasking: "00000000",
      CountryPhoneCode: "+686"
    },
    {
      ISOCode: "KM",
      InputMasking: "000 00 00",
      CountryPhoneCode: "+269"
    },
    {
      ISOCode: "KN",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (869)"
    },
    {
      ISOCode: "KP",
      InputMasking: "0000 000 0000",
      CountryPhoneCode: "+850"
    },
    {
      ISOCode: "KR",
      InputMasking: "000-0000-0000",
      CountryPhoneCode: "+82"
    },
    {
      ISOCode: "KW",
      InputMasking: "000 00000",
      CountryPhoneCode: "+965"
    },
    {
      ISOCode: "KY",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (345)"
    },
    {
      ISOCode: "KZ",
      InputMasking: "0 (000) 000 0000",
      CountryPhoneCode: "+7"
    },
    {
      ISOCode: "LA",
      InputMasking: "000 00 000 000",
      CountryPhoneCode: "+856"
    },
    {
      ISOCode: "LB",
      InputMasking: "00 000 000",
      CountryPhoneCode: "+961"
    },
    {
      ISOCode: "LC",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (758)"
    },
    {
      ISOCode: "LI",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+423"
    },
    {
      ISOCode: "LK",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+94"
    },
    {
      ISOCode: "LR",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+231"
    },
    {
      ISOCode: "LS",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+266"
    },
    {
      ISOCode: "LT",
      InputMasking: "(0-000) 00000",
      CountryPhoneCode: "+370"
    },
    {
      ISOCode: "LU",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+352"
    },
    {
      ISOCode: "LV",
      InputMasking: "00 000 000",
      CountryPhoneCode: "+371"
    },
    {
      ISOCode: "LY",
      InputMasking: "000-0000000",
      CountryPhoneCode: "+218"
    },
    {
      ISOCode: "MA",
      InputMasking: "0000-000000",
      CountryPhoneCode: "+212"
    },
    {
      ISOCode: "MC",
      InputMasking: "00 00 00 00 00",
      CountryPhoneCode: "+377"
    },
    {
      ISOCode: "MD",
      InputMasking: "0000 00 000",
      CountryPhoneCode: "+373"
    },
    {
      ISOCode: "ME",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+382"
    },
    {
      ISOCode: "MF",
      InputMasking: "0000 00 00 00",
      CountryPhoneCode: "+590"
    },
    {
      ISOCode: "MG",
      InputMasking: "000 00 000 00",
      CountryPhoneCode: "+261"
    },
    {
      ISOCode: "MH",
      InputMasking: "000-0000",
      CountryPhoneCode: "+692"
    },
    {
      ISOCode: "MK",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+389"
    },
    {
      ISOCode: "ML",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+223"
    },
    {
      ISOCode: "MM",
      InputMasking: "00 000 0000",
      CountryPhoneCode: "+95"
    },
    {
      ISOCode: "MN",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+976"
    },
    {
      ISOCode: "MO",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+853"
    },
    {
      ISOCode: "MP",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (670)"
    },
    {
      ISOCode: "MR",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+222"
    },
    {
      ISOCode: "MS",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (664)"
    },
    {
      ISOCode: "MT",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+356"
    },
    {
      ISOCode: "MU",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+230"
    },
    {
      ISOCode: "MV",
      InputMasking: "000-0000",
      CountryPhoneCode: "+960"
    },
    {
      ISOCode: "MW",
      InputMasking: "0000 00 00 00",
      CountryPhoneCode: "+265"
    },
    {
      ISOCode: "MX",
      InputMasking: "000 000 000 0000",
      CountryPhoneCode: "+52"
    },
    {
      ISOCode: "MY",
      InputMasking: "000-000 0000",
      CountryPhoneCode: "+60"
    },
    {
      ISOCode: "MZ",
      InputMasking: "00 000 0000",
      CountryPhoneCode: "+258"
    },
    {
      ISOCode: "NA",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+264"
    },
    {
      ISOCode: "NC",
      InputMasking: "00 00 00",
      CountryPhoneCode: "+687"
    },
    {
      ISOCode: "NE",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+227"
    },
    {
      ISOCode: "NG",
      InputMasking: "0000 000 0000",
      CountryPhoneCode: "+234"
    },
    {
      ISOCode: "NI",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+505"
    },
    {
      ISOCode: "NL",
      InputMasking: "00 00000000",
      CountryPhoneCode: "+31"
    },
    {
      ISOCode: "NO",
      InputMasking: "000 00 000",
      CountryPhoneCode: "+47"
    },
    {
      ISOCode: "NP",
      InputMasking: "000-0000000",
      CountryPhoneCode: "+977"
    },
    {
      ISOCode: "NR",
      InputMasking: "000 0000",
      CountryPhoneCode: "+674"
    },
    {
      ISOCode: "NU",
      InputMasking: "000 0000",
      CountryPhoneCode: "+683"
    },
    {
      ISOCode: "NZ",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+64"
    },
    {
      ISOCode: "OM",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+968"
    },
    {
      ISOCode: "PA",
      InputMasking: "0000-0000",
      CountryPhoneCode: "+507"
    },
    {
      ISOCode: "PE",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+51"
    },
    {
      ISOCode: "PF",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+689"
    },
    {
      ISOCode: "PG",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+675"
    },
    {
      ISOCode: "PH",
      InputMasking: "0000 000 0000",
      CountryPhoneCode: "+63"
    },
    {
      ISOCode: "PK",
      InputMasking: "0000 0000000",
      CountryPhoneCode: "+92"
    },
    {
      ISOCode: "PL",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+48"
    },
    {
      ISOCode: "PM",
      InputMasking: "000 00 00",
      CountryPhoneCode: "+508"
    },
    {
      ISOCode: "PN",
      InputMasking: "00 000000",
      CountryPhoneCode: "+64"
    },
    {
      ISOCode: "PR",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (787)"
    },
    {
      ISOCode: "PS",
      InputMasking: "0000 000 000",
      CountryPhoneCode: "+970"
    },
    {
      ISOCode: "PT",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+351"
    },
    {
      ISOCode: "PW",
      InputMasking: "000 0000",
      CountryPhoneCode: "+680"
    },
    {
      ISOCode: "PY",
      InputMasking: "0000 000000",
      CountryPhoneCode: "+595"
    },
    {
      ISOCode: "QA",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+974"
    },
    {
      ISOCode: "RE",
      InputMasking: "0000 00 00 00",
      CountryPhoneCode: "+262"
    },
    {
      ISOCode: "RO",
      InputMasking: "0000 000 000",
      CountryPhoneCode: "+40"
    },
    {
      ISOCode: "RS",
      InputMasking: "000 0000000",
      CountryPhoneCode: "+381"
    },
    {
      ISOCode: "RU",
      InputMasking: "0 (000) 000-00-00",
      CountryPhoneCode: "+7"
    },
    {
      ISOCode: "RW",
      InputMasking: "0000 000 000",
      CountryPhoneCode: "+250"
    },
    {
      ISOCode: "SA",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+966"
    },
    {
      ISOCode: "SB",
      InputMasking: "00 00000",
      CountryPhoneCode: "+677"
    },
    {
      ISOCode: "SC",
      InputMasking: "0 000 000",
      CountryPhoneCode: "+248"
    },
    {
      ISOCode: "SD",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+249"
    },
    {
      ISOCode: "SE",
      InputMasking: "000-000 00 00",
      CountryPhoneCode: "+46"
    },
    {
      ISOCode: "SG",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+65"
    },
    {
      ISOCode: "SH",
      InputMasking: "00000",
      CountryPhoneCode: "+290"
    },
    {
      ISOCode: "SI",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+386"
    },
    {
      ISOCode: "SJ",
      InputMasking: "000 00 000",
      CountryPhoneCode: "+47"
    },
    {
      ISOCode: "SK",
      InputMasking: "0000 000 000",
      CountryPhoneCode: "+421"
    },
    {
      ISOCode: "SL",
      InputMasking: "(000) 000000",
      CountryPhoneCode: "+232"
    },
    {
      ISOCode: "SM",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+378"
    },
    {
      ISOCode: "SN",
      InputMasking: "00 000 00 00",
      CountryPhoneCode: "+221"
    },
    {
      ISOCode: "SO",
      InputMasking: "0 0000000",
      CountryPhoneCode: "+252"
    },
    {
      ISOCode: "SR",
      InputMasking: "000-0000",
      CountryPhoneCode: "+597"
    },
    {
      ISOCode: "SS",
      InputMasking: "0000 000 000",
      CountryPhoneCode: "+211"
    },
    {
      ISOCode: "ST",
      InputMasking: "000 0000",
      CountryPhoneCode: "+239"
    },
    {
      ISOCode: "SV",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+503"
    },
    {
      ISOCode: "SX",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (721)"
    },
    {
      ISOCode: "SY",
      InputMasking: "0000 000 000",
      CountryPhoneCode: "+963"
    },
    {
      ISOCode: "SZ",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+268"
    },
    {
      ISOCode: "TC",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (649)"
    },
    {
      ISOCode: "TD",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+235"
    },
    {
      ISOCode: "TG",
      InputMasking: "00 00 00 00",
      CountryPhoneCode: "+228"
    },
    {
      ISOCode: "TH",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+66"
    },
    {
      ISOCode: "TJ",
      InputMasking: "000 00 0000",
      CountryPhoneCode: "+992"
    },
    {
      ISOCode: "TK",
      InputMasking: "0000",
      CountryPhoneCode: "+690"
    },
    {
      ISOCode: "TL",
      InputMasking: "0000 0000",
      CountryPhoneCode: "+670"
    },
    {
      ISOCode: "TM",
      InputMasking: "0 00 000000",
      CountryPhoneCode: "+993"
    },
    {
      ISOCode: "TN",
      InputMasking: "00 000 000",
      CountryPhoneCode: "+216"
    },
    {
      ISOCode: "TO",
      InputMasking: "000 0000",
      CountryPhoneCode: "+676"
    },
    {
      ISOCode: "TR",
      InputMasking: "0000 000 00 00",
      CountryPhoneCode: "+90"
    },
    {
      ISOCode: "TT",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (868)"
    },
    {
      ISOCode: "TV",
      InputMasking: "000000",
      CountryPhoneCode: "+688"
    },
    {
      ISOCode: "TW",
      InputMasking: "0000 000 000",
      CountryPhoneCode: "+886"
    },
    {
      ISOCode: "TZ",
      InputMasking: "0000 000 000",
      CountryPhoneCode: "+255"
    },
    {
      ISOCode: "UA",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+380"
    },
    {
      ISOCode: "UG",
      InputMasking: "0000 000000",
      CountryPhoneCode: "+256"
    },
    {
      ISOCode: "US",
      InputMasking: "000 000-0000",
      CountryPhoneCode: "+1"
    },
    {
      ISOCode: "UY",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+598"
    },
    {
      ISOCode: "UZ",
      InputMasking: "0 00 000 00 00",
      CountryPhoneCode: "+998"
    },
    {
      ISOCode: "VA",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+39"
    },
    {
      ISOCode: "VC",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (784)"
    },
    {
      ISOCode: "VE",
      InputMasking: "0000-0000000",
      CountryPhoneCode: "+58"
    },
    {
      ISOCode: "VG",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (284)"
    },
    {
      ISOCode: "VI",
      InputMasking: "000-0000",
      CountryPhoneCode: "+1 (340)"
    },
    {
      ISOCode: "VN",
      InputMasking: "000 000 00 00",
      CountryPhoneCode: "+84"
    },
    {
      ISOCode: "VU",
      InputMasking: "000 0000",
      CountryPhoneCode: "+678"
    },
    {
      ISOCode: "WF",
      InputMasking: "00 00 00",
      CountryPhoneCode: "+681"
    },
    {
      ISOCode: "WS",
      InputMasking: "00 00000",
      CountryPhoneCode: "+685"
    },
    {
      ISOCode: "XK",
      InputMasking: "000 000 000",
      CountryPhoneCode: "+383"
    },
    {
      ISOCode: "YE",
      InputMasking: "0000 000 000",
      CountryPhoneCode: "+967"
    },
    {
      ISOCode: "YT",
      InputMasking: "0000 00 00 00",
      CountryPhoneCode: "+262"
    },
    {
      ISOCode: "ZA",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+27"
    },
    {
      ISOCode: "ZM",
      InputMasking: "000 0000000",
      CountryPhoneCode: "+260"
    },
    {
      ISOCode: "ZW",
      InputMasking: "000 000 0000",
      CountryPhoneCode: "+263"
    }
  ];

  getPhoneMask(countryCode: string): string {
    return this.phoneMasks.find(i => i.CountryPhoneCode === countryCode)?.InputMasking ?? '';
  }
}
