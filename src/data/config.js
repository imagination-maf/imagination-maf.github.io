export default {
    'mode': 'staging',
    'url': {
        'staging': 'https://staging.imagination-maf.com/api/',
        'live': ''
    },
    'server': {
        'DEV_address': '10.100.196.157',
        'address': '10.83.40.111',
        'browserSyncPort': 11100,
        'DEV_httpPort': 8888,
        'httpPort': 8080,
        'wsPort': 11099,
        'wsNS': 'MAF_PORTFOLIO'
    },
    'galleryUrl': 'https://s3-eu-west-1.amazonaws.com/maf-gallery-images/',
    'localUrl': '/gallery/',
    'masterplan-inactive': [],
    'mappings': {
        'app_x5F_Sharjah-road--parent': 'alzahia',
        'app_x5F_Muscat-road--parent': 'almouj',
        'app_x5F_Lebanon-road--parent': 'waterfront',
        'app_x5F_Dubai-road--parent': 'tilalalghaf'
    },
    markerDefault: [
        {
            'id': 'app_x5F_world--parent',
            'marker': null
        },
        {
            'id': 'app_x5F_UAE--parent',
            'marker': 'uae'
        },
        {
            'id': 'app_x5F_Oman--parent',
            'marker': 'oman'
        },
        {
            'id': 'app_x5F_Lebanon-region--parent',
            'marker': 'lebanon'
        }
    ],
    availablityMap: {
        'available': ['Available'],
        'unavailable': ['Sold', 'Sale pending', 'Unavailable', 'Booked', 'Reserved', 'Unassigned']
    },
    logoMapping: {
        'app_x5F_world--parent': 'maf',
        'app_x5F_UAE--parent': 'maf',
        'app_x5F_Sharjah--parent': 'alzahia',
        'app_x5F_Sharjah-road--parent': 'alzahia',
        'app_x5F_Dubai--parent': 'tilalalghaf',
        'app_x5F_Dubai-road--parent': 'tilalalghaf',
        'app_x5F_Lebanon-region--parent': 'waterfront',
        'app_x5F_Lebanon--parent': 'waterfront',
        'app_x5F_Lebanon-road--parent': 'waterfront',
        'app_x5F_Oman--parent': 'almouj',
        'app_x5F_Muscat--parent': 'almouj',
        'app_x5F_Muscat-road--parent': 'almouj',
    },
    houseTypes: {
        'villa': ['Boutique villa', 'Villa Plus', 'Villa', 'villa', 'Courtyard'],
        'townhouse': ['Town house Plus', 'Town house'],
        'apartment': ['Apartments', 'Apartment'],
        'office': ['Offices']
    },
    houseTypeNames: {
        'apartmentStudio': 'Apartment Studio',
        'apartment1': '1-Bedroom Apartment',
        'apartment2': '2-Bedroom Apartment',
        'apartment3': '3-Bedroom Apartment',
        'apartment4': '4-Bedroom Apartment',
        'apartment5': '5-Bedroom Apartment',
        'townhouse2': '2-Bedroom Townhouse',
        'townhouse3': '3-Bedroom Townhouse',
        'townhouse4': '4-Bedroom Townhouse',
        'villa3': '3-Bedroom Villa',
        'villa4': '4-Bedroom Villa',
        'villa5': '5-Bedroom Villa',
        'villa6': '6-Bedroom Villa',
        'villa31': '3+1-Bedroom Villa'
    },
    neighbourhoodNames: {
        'allilac': 'AL LILAC',
        'aljouri': 'AL JOURI',
        'alnarjis': 'AL NARJIS',
        'gardenapts': 'GARDEN APARTMENTS',
        'acacia': 'ACACIA',
        'almeriaeast': 'ALMERIA EAST',
        'almerianorth': 'ALMERIA NORTH',
        'almeriasouth': 'ALMERIA SOUTH',
        'beachlink': 'BEACH LINK',
        'ghadeerparks': 'GHADEER PARKS',
        'juman1': 'JUMAN 1',
        'juman2': 'JUMAN 2',
        'liwan': 'LIWAN',
        'luban': 'LUBAN',
        'marsa1': 'MARSA 1',
        'marsa2': 'MARSA 2',
        'marsa3': 'MARSA 3',
        'marsagardens': 'MARSA GARDENS',
        'neem': 'NEEM',
        'reehangardens': 'REEHAN GARDENS',
        'reehanresidence': 'REEHAN RESIDENCE',
        'sector1': 'SECTOR 1',
        'sector2': 'SECTOR 2',
        'sector3': 'SECTOR 3',
        'sector4': 'SECTOR 4',
        'siraj': 'SIRAJ',
        'thegardens': 'THE GARDENS',
        'zunairah': 'ZUNAIRAH',
        'waterfront': 'WATERFRONT',
        'tilalalghaf': 'TILAL AL GHAF'
    },
    oneFilterCommunities: ['almouj']
}
