/**Demandware uses ISO-2 codes for countries
 * This dictionary is intended to capture ISO-2 codes into ISO-3 codes
 * for Pegasus/Unicorn libraries
 **/
const vDefaultCountry = 'USA';
var countryDict = [];
countryDict.push({ key: "AF", value: "AFG" },
    { key: "AX", value: "ALA" },
    { key: "AL", value: "ALB" },
    { key: "DZ", value: "DZA" },
    { key: "AS", value: "ASM" },
    { key: "AD", value: "AND" },
    { key: "AO", value: "AGO" },
    { key: "AI", value: "AIA" },
    { key: "AQ", value: "ATA" },
    { key: "AG", value: "ATG" },
    { key: "AR", value: "ARG" },
    { key: "AM", value: "ARM" },
    { key: "AW", value: "ABW" },
    { key: "AU", value: "AUS" },
    { key: "AT", value: "AUT" },
    { key: "AZ", value: "AZE" },
    { key: "BS", value: "BHS" },
    { key: "BH", value: "BHR" },
    { key: "BD", value: "BGD" },
    { key: "BB", value: "BRB" },
    { key: "BY", value: "BLR" },
    { key: "BE", value: "BEL" },
    { key: "BZ", value: "BLZ" },
    { key: "BJ", value: "BEN" },
    { key: "BM", value: "BMU" },
    { key: "BT", value: "BTN" },
    { key: "BO", value: "BOL" },
    { key: "BA", value: "BIH" },
    { key: "BW", value: "BWA" },
    { key: "BV", value: "BVT" },
    { key: "BR", value: "BRA" },
    { key: "VG", value: "VGB" },
    { key: "IO", value: "IOT" },
    { key: "BN", value: "BRN" },
    { key: "BG", value: "BGR" },
    { key: "BF", value: "BFA" },
    { key: "BI", value: "BDI" },
    { key: "KH", value: "KHM" },
    { key: "CM", value: "CMR" },
    { key: "CA", value: "CAN" },
    { key: "CV", value: "CPV" },
    { key: "KY", value: "CYM" },
    { key: "CF", value: "CAF" },
    { key: "TD", value: "TCD" },
    { key: "CL", value: "CHL" },
    { key: "CN", value: "CHN" },
    { key: "HK", value: "HKG" },
    { key: "MO", value: "MAC" },
    { key: "CX", value: "CXR" },
    { key: "CC", value: "CCK" },
    { key: "CO", value: "COL" },
    { key: "KM", value: "COM" },
    { key: "CG", value: "COG" },
    { key: "CD", value: "COD" },
    { key: "CK", value: "COK" },
    { key: "CR", value: "CRI" },
    { key: "CI", value: "CIV" },
    { key: "HR", value: "HRV" },
    { key: "CU", value: "CUB" },
    { key: "CY", value: "CYP" },
    { key: "CZ", value: "CZE" },
    { key: "DK", value: "DNK" },
    { key: "DJ", value: "DJI" },
    { key: "DM", value: "DMA" },
    { key: "DO", value: "DOM" },
    { key: "EC", value: "ECU" },
    { key: "EG", value: "EGY" },
    { key: "SV", value: "SLV" },
    { key: "GQ", value: "GNQ" },
    { key: "ER", value: "ERI" },
    { key: "EE", value: "EST" },
    { key: "ET", value: "ETH" },
    { key: "FK", value: "FLK" },
    { key: "FO", value: "FRO" },
    { key: "FJ", value: "FJI" },
    { key: "FI", value: "FIN" },
    { key: "FR", value: "FRA" },
    { key: "GF", value: "GUF" },
    { key: "PF", value: "PYF" },
    { key: "TF", value: "ATF" },
    { key: "GA", value: "GAB" },
    { key: "GM", value: "GMB" },
    { key: "GE", value: "GEO" },
    { key: "DE", value: "DEU" },
    { key: "GH", value: "GHA" },
    { key: "GI", value: "GIB" },
    { key: "GR", value: "GRC" },
    { key: "GL", value: "GRL" },
    { key: "GD", value: "GRD" },
    { key: "GP", value: "GLP" },
    { key: "GU", value: "GUM" },
    { key: "GT", value: "GTM" },
    { key: "GG", value: "GGY" },
    { key: "GN", value: "GIN" },
    { key: "GW", value: "GNB" },
    { key: "GY", value: "GUY" },
    { key: "HT", value: "HTI" },
    { key: "HM", value: "HMD" },
    { key: "VA", value: "VAT" },
    { key: "HN", value: "HND" },
    { key: "HU", value: "HUN" },
    { key: "IS", value: "ISL" },
    { key: "IN", value: "IND" },
    { key: "ID", value: "IDN" },
    { key: "IR", value: "IRN" },
    { key: "IQ", value: "IRQ" },
    { key: "IE", value: "IRL" },
    { key: "IM", value: "IMN" },
    { key: "IL", value: "ISR" },
    { key: "IT", value: "ITA" },
    { key: "JM", value: "JAM" },
    { key: "JP", value: "JPN" },
    { key: "JE", value: "JEY" },
    { key: "JO", value: "JOR" },
    { key: "KZ", value: "KAZ" },
    { key: "KE", value: "KEN" },
    { key: "KI", value: "KIR" },
    { key: "KP", value: "PRK" },
    { key: "KR", value: "KOR" },
    { key: "KW", value: "KWT" },
    { key: "KG", value: "KGZ" },
    { key: "LA", value: "LAO" },
    { key: "LV", value: "LVA" },
    { key: "LB", value: "LBN" },
    { key: "LS", value: "LSO" },
    { key: "LR", value: "LBR" },
    { key: "LY", value: "LBY" },
    { key: "LI", value: "LIE" },
    { key: "LT", value: "LTU" },
    { key: "LU", value: "LUX" },
    { key: "MK", value: "MKD" },
    { key: "MG", value: "MDG" },
    { key: "MW", value: "MWI" },
    { key: "MY", value: "MYS" },
    { key: "MV", value: "MDV" },
    { key: "ML", value: "MLI" },
    { key: "MT", value: "MLT" },
    { key: "MH", value: "MHL" },
    { key: "MQ", value: "MTQ" },
    { key: "MR", value: "MRT" },
    { key: "MU", value: "MUS" },
    { key: "YT", value: "MYT" },
    { key: "MX", value: "MEX" },
    { key: "FM", value: "FSM" },
    { key: "MD", value: "MDA" },
    { key: "MC", value: "MCO" },
    { key: "MN", value: "MNG" },
    { key: "ME", value: "MNE" },
    { key: "MS", value: "MSR" },
    { key: "MA", value: "MAR" },
    { key: "MZ", value: "MOZ" },
    { key: "MM", value: "MMR" },
    { key: "NA", value: "NAM" },
    { key: "NR", value: "NRU" },
    { key: "NP", value: "NPL" },
    { key: "NL", value: "NLD" },
    { key: "AN", value: "ANT" },
    { key: "NC", value: "NCL" },
    { key: "NZ", value: "NZL" },
    { key: "NI", value: "NIC" },
    { key: "NE", value: "NER" },
    { key: "NG", value: "NGA" },
    { key: "NU", value: "NIU" },
    { key: "NF", value: "NFK" },
    { key: "MP", value: "MNP" },
    { key: "NO", value: "NOR" },
    { key: "OM", value: "OMN" },
    { key: "PK", value: "PAK" },
    { key: "PW", value: "PLW" },
    { key: "PS", value: "PSE" },
    { key: "PA", value: "PAN" },
    { key: "PG", value: "PNG" },
    { key: "PY", value: "PRY" },
    { key: "PE", value: "PER" },
    { key: "PH", value: "PHL" },
    { key: "PN", value: "PCN" },
    { key: "PL", value: "POL" },
    { key: "PT", value: "PRT" },
    { key: "PR", value: "PRI" },
    { key: "QA", value: "QAT" },
    { key: "RE", value: "REU" },
    { key: "RO", value: "ROU" },
    { key: "RU", value: "RUS" },
    { key: "RW", value: "RWA" },
    { key: "BL", value: "BLM" },
    { key: "SH", value: "SHN" },
    { key: "KN", value: "KNA" },
    { key: "LC", value: "LCA" },
    { key: "MF", value: "MAF" },
    { key: "PM", value: "SPM" },
    { key: "VC", value: "VCT" },
    { key: "WS", value: "WSM" },
    { key: "SM", value: "SMR" },
    { key: "ST", value: "STP" },
    { key: "SA", value: "SAU" },
    { key: "SN", value: "SEN" },
    { key: "RS", value: "SRB" },
    { key: "SC", value: "SYC" },
    { key: "SL", value: "SLE" },
    { key: "SG", value: "SGP" },
    { key: "SK", value: "SVK" },
    { key: "SI", value: "SVN" },
    { key: "SB", value: "SLB" },
    { key: "SO", value: "SOM" },
    { key: "ZA", value: "ZAF" },
    { key: "GS", value: "SGS" },
    { key: "SS", value: "SSD" },
    { key: "ES", value: "ESP" },
    { key: "LK", value: "LKA" },
    { key: "SD", value: "SDN" },
    { key: "SR", value: "SUR" },
    { key: "SJ", value: "SJM" },
    { key: "SZ", value: "SWZ" },
    { key: "SE", value: "SWE" },
    { key: "CH", value: "CHE" },
    { key: "SY", value: "SYR" },
    { key: "TW", value: "TWN" },
    { key: "TJ", value: "TJK" },
    { key: "TZ", value: "TZA" },
    { key: "TH", value: "THA" },
    { key: "TL", value: "TLS" },
    { key: "TG", value: "TGO" },
    { key: "TK", value: "TKL" },
    { key: "TO", value: "TON" },
    { key: "TT", value: "TTO" },
    { key: "TN", value: "TUN" },
    { key: "TR", value: "TUR" },
    { key: "TM", value: "TKM" },
    { key: "TC", value: "TCA" },
    { key: "TV", value: "TUV" },
    { key: "UG", value: "UGA" },
    { key: "UA", value: "UKR" },
    { key: "AE", value: "ARE" },
    { key: "GB", value: "GBR" },
    { key: "US", value: "USA" },
    { key: "UM", value: "UMI" },
    { key: "UY", value: "URY" },
    { key: "UZ", value: "UZB" },
    { key: "VU", value: "VUT" },
    { key: "VE", value: "VEN" },
    { key: "VN", value: "VNM" },
    { key: "VI", value: "VIR" },
    { key: "WF", value: "WLF" },
    { key: "EH", value: "ESH" },
    { key: "YE", value: "YEM" },
    { key: "ZM", value: "ZMB" },
    { key: "ZW", value: "ZWE" });
function countryAlpha3(vAlphaTwo) { 
    var vAlphaThree;
    for (var i = 0; i < countryDict.length; i++) {
        if (vAlphaTwo.toUpperCase() == countryDict[i].key)
            vAlphaThree = countryDict[i].value;
    }
    return (vAlphaThree) ? vAlphaThree : vDefaultCountry;
}

function reverseCountryAlpha3(vAlphaThree) {
    var vAlphaTwo;
    for (var i = 0; i < countryDict.length; i++) {
        if (vAlphaThree.toUpperCase() == countryDict[i].value)
            vAlphaTwo = countryDict[i].key;
    }
    return (vAlphaTwo) ? vAlphaTwo : vDefaultCountry;
}