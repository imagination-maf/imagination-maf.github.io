export default {
    'mode': 'staging',
    'url': {
        'staging': 'https://staging.imagination-maf.com/api/',
        'live': ''
    },
    'server': {
        'address': '10.83.40.111',
        'browserSyncPort': 11100,
        'httpPort': 8888,
        'wsPort': 11099
    },
    'galleryUrl': 'https://s3-eu-west-1.amazonaws.com/maf-gallery-images/',
    'localUrl': '/gallery/',
    'masterplan-inactive': ['app_x5F_Lebanon-region--parent', 'app_x5F_Lebanon--parent', 'app_x5F_Lebanon-road--parent', 'app_x5F_Dubai--parent', 'app_x5F_Dubai-road--parent'],
    'mappings': {
        'app_x5F_Sharjah-road--parent': 'alzahia',
        'app_x5F_Muscat-road--parent': 'almouj'
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
    dataPoints: {
        alzahia: {
            allilac: {
                'fullname': 'AL LILAC',
                'plot_boundary': 'AL_LILAC_PLOTS',
                'amenities': ['AMENITIES_x5F_AL_LILAC'],
                'svg': {
                    'scale': 3.2,
                    'translate': [598, 280]
                }
            },
            aljouri: {
                'fullname': 'AL JOURI',
                'plot_boundary': 'AL_JOURI_PLOTS',
                'amenities': ['AMENITIES_x5F_AL_JOURI'],
                'svg': {
                    'scale': 2.625,
                    'translate': [50, 316]
                }
            },
            alnarjis: {
                'fullname': 'AL NARJIS',
                'plot_boundary': 'AL_NARJIS_PLOTS',
                'amenities': ['AMENITIES_x5F_AL_NARJIS'],
                'svg': {
                    'scale': 3.3,
                    'translate': [201, -198]
                }
            },
            gardenapts: {
                'fullname': 'Garden Apartments',
                'plot_boundary': 'AL_ZAHIA_PLOT_BOUNDARIES',
                'amenities': [],
                'svg': {
                    'scale': 3.2,
                    'translate': [598, 280]
                }
            }
        },
        almouj: {
            almouj: {
                'fullname': 'AL MOUJ',
                'plot_boundary': 'PLOT_BOUNDARIES',
                'amenities': [],
                'svg': {
                    'scale': 0.95,
                    'translate': [-255, -250]
                }
            },
            neighbourhood1: {
                'fullname': 'Neighbourhood 1',
                'plot_boundary': 'PLOT_BOUNDARIES',
                'amenities': [],
                'svg': {
                    'scale': 0.95,
                    'translate': [-255, -250]
                }
            }
        }
    },
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
        'almouj': 'AL MOUJ',
        'neightbourhood1': 'NEIGHBOURHOOD 1'
    },
    oneFilterCommunities: ['almouj']
}
