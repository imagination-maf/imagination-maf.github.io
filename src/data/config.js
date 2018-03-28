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
        'villa': ['Boutique villa', 'Villa Plus', 'Villa', 'villa'],
        'townhouse': ['Town house Plus', 'Town house'],
        'apartment': ['Apartments'],
        'office': ['Offices']
    },
    colorHierarchy: {
        'apartmentStudio': '#f6962d',
        'villa3': '#f6962d',
        'apartment1': '#fbb831',
        'villa4': '#fbb831',
        'apartment2': '#1cb1af',
        'villa5': '#1cb1af',
        'apartment3': '#5f6062',
        'villa6': '#5f6062',
        'townhouse2': '#6da340',
        'townhouse3': '#1897d4',
        'townhouse4': '#07477d'
    }
}
