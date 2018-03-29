export default {
    'mode': 'staging',
    'url': {
        'staging': 'https://staging.imagination-maf.com/api/',
        'live': ''
    },
    'mappings': {
        'app_x5F_Sharjah-road--parent': 'alzahia'
    },
    dataPoints: {
        alzahia: {
            allilac: {
                'fullname': 'AL LILAC',
                'plot_boundary': 'AL_LILAC_PLOTS',
                'svg': {
                    'scale': 3.2,
                    'translate': [598, 280]
                }
            },
            aljouri: {
                'fullname': 'AL JOURI',
                'plot_boundary': 'AL_JOURI_PLOTS',
                'svg': {
                    'scale': 2.625,
                    'translate': [50, 316]
                }
            },
            alnarjis: {
                'fullname': 'AL NARJIS',
                'plot_boundary': 'AL_NARJIS_PLOTS',
                'svg': {
                    'scale': 3.3,
                    'translate': [201, -198]
                }
            },
            gardenapts: {
                'fullname': 'Garden Apartments',
                'plot_boundary': 'AL_ZAHIA_PLOT_BOUNDARIES',
                'svg': {
                    'scale': 3.2,
                    'translate': [598, 280]
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
        'app_x5F_Sharjah-road--parent': 'alzahia'
    },
    houseTypes: {
        'villa': ['Boutique villa', 'Villa Plus', 'Villa', 'villa', 'Courtyard'],
        'townhouse': ['Town house Plus', 'Town house'],
        'apartment': ['Apartments', 'Apartment'],
        'office': ['Offices']
    },
    houseTypeNames: {
        'apartmentStudio': 'Apartment Studio',
        'villa3': '3-Bedroom Villa',
        'apartment1': '1-Bedroom Apartment',
        'villa4': '4-Bedroom Villa',
        'apartment2': '2-Bedroom Apartment',
        'villa5': '5-Bedroom Villa',
        'apartment3': '3-Bedroom Apartment',
        'villa6': '6-Bedroom Villa',
        'townhouse2': '2-Bedroom Townhouse',
        'townhouse3': '3-Bedroom Townhouse',
        'townhouse4': '4-Bedroom Townhouse'
    },
    neighbourhoodNames: {
        'allilac': 'AL LILAC',
        'aljouri': 'AL JOURI',
        'alnarjis': 'AL NARJIS',
        'gardenapts': 'GARDEN APARTMENTS'
    }
}
