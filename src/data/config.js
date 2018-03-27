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
                'plot_boundary': 'AL_ZAHIA_PLOT_BOUNDARIES',
                'svg': {
                    'scale': 3.2,
                    'translate': [598, 280]
                }
            },
            aljouri: {
                'fullname': 'AL JOURI',
                'plot_boundary': 'AL_ZAHIA_PLOT_BOUNDARIES',
                'svg': {
                    'scale': 3.2,
                    'translate': [598, 280]
                }
            },
            alnarjis: {
                'fullname': 'AL NARJIS',
                'plot_boundary': 'AL_ZAHIA_PLOT_BOUNDARIES',
                'svg': {
                    'scale': 3.3,
                    'translate': [201, -205]
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
        'available': ['Unassigned', 'Available'],
        'unavailable': ['Sold', 'Sale pending', 'Unavailable', 'Booked', 'Reserved']
    }
}
